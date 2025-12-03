import express from "express";
import mongoose from "mongoose";
import { json } from "express";
import dotenv from "dotenv";
import affirmationRouter from "./routes/affirmationRouter.mjs"
import challengeRouter from "./routes/challengeRouter.mjs";

dotenv.config();
const port = process.env.PORT || 3000;
const dbUrl = process.env.MONGO_URL;

if (!dbUrl) throw Error ("No MONGO_URL in .env"); 

const app = express();

app.use(json());

app.use("/affirmations", affirmationRouter);
app.use("/challenges", challengeRouter)

app.get("/ping", (req, res) => {
    res.status(200).json({ message: "Welcome!" });
});


app.listen(port, async () => {
    try {
        await mongoose.connect(dbUrl);
        console.log(`API is running on ${port}, connected to database: `, mongoose.connection.db?.databaseName)
    } 
    catch (error) {
        console.error("ERROR", error);
    }
});