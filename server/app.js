const express = require("express")
const mongoose = require("mongoose")
const app = express()
const port = 5000;
const ProductModel = require("./model/ProductSchema")
const cors = require("cors")

app.use(express.json())
app.use(cors())



mongoose.connect("mongodb://127.0.0.1:27017/inventory")
// mongoose.connect("mongodb+srv://zulqarnainc67:zuki1122@inventoryman.2v9va2q.mongodb.net/?retryWrites=true&w=majority&appName=inventoryman")
.then(() => {
    console.log("connection to database");
}).catch(err => {
    console.log("not connected");
})


//? add new product 
app.post("/addProduct", (req,res) => {
    const {product,price,quantity} = req.body;
    if(!product || !price || !quantity){
       res.json("Please fill all the fields")
    } else {
        const item = req.body
        ProductModel.create(item)
        res.json(item)
    }
  
})


//? save product
app.get('/', (req,res) => {
    ProductModel.find({})
    .then(product => {
        res.json(product)
    }).catch(err => console.log(err))
})


app.delete("/delete/:id",(req,res) => {
    const id = req.params.id;
    ProductModel.findByIdAndDelete({_id:id})
    .then(product => {
        res.json(product)
    }).catch(err => console.log("error deleting product ",product))
})

app.listen(port, () => {
    console.log("server is listening at port number "+ port);
})