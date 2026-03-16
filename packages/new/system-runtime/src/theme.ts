export type ThemeMode = "light" | "dark"

export function applyTheme(
  mode: ThemeMode,
  root: HTMLElement = document.documentElement,
): void {
  root.dataset.theme = mode
}

export function generateThemeScript(defaultMode: ThemeMode = "light"): string {
  return `(function() {
  var mode = localStorage.getItem("jds-theme") || "${defaultMode}";
  document.documentElement.dataset.theme = mode;
})();`
}
