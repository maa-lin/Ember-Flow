import { InferSchemaType } from "mongoose";
import { ChallengeDto } from "../models/ChallengeDto.mjs";
import Challenge from "../models/ChallengeSchema.mjs";

type ChallengeType = InferSchemaType<typeof Challenge.schema>;

const convertChallengeDbToDto = (challenge: ChallengeType): ChallengeDto => {
    return{
        id: challenge.id,
        mood: challenge.mood,
        text: challenge.text,
        affirmation: challenge.affirmation
    } satisfies ChallengeDto;
};

export const getChallenges = async (mood: string): Promise<ChallengeDto[]> => {
    let challenges = await Challenge.find();
    
    if (mood) {
        challenges = challenges.filter((a) => a.mood === mood.toLowerCase());
    };

    const dto = challenges.map((a) => convertChallengeDbToDto(a));

    return dto;
};

export const getChallenge = async (mood: string): Promise<ChallengeDto | null> => {
    const result  = await Challenge.aggregate([
        { $match: { mood: mood } }, //filter affirmations on type, docs: https://www.mongodb.com/docs/manual/reference/operator/aggregation/match/
        { $sample: { size: 1 } } //select only one random affirmation, docs: https://www.mongodb.com/docs/manual/reference/operator/aggregation/sample/
    ]);

    const randomChallenge = result[0]; //aggregate returns an array with the random object

    if(!randomChallenge) {
        return null;
    }

    const dto = convertChallengeDbToDto(randomChallenge);

    return dto;
};

export const getChallengeById = async (id: string): Promise<ChallengeDto | null> => {
    const challenge = await Challenge.findOne({ id: id });

    if (!challenge) {
        return null;
    }

    const dto = convertChallengeDbToDto(challenge);

    return dto;
};

export const createChallenge = async (mood: string, text: string, affirmation: string): Promise<ChallengeDto | null> => {
    const isDuplicate = await Challenge.findOne({ mood: mood.toLowerCase(), text: text.toLowerCase() });

    if (isDuplicate) {
        return null;
    };

    const id = crypto.randomUUID();
    const challenge = await Challenge.create({ id: id, mood: mood.toLowerCase(), text: text.toLowerCase(), affirmation: affirmation.toLowerCase() });

    const dto = convertChallengeDbToDto(challenge);

    return dto;
};

export const updateChallenge = async (id: string, type: string, text: string, affirmation: string): Promise<ChallengeDto | null | "duplicate"> => {
    const challenge = await Challenge.findOne({ id: id });

    if (!challenge) {
        return null;
    };

    if (type) {
        challenge.mood = type.toLowerCase();
    };

    if (text) {
        challenge.text = text.toLowerCase();
    };

    if (affirmation) {
        challenge.affirmation = affirmation.toLowerCase();
    };
    
    const isDuplicate = await Challenge.findOne({ mood: challenge.mood, text: challenge.text });

    if (isDuplicate) {
        return "duplicate";
    }

    await challenge.save();

    const dto = convertChallengeDbToDto(challenge);

    return dto;
};

export const deleteChallenge = async (id: string): Promise<number> => {
    const challengeToBeDeleted = await Challenge.deleteOne({ id: id });

    return challengeToBeDeleted.deletedCount;
};

export const deleteChallengesByMood = async (mood: string): Promise<number> => {
    const challengesToBeDeleted = await Challenge.deleteMany({ mood: mood });
    
    return challengesToBeDeleted.deletedCount;
};