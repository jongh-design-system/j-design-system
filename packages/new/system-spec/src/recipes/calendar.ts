import { defineSlotRecipe } from "../define.ts"

export const calendarRecipe = defineSlotRecipe({
  name: "calendar",
  slots: [
    "root",
    "header",
    "title",
    "navButton",
    "weekday",
    "daysGrid",
    "weekRow",
    "dayCell",
  ],
  base: {
    root: {
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      borderRadius: "radius.md",
      backgroundColor: "color.bg.elevated",
      color: "color.fg.default",
      boxShadow: "shadow.sm",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "color.stroke.subtle",
    },
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "spacing.3",
    },
    title: {
      textStyle: "typography.title.sm",
    },
    navButton: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "2rem",
      height: "2rem",
      borderRadius: "radius.full",
      color: "color.icon.muted",
      cursor: "pointer",
      transitionProperty: "opacity, background-color, color",
      transitionDuration: "motion.duration.fast",
      transitionTimingFunction: "motion.easing.standard",
      _hover: {
        opacity: "0.85",
        backgroundColor: "color.bg.subtle",
      },
      _active: {
        opacity: "0.65",
      },
      _disabled: {
        opacity: "0.4",
        cursor: "not-allowed",
      },
      "&:disabled:hover": {
        backgroundColor: "transparent",
      },
      "& svg": {
        width: "1rem",
        height: "1rem",
      },
    },
    weekday: {
      display: "flex",
      justifyContent: "space-between",
      padding: "spacing.2",
      color: "color.fg.muted",
      textStyle: "typography.label.sm",
    },
    daysGrid: {
      display: "flex",
      flexDirection: "column",
      padding: "spacing.2",
    },
    weekRow: {
      display: "flex",
      width: "100%",
      justifyContent: "space-between",
      marginBottom: "spacing.1",
      "&:last-child": {
        marginBottom: "0",
      },
    },
    dayCell: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minWidth: "2rem",
      minHeight: "2rem",
      borderRadius: "radius.md",
      cursor: "pointer",
      textStyle: "typography.body.sm",
      transitionProperty: "opacity, background-color, color",
      transitionDuration: "motion.duration.fast",
      transitionTimingFunction: "motion.easing.standard",
      _hover: {
        opacity: "0.85",
        backgroundColor: "color.bg.subtle",
      },
      _active: {
        opacity: "0.65",
      },
      "&[data-hidden='true']": {
        visibility: "hidden",
      },
      "&[data-outside-month='true']": {
        color: "color.fg.subtle",
      },
    },
  },
  variants: {},
  compoundVariants: [],
  defaultVariants: {},
})
