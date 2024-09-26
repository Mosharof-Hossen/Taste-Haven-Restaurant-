const express = require('express');
const cors = require('cors');
require("dotenv").config()

const port = process.env.PORT || 3000;

app = express();

// Middleware 

app.use(express.json())
app.use(cors({
    origin: [
        "http://localhost:5173"
    ],
    credentials: true
}));



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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

        app.get("/carts/:email", async (req, res) => {
            const email = req.params.email;
            const result = await cartItemsCollection.find({ userEmail: email }).toArray();
            res.send(result)
        })
        app.delete("/carts/:id", async (req, res) => {
            const id = req.params.id;
            console.log(id);
            const result = await cartItemsCollection.deleteOne({ _id: new ObjectId(id) });
            res.send(result)
        })

        app.post("/carts", async (req, res) => {
            const data = req.body;
            const result = await cartItemsCollection.insertOne(data);
            res.send(result)
        })

        // *************** user and admin section **************
        app.post("/users", async (req, res) => {
            const user = req.body;
            const filter = { email: user.email };
            const option = { upsert: true };
            const updateUser = {
                $set: {
                    email: user.email,
                    name: user.displayName,
                    status: user.status
                }
            }
            console.log(updateUser);
            const result = await usersCollection.updateOne(filter, updateUser, option);
            res.send(result)
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