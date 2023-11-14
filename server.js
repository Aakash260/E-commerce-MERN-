 import express from 'express'
 import dotenv from 'dotenv'
import Db from './config/db.js';
import morgan from 'morgan';
import authroute from './routers/authroute.js'
import cors from 'cors'
//configfile
dotenv.config();
//db connection
Db();

//rest object
const app=express();

//middleware
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))
app.use('/api/v1/auth',authroute)

const PORT=process.env.PORT || 8080
 
app.get('/',(req,res)=>{
    res.send({Message:'welcome'})
})

app.listen(PORT,()=>{ 
    console.log(`listening on ${PORT}`)
})