import type { z } from "zod"

import type { compilerSystemSchema } from "../normalize/schema.ts"
import { getKeyframesName } from "./keyframes.ts"
import { getTokenValue } from "./tokens.ts"
import type {
  CompositeRegistry,
  KeyframesRegistry,
  TokenRegistry,
} from "./types.ts"

type NormalizedComposites = z.infer<typeof compilerSystemSchema>["composites"]

export function createCompositeRegistry(
  composites: NormalizedComposites,
  tokens: TokenRegistry,
  keyframes: KeyframesRegistry,
): CompositeRegistry {
  return {
    animations: new Map(
      composites.animations.map((animation) => {
        const declarations = [
          {
            property: "animation-name",
            value: getKeyframesName(keyframes, animation.keyframes),
          },
          {
            property: "animation-duration",
            value: getTokenValue(tokens, animation.duration),
          },
          {
            property: "animation-timing-function",
            value: getTokenValue(tokens, animation.easing),
          },
        ]

        if (animation.delay !== undefined) {
          declarations.push({
            property: "animation-delay",
            value: getTokenValue(tokens, animation.delay),
          })
        }

        if (animation.fillMode !== undefined) {
          declarations.push({
            property: "animation-fill-mode",
            value: animation.fillMode,
          })
        }

        if (animation.iterationCount !== undefined) {
          declarations.push({
            property: "animation-iteration-count",
            value: String(animation.iterationCount),
          })
        }

        if (animation.direction !== undefined) {
          declarations.push({
            property: "animation-direction",
            value: animation.direction,
          })
        }

        return [`animation.${animation.name}`, declarations]
      }),
    ),
    textStyles: new Map(
      composites.textStyles.map((textStyle) => {
        const declarations = [
          {
            property: "font-size",
            value: getTokenValue(tokens, textStyle.fontSize),
          },
          {
            property: "line-height",
            value: getTokenValue(tokens, textStyle.lineHeight),
          },
          {
            property: "font-weight",
            value: getTokenValue(tokens, textStyle.fontWeight),
          },
        ]

        if (textStyle.letterSpacing !== undefined) {
          declarations.push({
            property: "letter-spacing",
            value: getTokenValue(tokens, textStyle.letterSpacing),
          })
        }

        return [`textStyle.${textStyle.name}`, declarations]
      }),
    ),
  }
}

export function getAnimationDeclarations(
  registry: CompositeRegistry,
  reference: string,
) {
  const declarations = registry.animations.get(reference)

  if (declarations === undefined) {
    throw new Error(`Unknown animation reference "${reference}"`)
  }

  return declarations
}

export function getTextStyleDeclarations(
  registry: CompositeRegistry,
  reference: string,
) {
  const declarations = registry.textStyles.get(reference)

  if (declarations === undefined) {
    throw new Error(`Unknown textStyle reference "${reference}"`)
  }

  return declarations
}
