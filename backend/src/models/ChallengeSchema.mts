import { model, Schema } from "mongoose";

const ChallengeSchema = new Schema(
    {
        id: {
            type: String,
            required: true
        },
        mood: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        },
        affirmation: {
            type: String,
            required: true
        },
    }
);

const Challenge = model("Challenge", ChallengeSchema);
export default Challenge;