import express from "express";
import mongoose from "mongoose";
import { json } from "express";
import dotenv from "dotenv";

dotenv.config();
const port = process.env.PORT || 3000;
const dbUrl = process.env.MONGO_URL;

if (!dbUrl) throw Error ("No MONGO_URL in .env"); 

const app = express();

app.use(json());

app.get("/ping", (req, res) => {
    res.status(200).json({ message: "Welcome!" });
});

app.listen(port, async (error) => {
    try {
        await mongoose.connect(dbUrl);
        console.log(`API is running on ${port}, connected to database...`)
    } 
    catch (error) {
        console.error("ERROR", error);
    }
});