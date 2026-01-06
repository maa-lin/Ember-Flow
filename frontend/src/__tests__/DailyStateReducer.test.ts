import { ActionTypes, DailyStateReducer } from "../reducers/DailyStateReducer";

describe("Reducer Reset Test", () => {
    test("It should reset lists", () => {

    });

    const dailyState = {
        lists: {
            focus: [
                { id: "1", text: "focus1", isDone: true}, 
                { id: "2", text: "focus2", isDone: true}, 
                { id: "3", text: "focus3", isDone: true} 
            ],
            selfCare: [
                { id: "3", text: "selfCare1", isDone: false}, 
                { id: "4", text: "selfCare2", isDone: true}, 
            ]
        },
        challenge: {
            id: "6", 
            mood: "happy", 
            text: "a challenge", 
            affirmation: "an affirmation"}
    };

    
    test("It should reset challenge to null", () => {
        const resetState = DailyStateReducer(dailyState, { type: "RESET" });
        expect(resetState.challenge).toBe(null);
    });

    test("It should reset lists to empty strings for text and false for isDone", () => {
        const resetState = DailyStateReducer(dailyState, { type: "RESET" });

        expect(resetState.lists.focus).toHaveLength(3);
        expect(resetState.lists.selfCare).toHaveLength(2);
        resetState.lists.focus.forEach((item) => {
            expect(item.text).toBe("");
            expect(item.isDone).toBe(false);
        });
        resetState.lists.selfCare.forEach((item) => {
            expect(item.text).toBe("");
            expect(item.isDone).toBe(false);
        });
    });
})