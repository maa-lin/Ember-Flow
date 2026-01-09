"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import mongoose from "mongoose";
import { json } from "express";
import dotenv from "dotenv";
import affirmationRouter from "./routes/affirmationRouter.mjs";
import challengeRouter from "./routes/challengeRouter.mjs";
import cors from "cors";
dotenv.config();
const port = process.env.PORT || 3000;
const dbUrl = process.env.MONGO_URL;
if (!dbUrl)
    throw Error("No MONGO_URL in .env");
const app = express();
app.use(json());
app.use(cors());
app.use("/affirmations", affirmationRouter);
app.use("/challenges", challengeRouter);
app.get("/ping", (req, res) => {
    res.status(200).json({ message: "Welcome!" });
});
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        yield mongoose.connect(dbUrl);
        console.log(`API is running on ${port}, connected to database: `, (_a = mongoose.connection.db) === null || _a === void 0 ? void 0 : _a.databaseName);
    }
    catch (error) {
        console.error("ERROR", error);
    }
}));
