import express  from "express";
import { Request, Response } from "express";
import { createChallenge, deleteChallenge, deleteChallengesByMood, getChallenge, getChallengeById, getChallenges, updateChallenge } from "../controllers/challengeController.mjs";

export const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        const { mood } = req.query;

        const challenges = await getChallenges(mood as string);

        if (challenges.length < 1) {
            res.status(400).json({ status: "No challanges were found" });
        } else {
            res.status(200).json(challenges);
        }

    } catch (error) {
        res.status(500).send(error);
        console.error(error);
    }
});

router.get("/random", async (req: Request, res: Response) => {
    try {
        const { mood } = req.query;

        if (!mood) {
            res.status(400).json({ status: "Query parameter 'mood' is required." })
        }

        const challenge = await getChallenge(mood as string);

        if (!challenge) {
            res.status(400).json({ status: `No challenge with mood '${mood}' was found` });
        } else {
            res.status(200).json(challenge);
        }

    } catch (error) {
        res.status(500).send(error);
        console.error(error);
    }
});

router.get("/id/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const challenge = await getChallengeById(id);

        if (!challenge) {
            res.status(400).json({ status: `No challenge with id '${id}' was found.` })
        } else {
            res.status(200).json(challenge);
        };
        
    } catch (error) {
        res.status(500).send(error);
        console.error(error);
    }
});

router.post("/", async (req: Request, res: Response) => {
    try {
        const { mood, text, affirmation } = req.body || {};

        if (!mood || !text || !affirmation) {
            res.status(400).json({ status: "You must enter 'mood', 'text', and 'affirmation'." })
        } else {
            const challenge = await createChallenge(mood, text, affirmation);

            if (!challenge) {
                res.status(409).json({ status: "A challenge with the exact same mood and text already exists." });
            } else {
                res.status(201).json(challenge);
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
        const { mood, text, affirmation } = req.body || {};

        const challenge = await updateChallenge(id, mood, text, affirmation);

        if (!challenge) {
            res.status(400).json({ status: `No challenge with id '${id}' was found.` });
        } else {
            if (challenge === "duplicate") {
                res.status(400).json({ status: "A challenge with the exact same mood and text already exists" });
            };

            res.status(200).json(challenge);
        }
        
    } catch (error) {
        res.status(500).send(error);
        console.error(error);
    }
});

router.delete("/id/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const challenge = await deleteChallenge(id);

        if (challenge < 1) {
            res.status(400).json({ status: `No challenge with id '${id}' was found.` })
        } else {
            res.status(200).json({ status: `Challenge with id '${id}' was successfully deleted.` })
        }
    } catch (error) {
        res.status(500).send(error);
        console.error(error);
    }
});

router.delete("/mood/:mood", async (req: Request, res: Response) => {
    try {
        const { mood } = req.params;

        const challenges = await deleteChallengesByMood(mood);

        if (challenges < 1) {
            res.status(400).json({ status: `No challenges with mood '${mood}' was found.` })
        } else {
            res.status(200).json({ status: `${challenges} challenges of mood '${mood}' was successfully deleted.` })

        }
    } catch (error) {
        res.status(500).send(error);
        console.error(error);
    }
})

export default router;