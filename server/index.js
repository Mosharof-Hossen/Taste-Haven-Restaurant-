const express = require('express');
const cors = require('cors');

const port = process.env.PORT || 3000;

app = express();

// Middleware 

app.use(express.json())
app.use(cors());


app.get("/", async (req, res) => {
    res.send("Server is running...")
})

app.listen(port, () => {
    console.log("Server is running on port ", port);
})