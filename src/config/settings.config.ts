export type TSettingsThemeMode = "light" | "dark" | "system";

export interface ISettings {
  themeMode: TSettingsThemeMode;
}

// Default settings for the application
const defaultSettings: ISettings = {
  themeMode: "light", // Default to light mode for the application
};

export { defaultSettings };
