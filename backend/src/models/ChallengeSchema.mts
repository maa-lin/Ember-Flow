import { model, Schema } from "mongoose";

const ChallengeSchema = new Schema(
    {
        mood: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        }
    }
);

const Challenge = model("Challenge", ChallengeSchema);
export default Challenge;