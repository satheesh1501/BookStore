import express from 'express';
import {PORT, mongodb} from './config.js';
import mongoose from 'mongoose';
import bookroute from './routes/bookroutes.js';
import cors from 'cors';
const app = express();
//Middleware for parsing request body
app.use(express.json());
//Middleware for handling CORS policy
//option 1: allow all orgins with default of cors(*)
app.use(cors());
//Option 2: Allow custon orgin
//app.use(
//cors({
   // origin : 'http://localhost:3000',
   // methods : ['GET','POST','PUT','DELETE'],
   // allowedHeaders :['Content-Type']
//})
//);

app.get('/', (req,res)=>{
    res.send('Welcome to my Book store');
});

app.use('/books', bookroute);

    mongoose
    .connect(mongodb)
    .then(()=>{
             console.log('App connected to database');
         app.listen(PORT,()=>{
             console.log(`app listening at port: ${PORT}`);
         });
    })
     .catch((error)=>{
             console.log(error.message);
     });
