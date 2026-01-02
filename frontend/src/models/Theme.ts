export type Theme = {
    theme: string,
    primaryTextColor: string,
    secondaryTextColor: string,
    modalBgColor: string,
    itemBg: string,
    opacity: string,
    shadowS: string,
    helpIconBg: string,
    linkColor: string,
    disabledText: string
};

type Themes = {
    sunrise: Theme,
    sunset: Theme
};

export const themes: Themes = {
    sunrise: {
        theme: "theme-sunrise",
        primaryTextColor: "#eed8c1",
        secondaryTextColor: "#f4c58f",
        modalBgColor: "var(--modal-bg-sunrise)",
        itemBg: "var(--item-bg-sunrise)",
        opacity: "0.5",
        shadowS: "var(--shadow-s-sunrise)",
        helpIconBg: "var(--modal-bg-sunrise)",
        linkColor: "var(--link-sunrise)",
        disabledText: "var(--disabled-text-sunrise)",
    },
    sunset: {
        theme: "theme-sunset",
        primaryTextColor: "var(--primary-text-sunset)",
        secondaryTextColor: "var(--secondary-text-sunset)",
        modalBgColor: "var(--modal-bg-sunset)",
        itemBg: "var(--item-bg-sunset)",
        opacity: "0.5",
        shadowS: "var(--shadow-s-sunset)",
        helpIconBg: "var(--modal-bg-sunset)",
        linkColor: "var(--link-sunset)",
        disabledText: "var(--disabled-text-sunset)",
    }
};

// So you can use a key ("sunrise" or "sunset") instead of 
// storing a whole theme object in context.
export type ThemeKey = keyof Themes; 
