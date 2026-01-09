import { ActionTypes } from "../reducers/DailyStateReducer";
import { dailyReset } from "../utils/dailyReset";
import * as localstorageUtils from "../utils/localStorage";

describe("Daily reset test", () => {
    let mockedSaveMoodToLocalStorage = jest.spyOn(localstorageUtils, "saveMoodToLocalStorage");
    let mockedsaveChallengeStatusToLocalStorage = jest.spyOn(localstorageUtils, "saveChallengeStatusToLocalStorage");
    let mockedsaveDailyStateToLocalStorage = jest.spyOn(localstorageUtils, "saveDailyStateToLocalStorage");
    let mockedsaveHasClickedStartTheDayToLocalStorage = jest.spyOn(localstorageUtils, "saveHasClickedStartTheDayToLocalStorage");

    beforeEach(() => {
        mockedSaveMoodToLocalStorage.mockClear();
        mockedsaveChallengeStatusToLocalStorage.mockClear();
        mockedsaveDailyStateToLocalStorage.mockClear();
    });

    test("It should call dispatch and localstorage functions", () => {
        const dispatch = jest.fn();
        const setMood = jest.fn();

        dailyReset(dispatch, setMood);

        expect(dispatch).toHaveBeenCalledWith({ type: ActionTypes.RESET });
        expect(setMood).toHaveBeenCalledWith(null);

        expect(mockedSaveMoodToLocalStorage).toHaveBeenCalledWith(null);
        expect(mockedsaveChallengeStatusToLocalStorage).toHaveBeenCalledWith("active");
        expect(mockedsaveDailyStateToLocalStorage).toHaveBeenCalled();
        expect(mockedsaveHasClickedStartTheDayToLocalStorage).toHaveBeenCalledWith(false);
    });
});