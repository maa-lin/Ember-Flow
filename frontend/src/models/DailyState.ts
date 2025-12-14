import type { IChallenge } from "./IChallenge"
import type { Lists } from "./List"

export type DailyState = {
    lists: Lists,
    challenge: IChallenge | null
};