import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

    productId:{
        type : String,
        required : true,
        unique : true
    },

    name :{
        type : String,
        required : true
    },

    altName :{
        type : [String],
        default : []
    },

    price :{
        type : Number,
        required : true
    },

    labeledPrice :{
        type : Number,
       
    },

    description :{
        type : String,
        required : true
    },

    images :{
        type : [String],
        required : true,
        default : ["https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh-iugAQV5fmEY2kGWi7XPFpdrwRU99ackxP6KZNeHmP9uademLaY4YyIYcm8XnvaLT1OFjlGitmJXkoKp1uDAgL0c151kIoFEInsKcCcpDe8boiHWyiYnZFgF8AaXabrA2uIqwAM2Ka7Q/s1600/HEADDER.jpg"]
    },

    stock :{
        type : Number,
        required :true
    },
})

const Product = mongoose.model("products",productSchema)
export default Product;