const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser:true }
);

const connection = mongoose.connection;

connection.once('open', ()=>{
    console.log('mongoDB connected!')
})

const authRoute = require("./routes/user");
const taskRoute = require("./routes/task");

app.use('/auth', authRoute);
app.use('/task', taskRoute);

app.listen(port, ()=>{
    console.log("server running on port:-"+port)
})