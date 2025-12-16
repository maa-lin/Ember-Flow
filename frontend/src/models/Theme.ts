export type Theme = {
    bgColor: string
};

type Themes = {
    sunrise: Theme,
    sunset: Theme
};

export const themes: Themes = {
    sunrise: {
        bgColor: "lightgrey"
    },
    sunset: {
        bgColor: "black"
    }
};

// So you can use a key ("sunrise" or "sunset") instead of 
// storing a whole theme object in context.
export type ThemeKey = keyof Themes; 
