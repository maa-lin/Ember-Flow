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
import Affirmation from "../models/AffirmationSchema.mjs";
const convertAffirmationDbToDto = (affirmation) => {
    return {
        id: affirmation.id,
        type: affirmation.type,
        text: affirmation.text
    };
};
export const getAffirmations = (type) => __awaiter(void 0, void 0, void 0, function* () {
    let affirmations = yield Affirmation.find();
    if (type) {
        affirmations = affirmations.filter((a) => a.type === type.toLowerCase());
    }
    ;
    const dto = affirmations.map((a) => convertAffirmationDbToDto(a));
    return dto;
});
export const getAffirmation = (type) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Affirmation.aggregate([
        { $match: { type: type } }, //filter affirmations on type, docs: https://www.mongodb.com/docs/manual/reference/operator/aggregation/match/
        { $sample: { size: 1 } } //select only one random affirmation, docs: https://www.mongodb.com/docs/manual/reference/operator/aggregation/sample/
    ]);
    const randomAffirmation = result[0];
    if (!randomAffirmation) {
        return null;
    }
    const dto = convertAffirmationDbToDto(randomAffirmation);
    return dto;
});
export const getAffirmationById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const affirmation = yield Affirmation.findOne({ id: id });
    if (!affirmation) {
        return null;
    }
    const dto = convertAffirmationDbToDto(affirmation);
    return dto;
});
export const createAffirmation = (type, text) => __awaiter(void 0, void 0, void 0, function* () {
    const isDuplicate = yield Affirmation.findOne({ type: type.toLowerCase(), text: text.toLowerCase() });
    if (isDuplicate) {
        return null;
    }
    ;
    const id = crypto.randomUUID();
    const affirmation = yield Affirmation.create({ id: id, type: type.toLowerCase(), text: text.toLowerCase() });
    const dto = convertAffirmationDbToDto(affirmation);
    return dto;
});
export const updateAffirmation = (id, type, text) => __awaiter(void 0, void 0, void 0, function* () {
    const affirmation = yield Affirmation.findOne({ id: id });
    if (!affirmation) {
        return null;
    }
    ;
    if (type) {
        affirmation.type = type.toLowerCase();
    }
    ;
    if (text) {
        affirmation.text = text.toLowerCase();
    }
    ;
    const isDuplicate = yield Affirmation.findOne({ type: affirmation.type, text: affirmation.text });
    if (isDuplicate) {
        return "duplicate";
    }
    yield affirmation.save();
    const dto = convertAffirmationDbToDto(affirmation);
    return dto;
});
export const deleteAffirmation = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const affirmationToBeDeleted = yield Affirmation.deleteOne({ id: id });
    return affirmationToBeDeleted.deletedCount;
});
export const deleteAffirmationsByType = (type) => __awaiter(void 0, void 0, void 0, function* () {
    const affirmationsToBeDeleted = yield Affirmation.deleteMany({ type: type });
    return affirmationsToBeDeleted.deletedCount;
});
