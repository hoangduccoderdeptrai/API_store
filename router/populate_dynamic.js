import { product } from "../models/schemal.js";
import myJson from './products.json' assert {type: 'json'};
import { connect_db } from "../MongooseDB/Connect_DB.js";

import 'dotenv/config'




export async function connect(){
    try{
        const url =process.env.URL
        await connect_db(url)
        await product.deleteMany()
        await product.create(myJson)
        console.log("connected successful")
        process.exit(0)
    }catch(err){
        console.log(err.message)
        process.exit(1)
    }
}


