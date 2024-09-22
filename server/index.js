const express = require('express');
const cors = require('cors');
require("dotenv").config()

const port = process.env.PORT || 3000;

app = express();

// Middleware 

app.use(express.json())
app.use(cors());



const { MongoClient, ServerApiVersion } = require('mongodb');
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

        app.get("/menu", async (req, res) => {
            const result = await menuCollection.find().toArray();
            res.send(result);
        })

        app.get("/menu/:category", async (req, res) => {
            const category = req.params.category;
            const result = await menuCollection.find({ category: category }).toArray();
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