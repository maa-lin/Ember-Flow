var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Challenge from "../models/ChallengeSchema.mjs";
const convertChallengeDbToDto = (challenge) => {
    return {
        id: challenge.id,
        mood: challenge.mood,
        text: challenge.text,
        affirmation: challenge.affirmation
    };
};
export const getChallenges = (mood) => __awaiter(void 0, void 0, void 0, function* () {
    let challenges = yield Challenge.find();
    if (mood) {
        challenges = challenges.filter((a) => a.mood === mood.toLowerCase());
    }
    ;
    const dto = challenges.map((a) => convertChallengeDbToDto(a));
    return dto;
});
export const getChallenge = (mood) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Challenge.aggregate([
        { $match: { mood: mood } }, //filter affirmations on type, docs: https://www.mongodb.com/docs/manual/reference/operator/aggregation/match/
        { $sample: { size: 1 } } //select only one random affirmation, docs: https://www.mongodb.com/docs/manual/reference/operator/aggregation/sample/
    ]);
    const randomChallenge = result[0]; //aggregate returns an array with the random object
    if (!randomChallenge) {
        return null;
    }
    const dto = convertChallengeDbToDto(randomChallenge);
    return dto;
});
export const getChallengeById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const challenge = yield Challenge.findOne({ id: id });
    if (!challenge) {
        return null;
    }
    const dto = convertChallengeDbToDto(challenge);
    return dto;
});
export const createChallenge = (mood, text, affirmation) => __awaiter(void 0, void 0, void 0, function* () {
    const isDuplicate = yield Challenge.findOne({ mood: mood.toLowerCase(), text: text.toLowerCase() });
    if (isDuplicate) {
        return null;
    }
    ;
    const id = crypto.randomUUID();
    const challenge = yield Challenge.create({ id: id, mood: mood.toLowerCase(), text: text.toLowerCase(), affirmation: affirmation.toLowerCase() });
    const dto = convertChallengeDbToDto(challenge);
    return dto;
});
export const updateChallenge = (id, type, text, affirmation) => __awaiter(void 0, void 0, void 0, function* () {
    const challenge = yield Challenge.findOne({ id: id });
    if (!challenge) {
        return null;
    }
    ;
    if (type) {
        challenge.mood = type.toLowerCase();
    }
    ;
    if (text) {
        challenge.text = text.toLowerCase();
    }
    ;
    if (affirmation) {
        challenge.affirmation = affirmation.toLowerCase();
    }
    ;
    const isDuplicate = yield Challenge.findOne({ mood: challenge.mood, text: challenge.text });
    if (isDuplicate) {
        return "duplicate";
    }
    yield challenge.save();
    const dto = convertChallengeDbToDto(challenge);
    return dto;
});
export const deleteChallenge = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const challengeToBeDeleted = yield Challenge.deleteOne({ id: id });
    return challengeToBeDeleted.deletedCount;
});
export const deleteChallengesByMood = (mood) => __awaiter(void 0, void 0, void 0, function* () {
    const challengesToBeDeleted = yield Challenge.deleteMany({ mood: mood });
    return challengesToBeDeleted.deletedCount;
});
