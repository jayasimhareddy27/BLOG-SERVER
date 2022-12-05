import { createRequire } from "module";

import Express  from "express";
import cors from 'cors';
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from 'dotenv';

import postrouter from './routes/postroutes.js';
import userrouter from './routes/userroutes.js';
//import { fileURLToPath } from 'url';
const require = createRequire(import.meta.url);

const app=Express();
app.use(cors());



app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
dotenv.config();


app.use('/posts',postrouter  );
app.use('/user',userrouter)

/*
const path = require("path");
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
if ( process.env.NODE_ENV == "production"){
    app.use(Express.static(path.join(__dirname,"client/build")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));  
    })
}else{
    app.get("/", (req, res) => {

        res.send("API RUNNING");
    })
}*/



const CONNECTION_URL =process.env.CONNECTION_URL;
const PORT = process.env.PORT|| 5000;

mongoose.connect(CONNECTION_URL,( { useNewUrlParser: true, useUnifiedTopology: true }))
.then(()=>app.listen(PORT,()=>console.log(`listing to port:${PORT}`)))
.catch((err)=>console.log(err));
