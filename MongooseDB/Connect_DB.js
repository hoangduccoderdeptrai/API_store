import mongoose from "mongoose";

export const connect_db =async (url)=>{
    try{
        await mongoose.connect(url)
        console.log('Connected to MongoDB')
    }catch(err){
        console.log(err.message)
        // console.log("Couldn't connect to MongoDB")
    }
}


