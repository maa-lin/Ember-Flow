import { Request, Response } from "express";
import express from "express";
import { createAffirmation, deleteAffirmation, deleteAffirmationsByType, getAffirmation, getAffirmationById, getAffirmations, updateAffirmation } from "../controllers/affirmationController.mjs";

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
});

router.post("/", async (req: Request, res: Response) => {
    try {
        const { type, text } = req.body || {};

        if (!type || !text) {
            res.status(400).json({ status: "You must enter both 'type' and 'text'" })
        } else {
            const affirmation = await createAffirmation(type, text);

            if (!affirmation) {
                res.status(409).json({ status: "An affirmation with the exact same type and text already exists." });
            } else {
                res.status(201).json(affirmation);
            }
        }
    } catch (error) {
        res.status(500).send(error);
        console.error(error);
    }
});

router.put("/id/:id", async (req: Request, res: Response) => {
    try {

        const { id } = req.params;
        const { type, text } = req.body || {};

        const affirmation = await updateAffirmation(id, type, text);

        if (!affirmation) {
            res.status(400).json({ status: `No affirmation with id '${id}' was found.` });
        } else {
            if (affirmation === "duplicate") {
                res.status(400).json({ status: "An affirmation with the exact same type and text already exists" });
            };

            res.status(200).json(affirmation);
        }
        
    } catch (error) {
        res.status(500).send(error);
        console.error(error);
    }
});

router.delete("/id/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const affirmation = await deleteAffirmation(id);

        if (affirmation < 1) {
            res.status(400).json({ status: `No affirmation with id '${id}' was found.` })
        } else {
            res.status(200).json({ status: `Affirmation with id '${id}' was successfully deleted.` })
        }
    } catch (error) {
        res.status(500).send(error);
        console.error(error);
    }
});

router.delete("/type/:type", async (req: Request, res: Response) => {
    try {
        const { type } = req.params;

        const affirmations = await deleteAffirmationsByType(type);

        if (affirmations < 1) {
            res.status(400).json({ status: `No affirmations with type '${type}' was found.` })
        } else {
            res.status(200).json({ status: `${affirmations} affirmations of type '${type}' was successfully deleted.` })

        }
    } catch (error) {
        res.status(500).send(error);
        console.error(error);
    }
});

export default router;