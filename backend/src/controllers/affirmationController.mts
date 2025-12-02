import { InferSchemaType } from "mongoose";
import Affirmation from "../models/AffirmationSchema.mjs";
import { AffirmationDto } from "../models/AffirmationDto.mjs";

type AffirmationType = InferSchemaType<typeof Affirmation.schema>;

const convertAffirmationDbToDto = (affirmation: AffirmationType): AffirmationDto => {
    return{
        type: affirmation.type,
        text: affirmation.text
    } satisfies AffirmationDto;
}

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

export const getAffirmations = async (type: string): Promise<AffirmationDto[]> => {
    let affirmations = await Affirmation.find();
    
    if (type) {
        affirmations = affirmations.filter((a) => a.type === type.toLowerCase());
    };

    const dto = affirmations.map((a) => convertAffirmationDbToDto(a));

    return dto;
}