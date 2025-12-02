import { request, Request, response, Response } from "express";
import express from "express";
import { getAffirmation, getAffirmationById, getAffirmations } from "../controllers/affirmationController.mjs";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        const { type } = req.query;

        const affirmations = await getAffirmations(type as string);

        if (affirmations.length < 1) {
            res.status(400).json({ status: "No affirmations were found" });
        } else {
            res.status(200).json(affirmations);
        }

    } catch (error) {
        res.status(500).send(error);
        console.error(error);
    }
});

router.get("/random", async (req: Request, res: Response) => {
    try {
        const { type } = req.query;

        if (!type) {
            res.status(400).json({ status: "Query parameter 'type' is required." })
        }

        const affirmation = await getAffirmation(type as string);

        if (!affirmation) {
            res.status(400).json({ status: `No affirmation with type '${type}' was found` });
        } else {
            res.status(200).json(affirmation);
        }

    } catch (error) {
        res.status(500).send(error);
        console.error(error);
    }
});

router.get("/id/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const affirmation = await getAffirmationById(id);

        if (!affirmation) {
            res.status(400).json({ status: `No affirmation with id '${id}' was found.` })
        } else {
            res.status(200).json(affirmation);
        }
        
    } catch (error) {
        res.status(500).send(error);
        console.error(error);
    }
})

export default router;