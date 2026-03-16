import { defineSlotRecipe } from "../define.ts"

export const accordionRecipe = defineSlotRecipe({
  name: "accordion",
  slots: ["root", "item", "header", "trigger", "content", "contentWrapper"],
  base: {
    root: {},
    item: {},
    header: {
      display: "flex",
    },
    trigger: {
      display: "flex",
      flex: "1",
      alignItems: "center",
      justifyContent: "space-between",
      paddingInline: "spacing.1",
      paddingBlock: "spacing.2",
      color: "color.fg.default",
      cursor: "pointer",
      textStyle: "typography.title.sm",
      transitionProperty: "color, background-color",
      transitionDuration: "motion.duration.fast",
      transitionTimingFunction: "motion.easing.standard",
      "& > svg": {
        width: "1rem",
        height: "1rem",
        flexShrink: "0",
        transition: "transform 180ms cubic-bezier(0.2, 0, 0, 1)",
      },
      "&[data-state='open'] > svg": {
        transform: "rotate(180deg)",
      },
    },
    content: {
      overflow: "hidden",
      color: "color.fg.muted",
      textStyle: "typography.body.sm",
      "&[data-state='closed']": {
        animationDuration: "motion.duration.normal",
        animationName: "accordion-up_radix",
      },
      "&[data-state='open']": {
        animationDuration: "motion.duration.normal",
        animationName: "accordion-down_radix",
      },
    },
    contentWrapper: {
      paddingInline: "spacing.1",
      paddingBlock: "spacing.2",
    },
  },
  variants: {
    variant: {
      outline: {
        item: {
          borderBottomWidth: "1px",
          borderBottomStyle: "solid",
          borderBottomColor: "color.stroke.subtle",
        },
        trigger: {
          _hover: {
            color: "color.fg.accent",
          },
        },
      },
      subtle: {
        item: {
          borderRadius: "radius.md",
          "&[data-state='open']": {
            backgroundColor: "color.bg.subtle",
          },
        },
        header: {
          borderRadius: "radius.md",
        },
        trigger: {
          borderRadius: "radius.md",
          _hover: {
            backgroundColor: "color.bg.subtle",
          },
        },
      },
    },
  },
  compoundVariants: [],
  defaultVariants: {
    variant: "outline",
  },
})
