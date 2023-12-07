 import express from 'express'
 import dotenv from 'dotenv'
import Db from './config/db.js';
import morgan from 'morgan';
import authroute from './routers/authroute.js'
import categoryRoute from './routers/categoryRoutes.js'
import cors from 'cors'
import productRoute from './routers/productRoute.js'
import {fileURLToPath} from 'url'
import path from 'path'
//configfile
dotenv.config();
//db connection
 
const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename)

//rest object
const app=express();

//middleware
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))
app.use('/api/v1/auth',authroute)
app.use('/api/v1/category',categoryRoute)
app.use('/api/v1/product',productRoute)
app.use(express.static(path.join(__dirname,"./client/dist")))


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://quaint-lime-butterfly.cyclic.app/'); // Replace with your allowed URL
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });


const PORT=process.env.PORT || 8080
 

// app.get('/',(req,res)=>{
//     res.send({Message:'welcome'})
// })

app.use('*',function(req,res){
   res.sendFile(path.join(__dirname,"./client/dist/index.html"))
})


Db().then(() => {
    console.log("db connected");
    app.listen(PORT,()=>{ 
        console.log(`listening on ${PORT}`)
    })
})
