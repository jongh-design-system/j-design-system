export declare type ThemeMode = "light" | "dark"

export declare function applyTheme(mode: ThemeMode, root?: HTMLElement): void

export declare function generateThemeScript(defaultMode?: ThemeMode): string
