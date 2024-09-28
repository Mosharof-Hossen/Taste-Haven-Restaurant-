const express = require('express');
const cors = require('cors');
require("dotenv").config()
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


const port = process.env.PORT || 3000;

app = express();

// Middleware 

app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: [
        "http://localhost:5173"
    ],
    credentials: true
}));



const verifyToken = (req, res, next) => {
    const token = req?.cookies?.token;
    if (!token) {
        return res.status(403).json({ message: 'Access denied. Token is missing.' })
    }
    jwt.verify(token, process.env.JWT_TOKEN, async (err, user) => {
        if (err) {
            return res.status(403).send('Invalid or expired token.');
        }
        req.tokenUser = user;
        next()
    })
}




const cookieOptions = {
    // httpOnly: true,
    // sameSite: "None",
    // secure: false,
};


const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.f3oc9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        const menuCollection = client.db("tasteHavenDb").collection("menu");
        const reviewsCollection = client.db("tasteHavenDb").collection('reviews')
        const cartItemsCollection = client.db("tasteHavenDb").collection('cartItems')
        const usersCollection = client.db("tasteHavenDb").collection('users')

        // JWT
        app.post("/jwt", async (req, res) => {
            const userInfo = req.body
            const token = jwt.sign(userInfo, process.env.JWT_TOKEN, { expiresIn: '1h' })
            res.cookie("token", token, cookieOptions)
            res.send({ success: true })
        })

        app.post("/logout", async (req, res) => {
            res.clearCookie('token', { ...cookieOptions, maxAge: 0 }).send({ success: "token remove" })
        })


        // API *****************************************

        app.get("/menu", async (req, res) => {
            const result = await menuCollection.find().toArray();
            res.send(result);
        })

        app.get("/menu/:category", async (req, res) => {
            const category = req.params.category;
            const result = await menuCollection.find({ category: category }).toArray();
            res.send(result)
        })

        app.get("/reviews", async (req, res) => {
            const result = await reviewsCollection.find().toArray();
            res.send(result)
        })

        app.get('/item-count', async (req, res) => {
            const count = await menuCollection.estimatedDocumentCount();
            res.send({ count })
        })

        app.get('/shop-item', async (req, res) => {
            const { category, currentPage, limit = 6 } = req.query;
            const filter = category ? { category } : {}
            const totalItem = await menuCollection.countDocuments(filter);
            const items = await menuCollection.find(filter).skip(currentPage * limit).limit(parseInt(limit)).toArray();
            const totalPage = Math.ceil(totalItem / limit)
            res.send({ totalItem, items, totalPage })
        })

        app.get("/carts/:email", verifyToken, async (req, res) => {
            const email = req.params.email;
            const tokenEmail = req.tokenUser.email;
            if (!(tokenEmail == email)) {
                return res.status(403).send('Unauthorized User.');
            }
            const result = await cartItemsCollection.find({ userEmail: email }).toArray();
            res.send(result)
        })

        app.delete("/carts/:id", async (req, res) => {
            const id = req.params.id;
            const result = await cartItemsCollection.deleteOne({ _id: new ObjectId(id) });
            res.send(result)
        })

        app.post("/carts", async (req, res) => {
            const data = req.body;
            const result = await cartItemsCollection.insertOne(data);
            res.send(result)
        })

        // *************** user and admin section **************

        const verifyAdmin = async (req, res, next) => {
            const email = req.tokenUser.email;
            const query = { email: email };
            const user = await usersCollection.findOne(query);
            const isAdmin = user?.status === "admin";
            if (!isAdmin) {
                return res.status(403).send({ message: "Forbidden Access." });
            }
            next()
        }
        // Admin verification
        app.get("/user/admin/:email", verifyToken, async (req, res) => {
            const email = req.params.email;
            const tokenEmail = req.tokenUser.email;
            if (email !== tokenEmail) {
                return res.status(403).send('Unauthorized User.');
            }
            const query = { email: email };
            const user = await usersCollection.findOne(query);
            let admin = false
            if (user) {
                admin = user?.status === "admin"
            }
            res.send({ admin });
        })

        app.put("/admin/user/status", verifyToken, verifyAdmin, async (req, res) => {
            const filter = { email: req.body.email };
            
            const updatedStatus = {
                $set: {
                    status: req.body.status
                }
            }
            const result = await usersCollection.updateOne(filter, updatedStatus);
            res.send(result)
        })

        app.delete("/admin/users/:email", verifyToken, verifyToken, async (req, res) => {
            const email = req.params.email;
            const result = await usersCollection.deleteOne({ email: email });
            res.send(result)
        })

        app.get("/admin/users/:email", verifyToken, verifyAdmin, async (req, res) => {
            const email = req.params.email;
            const query = { email: email };
            const user = await usersCollection.findOne(query);
            if (user.status !== 'admin') {
                return res.status(403).send('You are not admin.');
            }
            const result = await usersCollection.find().toArray();
            res.send(result)
        })

        app.get("/admin/manage-item", async (req, res) => {
            const result = await menuCollection.find().toArray();
            res.send(result)
        })

        app.delete("/admin/manage-item/:id", verifyToken, verifyAdmin, async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await menuCollection.deleteOne(query);
            res.send(result)
        })

        app.post("/users", async (req, res) => {
            const user = req.body;
            const filter = { email: user.email };
            const option = { upsert: true };
            const updateUser = {
                $set: {
                    email: user.email,
                    name: user.displayName,
                }
            }
            const result = await usersCollection.updateOne(filter, updateUser, option);
            res.send(result)
        })

        app.post("/admin/item", verifyToken, verifyAdmin, async (req, res) => {
            const item = req.body
            const result = await menuCollection.insertOne(item);
            res.send(result)
        })

        app.patch("/admin/manage-item", verifyToken, verifyAdmin, async (req, res) => {
            const data = req.body;
            const query = { _id: new ObjectId(data.id) };
            if (data.image) {
                let updatedDocument = {
                    $set: {
                        name: data.name,
                        recipe: data.recipe,
                        image: data.image,
                        category: data.category,
                        price: data.price
                    }
                }
                const result = await menuCollection.updateOne(query, updatedDocument);
                return res.send(result)
            }
            let updatedDocument = {
                $set: {
                    name: data.name,
                    recipe: data.recipe,
                    category: data.category,
                    price: data.price
                }
            }
            const result = await menuCollection.updateOne(query, updatedDocument);
            return res.send(result)
        })




        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get("/", async (req, res) => {
    res.send("Server is running...")
})

app.listen(port, () => {
    console.log("Server is running on port ", port);
})