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
import { createChallenge, deleteChallenge, deleteChallengesByMood, getChallenge, getChallengeById, getChallenges, updateChallenge } from "../controllers/challengeController.mjs";
export const router = express.Router();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { mood } = req.query;
        const challenges = yield getChallenges(mood);
        if (challenges.length < 1) {
            res.status(400).json({ status: "No challanges were found" });
        }
        else {
            res.status(200).json(challenges);
        }
    }
    catch (error) {
        res.status(500).send(error);
        console.error(error);
    }
}));
router.get("/random", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { mood } = req.query;
        if (!mood) {
            res.status(400).json({ status: "Query parameter 'mood' is required." });
        }
        const challenge = yield getChallenge(mood);
        if (!challenge) {
            res.status(400).json({ status: `No challenge with mood '${mood}' was found` });
        }
        else {
            res.status(200).json(challenge);
        }
    }
    catch (error) {
        res.status(500).send(error);
        console.error(error);
    }
}));
router.get("/id/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const challenge = yield getChallengeById(id);
        if (!challenge) {
            res.status(400).json({ status: `No challenge with id '${id}' was found.` });
        }
        else {
            res.status(200).json(challenge);
        }
        ;
    }
    catch (error) {
        res.status(500).send(error);
        console.error(error);
    }
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { mood, text, affirmation } = req.body || {};
        if (!mood || !text || !affirmation) {
            res.status(400).json({ status: "You must enter 'mood', 'text', and 'affirmation'." });
        }
        else {
            const challenge = yield createChallenge(mood, text, affirmation);
            if (!challenge) {
                res.status(409).json({ status: "A challenge with the exact same mood and text already exists." });
            }
            else {
                res.status(201).json(challenge);
            }
        }
    }
    catch (error) {
        res.status(500).send(error);
        console.error(error);
    }
}));
router.put("/id/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { mood, text, affirmation } = req.body || {};
        const challenge = yield updateChallenge(id, mood, text, affirmation);
        if (!challenge) {
            res.status(400).json({ status: `No challenge with id '${id}' was found.` });
        }
        else {
            if (challenge === "duplicate") {
                res.status(400).json({ status: "A challenge with the exact same mood and text already exists" });
            }
            ;
            res.status(200).json(challenge);
        }
    }
    catch (error) {
        res.status(500).send(error);
        console.error(error);
    }
}));
router.delete("/id/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const challenge = yield deleteChallenge(id);
        if (challenge < 1) {
            res.status(400).json({ status: `No challenge with id '${id}' was found.` });
        }
        else {
            res.status(200).json({ status: `Challenge with id '${id}' was successfully deleted.` });
        }
    }
    catch (error) {
        res.status(500).send(error);
        console.error(error);
    }
}));
router.delete("/mood/:mood", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { mood } = req.params;
        const challenges = yield deleteChallengesByMood(mood);
        if (challenges < 1) {
            res.status(400).json({ status: `No challenges with mood '${mood}' was found.` });
        }
        else {
            res.status(200).json({ status: `${challenges} challenges of mood '${mood}' was successfully deleted.` });
        }
    }
    catch (error) {
        res.status(500).send(error);
        console.error(error);
    }
}));
export default router;
