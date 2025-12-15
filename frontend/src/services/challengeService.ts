import type { IChallenge } from "../models/IChallenge";
import type { Mood } from "../models/IMoodContext";
import { get } from "./baseService";

const BASE_URL = "http://localhost:3000/challenges";

export const getChallenge = async (mood: Mood) => {
    const response = await get<IChallenge>(BASE_URL + "/random?mood=" + mood);

    return response;
}