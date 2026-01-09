import type { IAffirmation } from "../models/IAffirmation"
import { get } from "./baseService"

const BASE_URL = "https://ember-flow-backend.onrender.com/affirmations"

export const getAffirmation = async (type: string) => {
    const response = await get<IAffirmation>(BASE_URL + "/random?type=" + type);
    
    return response;
}