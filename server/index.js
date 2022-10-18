//import dotenv from 'dotenv'
require("dotenv").config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import authRoutes from "./routes/auth_route_v2";

//import morgan from "morgan";
const morgan = require("morgan");

//dotenv.config()

const app = express();

mongoose
    .connect(`mongodb+srv://calutrition-matt:calutrition-matt-01@sample-calutrition.fssicvc.mongodb.net/calutritionDB?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => { 
        console.log("Successfully connected to MongoDB");
    })
    .catch((err) => { 
        console.log("DB CONNECTION ERROR: ", err);
    });

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin:"*",
    methods:['GET', 'POST']
}));
app.use(morgan("dev"));

// route middlewares
app.use("/api", authRoutes)
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function (req, res) {
    res.json({ success: true, message: 'Welcome to the backend zone!'});
});

app.listen(8000, () => console.log("Server running on port 8000"));