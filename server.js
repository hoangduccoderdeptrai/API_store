import express from 'express'
import 'dotenv/config'
import { connect_db } from './MongooseDB/Connect_DB.js'
import { tasks } from './router/index.js'
import {connect} from './router/populate_dynamic.js'
const url =process.env.URL
const app =express()

function run_server(){
    app.use(express.json())
    app.use('/v1/api/tasks',tasks)
    app.get('/',(req,res)=>{
        res.send(`<a href="localhost:3000/v1/api/tasks">hello world</a>`)
    })

    app.listen(process.env.PORT,process.env.HOST,()=>{
        console.log('server is listening')
    })
}
(async()=>{
    try{
        await connect_db(url)
        run_server()
       

    }catch(err){

        console.log(err)
    }
})()