export type Theme = {
    bg: string
};

type Themes = {
    sunrise: Theme,
    sunset: Theme
};

export const themes: Themes = {
    sunrise: {
        bg: "theme-sunrise"
    },
    sunset: {
        bg: "linear-gradient(180deg, #806956ff 0%, #624b3dff 35%, #543f2aff 65%, #38302aff 100%)"
    }
};

// So you can use a key ("sunrise" or "sunset") instead of 
// storing a whole theme object in context.
export type ThemeKey = keyof Themes; 
