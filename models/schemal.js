import mongoose from "mongoose";

const Product_Schema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name is a required field'],
        trim:true
    },
    price:{
        type:Number,
        required:[true,'price is a required field']
    },
    featured:{
        type:Boolean,
        default:false
    },
    rating:{
        type:Number,
        default:4.5
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    company:{
        type:String,
        enum:{
            values:['ikea','liddy','caressa','marcos'],
            message:`{Values} is not supported`
        }
        
    }
})

export const product =mongoose.model('product',Product_Schema)