import { getTimeStampFromLocalStorage } from "./localStorage";

export const checkIfNewDay = () => {
    const timeStamp = getTimeStampFromLocalStorage();

    if (!timeStamp) return false;

    const lastUpdated = new Date(timeStamp);
    const now = new Date();

    const resetTime = new Date;
    resetTime.setHours(3,0,0,0);

    // If time right now is before 03.00, treat reset time as yesterday's 03.00.
    if (now < resetTime) {
        resetTime.setDate(resetTime.getDate() - 1)
    };

    return lastUpdated < resetTime;
};