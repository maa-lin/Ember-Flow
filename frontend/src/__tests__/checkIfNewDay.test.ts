import { checkIfNewDay } from "../utils/checkIfNewDay";
import * as localStorageUtils from "../utils/localStorage";

describe("Check if it is a new day test", () => {
    let mockedgetTimeStampFromLocalStorage = jest.spyOn(
        localStorageUtils, "getTimeStampFromLocalStorage"
    );

    beforeEach(() => {
        mockedgetTimeStampFromLocalStorage.mockClear();
    });

    test("It should return true if there is no timestamp", () => {
        mockedgetTimeStampFromLocalStorage.mockReturnValue(null);

        expect(checkIfNewDay()).toBe(true);
    });

    test("It should return true if last update was before reset time (3:00)", () => {
        const timestamp = new Date("2026-01-04T00:00:00.000Z").getTime();

        mockedgetTimeStampFromLocalStorage.mockReturnValue(timestamp);

        expect(checkIfNewDay()).toBe(true);
    });

    test("It should return false if last update was after reset time (3:00)", () => {
        const now = Date.now();

        mockedgetTimeStampFromLocalStorage.mockReturnValue(now);

        expect(checkIfNewDay()).toBe(false);
    });
})