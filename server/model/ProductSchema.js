const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    product:{
        type:String,
    },
    price:{
        type:Number,
    },
    quantity:{
        type:Number,
    }

})

const ProductModel = new mongoose.model("ProductModel",ProductSchema)
module.exports = ProductModel