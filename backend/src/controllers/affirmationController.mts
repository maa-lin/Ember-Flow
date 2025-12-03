import { DeleteResult, InferSchemaType } from "mongoose";
import Affirmation from "../models/AffirmationSchema.mjs";
import { AffirmationDto } from "../models/AffirmationDto.mjs";

type AffirmationType = InferSchemaType<typeof Affirmation.schema>;

const convertAffirmationDbToDto = (affirmation: AffirmationType): AffirmationDto => {
    return{
        id: affirmation.id,
        type: affirmation.type,
        text: affirmation.text
    } satisfies AffirmationDto;
};

export const getAffirmations = async (type: string): Promise<AffirmationDto[]> => {
    let affirmations = await Affirmation.find();
    
    if (type) {
        affirmations = affirmations.filter((a) => a.type === type.toLowerCase());
    };

    const dto = affirmations.map((a) => convertAffirmationDbToDto(a));

    return dto;
};

export const getAffirmation = async (type: string): Promise<AffirmationDto | null> => {
    const result  = await Affirmation.aggregate([
        { $match: { type: type } }, //filter affirmations on type, docs: https://www.mongodb.com/docs/manual/reference/operator/aggregation/match/
        { $sample: { size: 1 } } //select only one random affirmation, docs: https://www.mongodb.com/docs/manual/reference/operator/aggregation/sample/
    ]);

    const randomAffirmation = result[0];

    if(!randomAffirmation) {
        return null;
    }

    const dto = convertAffirmationDbToDto(randomAffirmation);

    return dto;
};

export const getAffirmationById = async (id: string): Promise<AffirmationDto | null> => {
    const affirmation = await Affirmation.findOne({ id: id });

    if (!affirmation) {
        return null;
    }

    const dto = convertAffirmationDbToDto(affirmation);

    return dto;
};

export const createAffirmation = async (type: string, text: string): Promise<AffirmationDto | null> => {
    const isDuplicate = await Affirmation.findOne({ type: type.toLowerCase(), text: text.toLowerCase() });

    if (isDuplicate) {
        return null;
    };

    const id = crypto.randomUUID();
    const affirmation = await Affirmation.create({ id: id, type: type.toLowerCase(), text: text.toLowerCase() });

    const dto = convertAffirmationDbToDto(affirmation);

    return dto;
};

export const updateAffirmation = async (id: string, type: string, text: string): Promise<AffirmationDto | null | "duplicate"> => {
    const affirmation = await Affirmation.findOne({ id: id });

    if (!affirmation) {
        return null;
    };

    if (type) {
        affirmation.type = type.toLowerCase();
    };

    if (text) {
        affirmation.text = text.toLowerCase();
    };
    
    const isDuplicate = await Affirmation.findOne({ type: affirmation.type, text: affirmation.text });

    if (isDuplicate) {
        return "duplicate";
    }

    await affirmation.save();

    const dto = convertAffirmationDbToDto(affirmation);

    return dto;
};

export const deleteAffirmation = async (id: string): Promise<number> => {
    const affirmationToBeDeleted = await Affirmation.deleteOne({ id: id });

    return affirmationToBeDeleted.deletedCount;
};

export const deleteAffirmationsByType = async (type: string): Promise<number> => {
    const affirmationsToBeDeleted = await Affirmation.deleteMany({ type: type });
    
    return affirmationsToBeDeleted.deletedCount;
};