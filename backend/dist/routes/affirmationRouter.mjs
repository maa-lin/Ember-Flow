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
import { createAffirmation, deleteAffirmation, deleteAffirmationsByType, getAffirmation, getAffirmationById, getAffirmations, updateAffirmation } from "../controllers/affirmationController.mjs";
const router = express.Router();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { type } = req.query;
        const affirmations = yield getAffirmations(type);
        if (affirmations.length < 1) {
            res.status(400).json({ status: "No affirmations were found" });
        }
        else {
            res.status(200).json(affirmations);
        }
    }
    catch (error) {
        res.status(500).send(error);
        console.error(error);
    }
}));
router.get("/random", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { type } = req.query;
        if (!type) {
            res.status(400).json({ status: "Query parameter 'type' is required." });
        }
        const affirmation = yield getAffirmation(type);
        if (!affirmation) {
            res.status(400).json({ status: `No affirmation with type '${type}' was found` });
        }
        else {
            res.status(200).json(affirmation);
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
        const affirmation = yield getAffirmationById(id);
        if (!affirmation) {
            res.status(400).json({ status: `No affirmation with id '${id}' was found.` });
        }
        else {
            res.status(200).json(affirmation);
        }
    }
    catch (error) {
        res.status(500).send(error);
        console.error(error);
    }
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { type, text } = req.body || {};
        if (!type || !text) {
            res.status(400).json({ status: "You must enter both 'type' and 'text'" });
        }
        else {
            const affirmation = yield createAffirmation(type, text);
            if (!affirmation) {
                res.status(409).json({ status: "An affirmation with the exact same type and text already exists." });
            }
            else {
                res.status(201).json(affirmation);
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
        const { type, text } = req.body || {};
        const affirmation = yield updateAffirmation(id, type, text);
        if (!affirmation) {
            res.status(400).json({ status: `No affirmation with id '${id}' was found.` });
        }
        else {
            if (affirmation === "duplicate") {
                res.status(400).json({ status: "An affirmation with the exact same type and text already exists" });
            }
            ;
            res.status(200).json(affirmation);
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
        const affirmation = yield deleteAffirmation(id);
        if (affirmation < 1) {
            res.status(400).json({ status: `No affirmation with id '${id}' was found.` });
        }
        else {
            res.status(200).json({ status: `Affirmation with id '${id}' was successfully deleted.` });
        }
    }
    catch (error) {
        res.status(500).send(error);
        console.error(error);
    }
}));
router.delete("/type/:type", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { type } = req.params;
        const affirmations = yield deleteAffirmationsByType(type);
        if (affirmations < 1) {
            res.status(400).json({ status: `No affirmations with type '${type}' was found.` });
        }
        else {
            res.status(200).json({ status: `${affirmations} affirmations of type '${type}' was successfully deleted.` });
        }
    }
    catch (error) {
        res.status(500).send(error);
        console.error(error);
    }
}));
export default router;
