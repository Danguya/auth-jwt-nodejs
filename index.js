const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');


dotenv.config();

//Connect to DB
mongoose.connect(process.env.DB_CONNECT, 
    { useNewUrlParser: true, useUnifiedTopology: true }, ()=>{
        console.log('Connected to DB');
    }
);

//import routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

//middleware
app.use(express.json());

//route middlewares
app.use('/api/user', authRoute);
app.use('/api/user/posts',postRoute);

app.listen(3000,()=>console.log('Servidor aberto em http://localhost:3333'));
