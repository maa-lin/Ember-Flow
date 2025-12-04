import type { IAffirmation } from "../models/IAffirmation"
import { get } from "./baseService"

const BASE_URL = "http://localhost:3000/affirmations"

export const getAffirmation = async (type: string) => {
    const response = await get<IAffirmation>(BASE_URL + "/random?type=" + type);
    
    return response;
}