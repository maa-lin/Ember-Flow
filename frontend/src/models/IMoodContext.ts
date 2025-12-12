export interface IMoodContext {
    mood: Mood,
    setMood: (mood: Mood) => void
};

export type Mood = "happy" | "calm" | "neutral" | "stressed" | null;
