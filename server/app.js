const express = require("express")
const mongoose = require("mongoose")
const app = express()
const port = 5000;
const ProductModel = require("./model/ProductSchema")
const cors = require("cors")

app.use(express.json())
app.use(cors())



mongoose.connect("mongodb://127.0.0.1:27017/inventory")
.then(() => {
    console.log("connection to database");
}).catch(err => {
    console.log("not connected");
})


//? add new product 
app.post("/addProduct", (req,res) => {
    const product = req.body;
    ProductModel.create(req.body)
    res.json(product)
})


//? save product
app.get('/', (req,res) => {
    ProductModel.find({})
    .then(product => {
        res.json(product)
    }).catch(err => console.log(err))
})


app.listen(port, () => {
    console.log("server is listening at port number "+ port);
})