export const template = `
  import { defineConfig, defineSemanticTokens, definePreset } from "@pandacss/dev"

const colors = defineSemanticTokens.colors({
      "background": {
  "value": { "base": "{colors.white}", "_dark": "{colors.{{gray}}.950}" }
},
"foreground": {
  "value": { "base": "{colors.{{gray}}.950}", "_dark": "{colors.{{gray}}.50}" }
},
"card": {
  "DEFAULT": {
    "value": { "base": "{colors.white}", "_dark": "{colors.{{gray}}.900}" }
  },
  "foreground": {
    "value": { "base": "{colors.{{gray}}.950}", "_dark": "{colors.{{gray}}.50}" }
  }
},
"popover": {
  "DEFAULT": {
    "value": { "base": "{colors.white}", "_dark": "{colors.{{gray}}.900}" }
  },
  "foreground": {
    "value": { "base": "{colors.{{gray}}.950}", "_dark": "{colors.{{gray}}.50}" }
  }
},
"primary": {
  "DEFAULT": {
    "value": { "base": "{colors.{{primary}}.600}", "_dark": "{colors.{{primary}}.400}" }
  },
  "foreground": {
    "value": { "base": "{colors.white}", "_dark": "{colors.{{gray}}.950}" }
  }
},
"secondary": {
  "DEFAULT": {
    "value": { "base": "{colors.{{secondary}}.600}", "_dark": "{colors.{{secondary}}.400}" }
  },
  "foreground": {
    "value": { "base": "{colors.white}", "_dark": "{colors.{{gray}}.950}" }
  }
},
"muted": {
  "DEFAULT": {
    "value": { "base": "{colors.{{gray}}.100}", "_dark": "{colors.{{gray}}.800}" }
  },
  "foreground": {
    "value": { "base": "{colors.{{gray}}.500}", "_dark": "{colors.{{gray}}.400}" }
  }
},
"accent": {
  "DEFAULT": {
    "value": { "base": "{colors.{{secondary}}.100}", "_dark": "{colors.{{secondary}}.800}" }
  },
  "foreground": {
    "value": { "base": "{colors.{{secondary}}.900}", "_dark": "{colors.{{secondary}}.50}" }
  }
},
"destructive": {
  "DEFAULT": {
    "value": { "base": "{colors.red.500}", "_dark": "{colors.red.400}" }
  },
  "foreground": {
    "value": { "base": "{colors.white}", "_dark": "{colors.{{gray}}.950}" }
  }
},
"border": {
  "value": { "base": "{colors.{{gray}}.200}", "_dark": "{colors.{{gray}}.800}" }
},
"input": {
  "value": { "base": "{colors.{{gray}}.200}", "_dark": "{colors.{{gray}}.800}" }
},
"ring": {
  "value": { "base": "{colors.{{primary}}.500}", "_dark": "{colors.{{primary}}.400}" }
}})
  
const borders = defineSemanticTokens.borders({
  base: { value: "1px solid {colors.border}" },
  input: { value: "1px solid {colors.input}" },
  primary: { value: "1px solid {colors.primary}" },
  destructive: { value: "1px solid {colors.destructive}" },
})

export const defaultPreset = definePreset({
  name: "default",
  globalCss: {
    html: {
      background: 'background',
      color: 'foreground'
    },
  },
  theme: {
    extend: {
      semanticTokens: {
        colors,
        borders,

      },
    },
  },
})


`
