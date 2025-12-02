import { model, Schema } from "mongoose";

const AffirmationSchema = new Schema(
    {
        id: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        }
    }
);

const Affirmation = model("Affirmation", AffirmationSchema);
export default Affirmation;