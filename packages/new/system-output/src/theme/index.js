export function applyTheme(mode, root = document.documentElement) {
  root.dataset.theme = mode
}

export function generateThemeScript(defaultMode = "light") {
  return `(function() {
  var mode = localStorage.getItem("jds-theme") || "${defaultMode}";
  document.documentElement.dataset.theme = mode;
})();`
}
