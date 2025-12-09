import { getTimeStampFromLocalStorage } from "./localStorage";

export const checkTimeStamp = () => {
    const timeStamp = getTimeStampFromLocalStorage();

    if (!timeStamp) return false;

    const lastUpdated = new Date(timeStamp);
    const now = new Date();

    const resetTime = new Date;
    resetTime.setHours(3,0,0,0);

    return lastUpdated < resetTime && resetTime >= now;
}