export declare type PrimitiveColorTokenPath =
  | "color.neutral.1"
  | "color.neutral.2"
  | "color.neutral.3"
  | "color.neutral.4"
  | "color.neutral.5"
  | "color.neutral.6"
  | "color.neutral.7"
  | "color.neutral.8"
  | "color.neutral.9"
  | "color.neutral.10"
  | "color.neutral.11"
  | "color.neutral.12"
  | "color.brand.1"
  | "color.brand.2"
  | "color.brand.3"
  | "color.brand.4"
  | "color.brand.5"
  | "color.brand.6"
  | "color.brand.7"
  | "color.brand.8"
  | "color.brand.9"
  | "color.brand.10"
  | "color.brand.11"
  | "color.brand.12"
  | "color.success.1"
  | "color.success.2"
  | "color.success.3"
  | "color.success.4"
  | "color.success.5"
  | "color.success.6"
  | "color.success.7"
  | "color.success.8"
  | "color.success.9"
  | "color.success.10"
  | "color.success.11"
  | "color.success.12"
  | "color.warning.1"
  | "color.warning.2"
  | "color.warning.3"
  | "color.warning.4"
  | "color.warning.5"
  | "color.warning.6"
  | "color.warning.7"
  | "color.warning.8"
  | "color.warning.9"
  | "color.warning.10"
  | "color.warning.11"
  | "color.warning.12"
  | "color.danger.1"
  | "color.danger.2"
  | "color.danger.3"
  | "color.danger.4"
  | "color.danger.5"
  | "color.danger.6"
  | "color.danger.7"
  | "color.danger.8"
  | "color.danger.9"
  | "color.danger.10"
  | "color.danger.11"
  | "color.danger.12"
  | "color.info.1"
  | "color.info.2"
  | "color.info.3"
  | "color.info.4"
  | "color.info.5"
  | "color.info.6"
  | "color.info.7"
  | "color.info.8"
  | "color.info.9"
  | "color.info.10"
  | "color.info.11"
  | "color.info.12"
export declare type SemanticColorTokenPath =
  | "color.bg.canvas"
  | "color.bg.surface"
  | "color.bg.subtle"
  | "color.bg.elevated"
  | "color.bg.accent"
  | "color.bg.accent-hovered"
  | "color.bg.accent-active"
  | "color.fg.default"
  | "color.fg.muted"
  | "color.fg.subtle"
  | "color.fg.inverse"
  | "color.fg.accent"
  | "color.stroke.default"
  | "color.stroke.subtle"
  | "color.stroke.strong"
  | "color.stroke.accent"
  | "color.icon.default"
  | "color.icon.muted"
  | "color.icon.accent"
  | "color.focus.ring"
  | "color.overlay.default"
  | "color.success.default"
  | "color.warning.default"
  | "color.danger.default"
  | "color.info.default"
export declare type ColorTokenPath =
  | PrimitiveColorTokenPath
  | SemanticColorTokenPath
export declare type PrimitiveSpacingTokenPath =
  | "spacing.0"
  | "spacing.1"
  | "spacing.2"
  | "spacing.3"
  | "spacing.4"
  | "spacing.5"
  | "spacing.6"
  | "spacing.8"
  | "spacing.10"
  | "spacing.12"
  | "spacing.0.5"
  | "spacing.1.5"
  | "spacing.2.5"
  | "spacing.3.5"
export declare type SemanticSpacingTokenPath = never
export declare type SpacingTokenPath =
  | PrimitiveSpacingTokenPath
  | SemanticSpacingTokenPath
export declare type PrimitiveRadiusTokenPath =
  | "radius.none"
  | "radius.xs"
  | "radius.sm"
  | "radius.md"
  | "radius.lg"
  | "radius.xl"
  | "radius.full"
export declare type SemanticRadiusTokenPath = never
export declare type RadiusTokenPath =
  | PrimitiveRadiusTokenPath
  | SemanticRadiusTokenPath
export declare type PrimitiveShadowTokenPath =
  | "shadow.sm"
  | "shadow.md"
  | "shadow.lg"
export declare type SemanticShadowTokenPath = never
export declare type ShadowTokenPath =
  | PrimitiveShadowTokenPath
  | SemanticShadowTokenPath
export declare type PrimitiveMotionDurationTokenPath =
  | "motion.duration.fast"
  | "motion.duration.normal"
  | "motion.duration.slow"
export declare type SemanticMotionDurationTokenPath = never
export declare type MotionDurationTokenPath =
  | PrimitiveMotionDurationTokenPath
  | SemanticMotionDurationTokenPath
export declare type PrimitiveMotionEasingTokenPath =
  | "motion.easing.standard"
  | "motion.easing.emphasized"
export declare type SemanticMotionEasingTokenPath = never
export declare type MotionEasingTokenPath =
  | PrimitiveMotionEasingTokenPath
  | SemanticMotionEasingTokenPath
export declare type PrimitiveTypographyTokenPath =
  | "typography.body.sm"
  | "typography.body.md"
  | "typography.label.sm"
  | "typography.label.md"
  | "typography.title.sm"
  | "typography.title.md"
  | "typography.title.lg"
export declare type SemanticTypographyTokenPath = never
export declare type TypographyTokenPath =
  | PrimitiveTypographyTokenPath
  | SemanticTypographyTokenPath

export declare const tokens: {
  readonly primitive: {
    readonly color: {
      readonly neutral: {
        readonly "1": string
        readonly "2": string
        readonly "3": string
        readonly "4": string
        readonly "5": string
        readonly "6": string
        readonly "7": string
        readonly "8": string
        readonly "9": string
        readonly "10": string
        readonly "11": string
        readonly "12": string
      }
      readonly brand: {
        readonly "1": string
        readonly "2": string
        readonly "3": string
        readonly "4": string
        readonly "5": string
        readonly "6": string
        readonly "7": string
        readonly "8": string
        readonly "9": string
        readonly "10": string
        readonly "11": string
        readonly "12": string
      }
      readonly success: {
        readonly "1": string
        readonly "2": string
        readonly "3": string
        readonly "4": string
        readonly "5": string
        readonly "6": string
        readonly "7": string
        readonly "8": string
        readonly "9": string
        readonly "10": string
        readonly "11": string
        readonly "12": string
      }
      readonly warning: {
        readonly "1": string
        readonly "2": string
        readonly "3": string
        readonly "4": string
        readonly "5": string
        readonly "6": string
        readonly "7": string
        readonly "8": string
        readonly "9": string
        readonly "10": string
        readonly "11": string
        readonly "12": string
      }
      readonly danger: {
        readonly "1": string
        readonly "2": string
        readonly "3": string
        readonly "4": string
        readonly "5": string
        readonly "6": string
        readonly "7": string
        readonly "8": string
        readonly "9": string
        readonly "10": string
        readonly "11": string
        readonly "12": string
      }
      readonly info: {
        readonly "1": string
        readonly "2": string
        readonly "3": string
        readonly "4": string
        readonly "5": string
        readonly "6": string
        readonly "7": string
        readonly "8": string
        readonly "9": string
        readonly "10": string
        readonly "11": string
        readonly "12": string
      }
    }
    readonly spacing: {
      readonly "0": {
        readonly "5": string
      }
      readonly "1": {
        readonly "5": string
      }
      readonly "2": {
        readonly "5": string
      }
      readonly "3": {
        readonly "5": string
      }
      readonly "4": string
      readonly "5": string
      readonly "6": string
      readonly "8": string
      readonly "10": string
      readonly "12": string
    }
    readonly radius: {
      readonly none: string
      readonly xs: string
      readonly sm: string
      readonly md: string
      readonly lg: string
      readonly xl: string
      readonly full: string
    }
    readonly shadow: {
      readonly sm: string
      readonly md: string
      readonly lg: string
    }
    readonly motion: {
      readonly duration: {
        readonly fast: string
        readonly normal: string
        readonly slow: string
      }
      readonly easing: {
        readonly standard: string
        readonly emphasized: string
      }
    }
    readonly typography: {
      readonly body: {
        readonly sm: {
          readonly fontSize: string
          readonly lineHeight: string
          readonly fontWeight: string
          readonly letterSpacing: string
        }
        readonly md: {
          readonly fontSize: string
          readonly lineHeight: string
          readonly fontWeight: string
          readonly letterSpacing: string
        }
      }
      readonly label: {
        readonly sm: {
          readonly fontSize: string
          readonly lineHeight: string
          readonly fontWeight: string
          readonly letterSpacing: string
        }
        readonly md: {
          readonly fontSize: string
          readonly lineHeight: string
          readonly fontWeight: string
          readonly letterSpacing: string
        }
      }
      readonly title: {
        readonly sm: {
          readonly fontSize: string
          readonly lineHeight: string
          readonly fontWeight: string
          readonly letterSpacing: string
        }
        readonly md: {
          readonly fontSize: string
          readonly lineHeight: string
          readonly fontWeight: string
          readonly letterSpacing: string
        }
        readonly lg: {
          readonly fontSize: string
          readonly lineHeight: string
          readonly fontWeight: string
          readonly letterSpacing: string
        }
      }
    }
  }
  readonly semantic: {
    readonly color: {
      readonly bg: {
        readonly canvas: string
        readonly surface: string
        readonly subtle: string
        readonly elevated: string
        readonly accent: string
        readonly "accent-hovered": string
        readonly "accent-active": string
      }
      readonly fg: {
        readonly default: string
        readonly muted: string
        readonly subtle: string
        readonly inverse: string
        readonly accent: string
      }
      readonly stroke: {
        readonly default: string
        readonly subtle: string
        readonly strong: string
        readonly accent: string
      }
      readonly icon: {
        readonly default: string
        readonly muted: string
        readonly accent: string
      }
      readonly focus: {
        readonly ring: string
      }
      readonly overlay: {
        readonly default: string
      }
      readonly success: {
        readonly default: string
      }
      readonly warning: {
        readonly default: string
      }
      readonly danger: {
        readonly default: string
      }
      readonly info: {
        readonly default: string
      }
    }
  }
}

export declare type Tokens = typeof tokens
