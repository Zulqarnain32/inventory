const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    product:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    }

})

const ProductModel = new mongoose.model("ProductModel",ProductSchema)
module.exports = ProductModel