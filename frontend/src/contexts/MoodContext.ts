import { createContext } from "react";
import type { IMoodContext } from "../models/IMoodContext";

export const MoodContext = createContext<IMoodContext | null>(null);