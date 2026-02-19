type KeyframeStep = Record<string, string>
type Keyframe = Record<string, KeyframeStep>

export const keyframes: Record<string, Keyframe> = {
  "accordion-down": {
    from: { height: "0" },
    to: { height: "var(--radix-accordion-content-height)" },
  },
  "accordion-up": {
    from: { height: "var(--radix-accordion-content-height)" },
    to: { height: "0" },
  },
  bounce: {
    "0%, 20%, 53%, to": {
      "animation-timing-function": "cubic-bezier(0.215, 0.61, 0.355, 1)",
      transform: "translateZ(0)",
    },
    "40%, 43%": {
      "animation-timing-function": "cubic-bezier(0.755, 0.05, 0.855, 0.06)",
      transform: "translate3d(0, -30px, 0) scaleY(1.1)",
    },
    "70%": {
      "animation-timing-function": "cubic-bezier(0.755, 0.05, 0.855, 0.06)",
      transform: "translate3d(0, -15px, 0) scaleY(1.05)",
    },
    "80%": {
      "transition-timing-function": "cubic-bezier(0.215, 0.61, 0.355, 1)",
      transform: "translateZ(0) scaleY(0.95)",
    },
    "90%": { transform: "translate3d(0, -4px, 0) scaleY(1.02)" },
  },
  flash: {
    "0%, 50%, to": { opacity: "1" },
    "25%, 75%": { opacity: "0" },
  },
  pulse: {
    "0%": { transform: "scaleX(1)" },
    "50%": { transform: "scale3d(1.05, 1.05, 1.05)" },
    to: { transform: "scaleX(1)" },
  },
  "rubber-band": {
    "0%": { transform: "scaleX(1)" },
    "30%": { transform: "scale3d(1.25, 0.75, 1)" },
    "40%": { transform: "scale3d(0.75, 1.25, 1)" },
    "50%": { transform: "scale3d(1.15, 0.85, 1)" },
    "65%": { transform: "scale3d(0.95, 1.05, 1)" },
    "75%": { transform: "scale3d(1.05, 0.95, 1)" },
    to: { transform: "scaleX(1)" },
  },
  "shake-x": {
    "0%, to": { transform: "translateZ(0)" },
    "10%, 30%, 50%, 70%, 90%": { transform: "translate3d(-10px, 0, 0)" },
    "20%, 40%, 60%, 80%": { transform: "translate3d(10px, 0, 0)" },
  },
  "shake-y": {
    "0%, to": { transform: "translateZ(0)" },
    "10%, 30%, 50%, 70%, 90%": { transform: "translate3d(0, -10px, 0)" },
    "20%, 40%, 60%, 80%": { transform: "translate3d(0, 10px, 0)" },
  },
  "head-shake": {
    "0%": { transform: "translateX(0)" },
    "6.5%": { transform: "translateX(-6px) rotateY(-9deg)" },
    "18.5%": { transform: "translateX(5px) rotateY(7deg)" },
    "31.5%": { transform: "translateX(-3px) rotateY(-5deg)" },
    "43.5%": { transform: "translateX(2px) rotateY(3deg)" },
    "50%": { transform: "translateX(0)" },
  },
  swing: {
    "20%": { transform: "rotate(15deg)" },
    "40%": { transform: "rotate(-10deg)" },
    "60%": { transform: "rotate(5deg)" },
    "80%": { transform: "rotate(-5deg)" },
    to: { transform: "rotate(0deg)" },
  },
  tada: {
    "0%": { transform: "scaleX(1)" },
    "10%, 20%": { transform: "scale3d(0.9, 0.9, 0.9) rotate(-3deg)" },
    "30%, 50%, 70%, 90%": { transform: "scale3d(1.1, 1.1, 1.1) rotate(3deg)" },
    "40%, 60%, 80%": { transform: "scale3d(1.1, 1.1, 1.1) rotate(-3deg)" },
    to: { transform: "scaleX(1)" },
  },
  wobble: {
    "0%": { transform: "translateZ(0)" },
    "15%": { transform: "translate3d(-25%, 0, 0) rotate(-5deg)" },
    "30%": { transform: "translate3d(20%, 0, 0) rotate(3deg)" },
    "45%": { transform: "translate3d(-15%, 0, 0) rotate(-3deg)" },
    "60%": { transform: "translate3d(10%, 0, 0) rotate(2deg)" },
    "75%": { transform: "translate3d(-5%, 0, 0) rotate(-1deg)" },
    to: { transform: "translateZ(0)" },
  },
  jello: {
    "0%, 11.1%, to": { transform: "translateZ(0)" },
    "22.2%": { transform: "skewX(-12.5deg) skewY(-12.5deg)" },
    "33.3%": { transform: "skewX(6.25deg) skewY(6.25deg)" },
    "44.4%": { transform: "skewX(-3.125deg) skewY(-3.125deg)" },
    "55.5%": { transform: "skewX(1.5625deg) skewY(1.5625deg)" },
    "66.6%": { transform: "skewX(-0.78125deg) skewY(-0.78125deg)" },
    "77.7%": { transform: "skewX(0.390625deg) skewY(0.390625deg)" },
    "88.8%": { transform: "skewX(-0.1953125deg) skewY(-0.1953125deg)" },
  },
  "heart-beat": {
    "0%": { transform: "scale(1)" },
    "14%": { transform: "scale(1.3)" },
    "28%": { transform: "scale(1)" },
    "42%": { transform: "scale(1.3)" },
    "70%": { transform: "scale(1)" },
  },
  "back-in-down": {
    "0%": { transform: "translateY(-1200px) scale(0.7)", opacity: "0.7" },
    "80%": { transform: "translateY(0) scale(0.7)", opacity: "0.7" },
    to: { transform: "scale(1)", opacity: "1" },
  },
  "back-in-left": {
    "0%": { transform: "translateX(-2000px) scale(0.7)", opacity: "0.7" },
    "80%": { transform: "translateX(0) scale(0.7)", opacity: "0.7" },
    to: { transform: "scale(1)", opacity: "1" },
  },
  "back-in-right": {
    "0%": { transform: "translateX(2000px) scale(0.7)", opacity: "0.7" },
    "80%": { transform: "translateX(0) scale(0.7)", opacity: "0.7" },
    to: { transform: "scale(1)", opacity: "1" },
  },
  "back-in-up": {
    "0%": { transform: "translateY(1200px) scale(0.7)", opacity: "0.7" },
    "80%": { transform: "translateY(0) scale(0.7)", opacity: "0.7" },
    to: { transform: "scale(1)", opacity: "1" },
  },
  "back-out-down": {
    "0%": { transform: "scale(1)", opacity: "1" },
    "20%": { transform: "translateY(0) scale(0.7)", opacity: "0.7" },
    to: { transform: "translateY(700px) scale(0.7)", opacity: "0.7" },
  },
  "back-out-left": {
    "0%": { transform: "scale(1)", opacity: "1" },
    "20%": { transform: "translateX(0) scale(0.7)", opacity: "0.7" },
    to: { transform: "translateX(-2000px) scale(0.7)", opacity: "0.7" },
  },
  "back-out-right": {
    "0%": { transform: "scale(1)", opacity: "1" },
    "20%": { transform: "translateX(0) scale(0.7)", opacity: "0.7" },
    to: { transform: "translateX(2000px) scale(0.7)", opacity: "0.7" },
  },
  "back-out-up": {
    "0%": { transform: "scale(1)", opacity: "1" },
    "20%": { transform: "translateY(0) scale(0.7)", opacity: "0.7" },
    to: { transform: "translateY(-700px) scale(0.7)", opacity: "0.7" },
  },
  "bounce-in": {
    "0%, 20%, 40%, 60%, 80%, to": {
      "animation-timing-function": "cubic-bezier(0.215, 0.61, 0.355, 1)",
    },
    "0%": { opacity: "0", transform: "scale3d(0.3, 0.3, 0.3)" },
    "20%": { transform: "scale3d(1.1, 1.1, 1.1)" },
    "40%": { transform: "scale3d(0.9, 0.9, 0.9)" },
    "60%": { opacity: "1", transform: "scale3d(1.03, 1.03, 1.03)" },
    "80%": { transform: "scale3d(0.97, 0.97, 0.97)" },
    to: { opacity: "1", transform: "scaleX(1)" },
  },
  "bounce-in-down": {
    "0%, 60%, 75%, 90%, to": {
      "animation-timing-function": "cubic-bezier(0.215, 0.61, 0.355, 1)",
    },
    "0%": { opacity: "0", transform: "translate3d(0, -3000px, 0) scaleY(3)" },
    "60%": { opacity: "1", transform: "translate3d(0, 25px, 0) scaleY(0.9)" },
    "75%": { transform: "translate3d(0, -10px, 0) scaleY(0.95)" },
    "90%": { transform: "translate3d(0, 5px, 0) scaleY(0.985)" },
    to: { transform: "translateZ(0)" },
  },
  "bounce-in-left": {
    "0%, 60%, 75%, 90%, to": {
      "animation-timing-function": "cubic-bezier(0.215, 0.61, 0.355, 1)",
    },
    "0%": { opacity: "0", transform: "translate3d(-3000px, 0, 0) scaleX(3)" },
    "60%": { opacity: "1", transform: "translate3d(25px, 0, 0) scaleX(1)" },
    "75%": { transform: "translate3d(-10px, 0, 0) scaleX(0.98)" },
    "90%": { transform: "translate3d(5px, 0, 0) scaleX(0.995)" },
    to: { transform: "translateZ(0)" },
  },
  "bounce-in-right": {
    "0%, 60%, 75%, 90%, to": {
      "animation-timing-function": "cubic-bezier(0.215, 0.61, 0.355, 1)",
    },
    "0%": { opacity: "0", transform: "translate3d(3000px, 0, 0) scaleX(3)" },
    "60%": { opacity: "1", transform: "translate3d(-25px, 0, 0) scaleX(1)" },
    "75%": { transform: "translate3d(10px, 0, 0) scaleX(0.98)" },
    "90%": { transform: "translate3d(-5px, 0, 0) scaleX(0.995)" },
    to: { transform: "translateZ(0)" },
  },
  "bounce-in-up": {
    "0%, 60%, 75%, 90%, to": {
      "animation-timing-function": "cubic-bezier(0.215, 0.61, 0.355, 1)",
    },
    "0%": { opacity: "0", transform: "translate3d(0, 3000px, 0) scaleY(5)" },
    "60%": { opacity: "1", transform: "translate3d(0, -20px, 0) scaleY(0.9)" },
    "75%": { transform: "translate3d(0, 10px, 0) scaleY(0.95)" },
    "90%": { transform: "translate3d(0, -5px, 0) scaleY(0.985)" },
    to: { transform: "translateZ(0)" },
  },
  "bounce-out": {
    "20%": { transform: "scale3d(0.9, 0.9, 0.9)" },
    "50%, 55%": { opacity: "1", transform: "scale3d(1.1, 1.1, 1.1)" },
    to: { opacity: "0", transform: "scale3d(0.3, 0.3, 0.3)" },
  },
  "bounce-out-down": {
    "20%": { transform: "translate3d(0, 10px, 0) scaleY(0.985)" },
    "40%, 45%": {
      opacity: "1",
      transform: "translate3d(0, -20px, 0) scaleY(0.9)",
    },
    to: { opacity: "0", transform: "translate3d(0, 2000px, 0) scaleY(3)" },
  },
  "bounce-out-left": {
    "20%": { opacity: "1", transform: "translate3d(20px, 0, 0) scaleX(0.9)" },
    to: { opacity: "0", transform: "translate3d(-2000px, 0, 0) scaleX(2)" },
  },
  "bounce-out-right": {
    "20%": { opacity: "1", transform: "translate3d(-20px, 0, 0) scaleX(0.9)" },
    to: { opacity: "0", transform: "translate3d(2000px, 0, 0) scaleX(2)" },
  },
  "bounce-out-up": {
    "20%": { transform: "translate3d(0, -10px, 0) scaleY(0.985)" },
    "40%, 45%": {
      opacity: "1",
      transform: "translate3d(0, 20px, 0) scaleY(0.9)",
    },
    to: { opacity: "0", transform: "translate3d(0, -2000px, 0) scaleY(3)" },
  },
  "fade-in": { "0%": { opacity: "0" }, to: { opacity: "1" } },
  "fade-in-down": {
    "0%": { opacity: "0", transform: "translate3d(0, -100%, 0)" },
    to: { opacity: "1", transform: "translateZ(0)" },
  },
  "fade-in-down-big": {
    "0%": { opacity: "0", transform: "translate3d(0, -2000px, 0)" },
    to: { opacity: "1", transform: "translateZ(0)" },
  },
  "fade-in-left": {
    "0%": { opacity: "0", transform: "translate3d(-100%, 0, 0)" },
    to: { opacity: "1", transform: "translateZ(0)" },
  },
  "fade-in-left-big": {
    "0%": { opacity: "0", transform: "translate3d(-2000px, 0, 0)" },
    to: { opacity: "1", transform: "translateZ(0)" },
  },
  "fade-in-right": {
    "0%": { opacity: "0", transform: "translate3d(100%, 0, 0)" },
    to: { opacity: "1", transform: "translateZ(0)" },
  },
  "fade-in-right-big": {
    "0%": { opacity: "0", transform: "translate3d(2000px, 0, 0)" },
    to: { opacity: "1", transform: "translateZ(0)" },
  },
  "fade-in-up": {
    "0%": { opacity: "0", transform: "translate3d(0, 100%, 0)" },
    to: { opacity: "1", transform: "translateZ(0)" },
  },
  "fade-in-up-big": {
    "0%": { opacity: "0", transform: "translate3d(0, 2000px, 0)" },
    to: { opacity: "1", transform: "translateZ(0)" },
  },
  "fade-in-top-left": {
    "0%": { opacity: "0", transform: "translate3d(-100%, -100%, 0)" },
    to: { opacity: "1", transform: "translateZ(0)" },
  },
  "fade-in-top-right": {
    "0%": { opacity: "0", transform: "translate3d(100%, -100%, 0)" },
    to: { opacity: "1", transform: "translateZ(0)" },
  },
  "fade-in-bottom-left": {
    "0%": { opacity: "0", transform: "translate3d(-100%, 100%, 0)" },
    to: { opacity: "1", transform: "translateZ(0)" },
  },
  "fade-in-bottom-right": {
    "0%": { opacity: "0", transform: "translate3d(100%, 100%, 0)" },
    to: { opacity: "1", transform: "translateZ(0)" },
  },
  "fade-out": { "0%": { opacity: "1" }, to: { opacity: "0" } },
  "fade-out-down": {
    "0%": { opacity: "1" },
    to: { opacity: "0", transform: "translate3d(0, 100%, 0)" },
  },
  "fade-out-down-big": {
    "0%": { opacity: "1" },
    to: { opacity: "0", transform: "translate3d(0, 2000px, 0)" },
  },
  "fade-out-left": {
    "0%": { opacity: "1" },
    to: { opacity: "0", transform: "translate3d(-100%, 0, 0)" },
  },
  "fade-out-left-big": {
    "0%": { opacity: "1" },
    to: { opacity: "0", transform: "translate3d(-2000px, 0, 0)" },
  },
  "fade-out-right": {
    "0%": { opacity: "1" },
    to: { opacity: "0", transform: "translate3d(100%, 0, 0)" },
  },
  "fade-out-right-big": {
    "0%": { opacity: "1" },
    to: { opacity: "0", transform: "translate3d(2000px, 0, 0)" },
  },
  "fade-out-up": {
    "0%": { opacity: "1" },
    to: { opacity: "0", transform: "translate3d(0, -100%, 0)" },
  },
  "fade-out-up-big": {
    "0%": { opacity: "1" },
    to: { opacity: "0", transform: "translate3d(0, -2000px, 0)" },
  },
  "fade-out-top-left": {
    "0%": { opacity: "1", transform: "translateZ(0)" },
    to: { opacity: "0", transform: "translate3d(-100%, -100%, 0)" },
  },
  "fade-out-top-right": {
    "0%": { opacity: "1", transform: "translateZ(0)" },
    to: { opacity: "0", transform: "translate3d(100%, -100%, 0)" },
  },
  "fade-out-bottom-right": {
    "0%": { opacity: "1", transform: "translateZ(0)" },
    to: { opacity: "0", transform: "translate3d(100%, 100%, 0)" },
  },
  "fade-out-bottom-left": {
    "0%": { opacity: "1", transform: "translateZ(0)" },
    to: { opacity: "0", transform: "translate3d(-100%, 100%, 0)" },
  },
  flip: {
    "0%": {
      transform: "perspective(400px) scaleX(1) translateZ(0) rotateY(-1turn)",
      "animation-timing-function": "ease-out",
    },
    "40%": {
      transform:
        "perspective(400px) scaleX(1) translateZ(150px) rotateY(-190deg)",
      "animation-timing-function": "ease-out",
    },
    "50%": {
      transform:
        "perspective(400px) scaleX(1) translateZ(150px) rotateY(-170deg)",
      "animation-timing-function": "ease-in",
    },
    "80%": {
      transform:
        "perspective(400px) scale3d(0.95, 0.95, 0.95) translateZ(0) rotateY(0deg)",
      "animation-timing-function": "ease-in",
    },
    to: {
      transform: "perspective(400px) scaleX(1) translateZ(0) rotateY(0deg)",
      "animation-timing-function": "ease-in",
    },
  },
  "flip-in-x": {
    "0%": {
      transform: "perspective(400px) rotateX(90deg)",
      "animation-timing-function": "ease-in",
      opacity: "0",
    },
    "40%": {
      transform: "perspective(400px) rotateX(-20deg)",
      "animation-timing-function": "ease-in",
    },
    "60%": { transform: "perspective(400px) rotateX(10deg)", opacity: "1" },
    "80%": { transform: "perspective(400px) rotateX(-5deg)" },
    to: { transform: "perspective(400px)" },
  },
  "flip-in-y": {
    "0%": {
      transform: "perspective(400px) rotateY(90deg)",
      "animation-timing-function": "ease-in",
      opacity: "0",
    },
    "40%": {
      transform: "perspective(400px) rotateY(-20deg)",
      "animation-timing-function": "ease-in",
    },
    "60%": { transform: "perspective(400px) rotateY(10deg)", opacity: "1" },
    "80%": { transform: "perspective(400px) rotateY(-5deg)" },
    to: { transform: "perspective(400px)" },
  },
  "flip-out-x": {
    "0%": { transform: "perspective(400px)" },
    "30%": { transform: "perspective(400px) rotateX(-20deg)", opacity: "1" },
    to: { transform: "perspective(400px) rotateX(90deg)", opacity: "0" },
  },
  "flip-out-y": {
    "0%": { transform: "perspective(400px)" },
    "30%": { transform: "perspective(400px) rotateY(-15deg)", opacity: "1" },
    to: { transform: "perspective(400px) rotateY(90deg)", opacity: "0" },
  },
  "light-speed-in-right": {
    "0%": { transform: "translate3d(100%, 0, 0) skewX(-30deg)", opacity: "0" },
    "60%": { transform: "skewX(20deg)", opacity: "1" },
    "80%": { transform: "skewX(-5deg)" },
    to: { transform: "translateZ(0)" },
  },
  "light-speed-in-left": {
    "0%": { transform: "translate3d(-100%, 0, 0) skewX(30deg)", opacity: "0" },
    "60%": { transform: "skewX(-20deg)", opacity: "1" },
    "80%": { transform: "skewX(5deg)" },
    to: { transform: "translateZ(0)" },
  },
  "light-speed-out-right": {
    "0%": { opacity: "1" },
    to: { transform: "translate3d(100%, 0, 0) skewX(30deg)", opacity: "0" },
  },
  "light-speed-out-left": {
    "0%": { opacity: "1" },
    to: { transform: "translate3d(-100%, 0, 0) skewX(-30deg)", opacity: "0" },
  },
  "rotate-in": {
    "0%": { transform: "rotate(-200deg)", opacity: "0" },
    to: { transform: "translateZ(0)", opacity: "1" },
  },
  "rotate-in-down-left": {
    "0%": { transform: "rotate(-45deg)", opacity: "0" },
    to: { transform: "translateZ(0)", opacity: "1" },
  },
  "rotate-in-down-right": {
    "0%": { transform: "rotate(45deg)", opacity: "0" },
    to: { transform: "translateZ(0)", opacity: "1" },
  },
  "rotate-in-up-left": {
    "0%": { transform: "rotate(45deg)", opacity: "0" },
    to: { transform: "translateZ(0)", opacity: "1" },
  },
  "rotate-in-up-right": {
    "0%": { transform: "rotate(-90deg)", opacity: "0" },
    to: { transform: "translateZ(0)", opacity: "1" },
  },
  "rotate-out": {
    "0%": { opacity: "1" },
    to: { transform: "rotate(200deg)", opacity: "0" },
  },
  "rotate-out-down-left": {
    "0%": { opacity: "1" },
    to: { transform: "rotate(45deg)", opacity: "0" },
  },
  "rotate-out-down-right": {
    "0%": { opacity: "1" },
    to: { transform: "rotate(-45deg)", opacity: "0" },
  },
  "rotate-out-up-left": {
    "0%": { opacity: "1" },
    to: { transform: "rotate(-45deg)", opacity: "0" },
  },
  "rotate-out-up-right": {
    "0%": { opacity: "1" },
    to: { transform: "rotate(90deg)", opacity: "0" },
  },
  hinge: {
    "0%": { "animation-timing-function": "ease-in-out" },
    "20%, 60%": {
      transform: "rotate(80deg)",
      "animation-timing-function": "ease-in-out",
    },
    "40%, 80%": {
      transform: "rotate(60deg)",
      "animation-timing-function": "ease-in-out",
      opacity: "1",
    },
    to: { transform: "translate3d(0, 700px, 0)", opacity: "0" },
  },
  "jack-in-the-box": {
    "0%": {
      opacity: "0",
      transform: "scale(0.1) rotate(30deg)",
      "transform-origin": "center bottom",
    },
    "50%": { transform: "rotate(-10deg)" },
    "70%": { transform: "rotate(3deg)" },
    to: { opacity: "1", transform: "scale(1)" },
  },
  "roll-in": {
    "0%": {
      opacity: "0",
      transform: "translate3d(-100%, 0, 0) rotate(-120deg)",
    },
    to: { opacity: "1", transform: "translateZ(0)" },
  },
  "roll-out": {
    "0%": { opacity: "1" },
    to: { opacity: "0", transform: "translate3d(100%, 0, 0) rotate(120deg)" },
  },
  "zoom-in": {
    "0%": { opacity: "0", transform: "scale3d(0.3, 0.3, 0.3)" },
    "50%": { opacity: "1" },
  },
  "zoom-in-down": {
    "0%": {
      opacity: "0",
      transform: "scale3d(0.1, 0.1, 0.1) translate3d(0, -1000px, 0)",
      "animation-timing-function": "cubic-bezier(0.55, 0.055, 0.675, 0.19)",
    },
    "60%": {
      opacity: "1",
      transform: "scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0)",
      "animation-timing-function": "cubic-bezier(0.175, 0.885, 0.32, 1)",
    },
  },
  "zoom-in-left": {
    "0%": {
      opacity: "0",
      transform: "scale3d(0.1, 0.1, 0.1) translate3d(-1000px, 0, 0)",
      "animation-timing-function": "cubic-bezier(0.55, 0.055, 0.675, 0.19)",
    },
    "60%": {
      opacity: "1",
      transform: "scale3d(0.475, 0.475, 0.475) translate3d(10px, 0, 0)",
      "animation-timing-function": "cubic-bezier(0.175, 0.885, 0.32, 1)",
    },
  },
  "zoom-in-right": {
    "0%": {
      opacity: "0",
      transform: "scale3d(0.1, 0.1, 0.1) translate3d(1000px, 0, 0)",
      "animation-timing-function": "cubic-bezier(0.55, 0.055, 0.675, 0.19)",
    },
    "60%": {
      opacity: "1",
      transform: "scale3d(0.475, 0.475, 0.475) translate3d(-10px, 0, 0)",
      "animation-timing-function": "cubic-bezier(0.175, 0.885, 0.32, 1)",
    },
  },
  "zoom-in-up": {
    "0%": {
      opacity: "0",
      transform: "scale3d(0.1, 0.1, 0.1) translate3d(0, 1000px, 0)",
      "animation-timing-function": "cubic-bezier(0.55, 0.055, 0.675, 0.19)",
    },
    "60%": {
      opacity: "1",
      transform: "scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0)",
      "animation-timing-function": "cubic-bezier(0.175, 0.885, 0.32, 1)",
    },
  },
  "zoom-out": {
    "0%": { opacity: "1" },
    "50%": { opacity: "0", transform: "scale3d(0.3, 0.3, 0.3)" },
    to: { opacity: "0" },
  },
  "zoom-out-down": {
    "40%": {
      opacity: "1",
      transform: "scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0)",
      "animation-timing-function": "cubic-bezier(0.55, 0.055, 0.675, 0.19)",
    },
    to: {
      opacity: "0",
      transform: "scale3d(0.1, 0.1, 0.1) translate3d(0, 2000px, 0)",
      "animation-timing-function": "cubic-bezier(0.175, 0.885, 0.32, 1)",
    },
  },
  "zoom-out-left": {
    "40%": {
      opacity: "1",
      transform: "scale3d(0.475, 0.475, 0.475) translate3d(42px, 0, 0)",
    },
    to: { opacity: "0", transform: "scale(0.1) translate3d(-2000px, 0, 0)" },
  },
  "zoom-out-right": {
    "40%": {
      opacity: "1",
      transform: "scale3d(0.475, 0.475, 0.475) translate3d(-42px, 0, 0)",
    },
    to: { opacity: "0", transform: "scale(0.1) translate3d(2000px, 0, 0)" },
  },
  "zoom-out-up": {
    "40%": {
      opacity: "1",
      transform: "scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0)",
      "animation-timing-function": "cubic-bezier(0.55, 0.055, 0.675, 0.19)",
    },
    to: {
      opacity: "0",
      transform: "scale3d(0.1, 0.1, 0.1) translate3d(0, -2000px, 0)",
      "animation-timing-function": "cubic-bezier(0.175, 0.885, 0.32, 1)",
    },
  },
  "slide-in-down": {
    "0%": { transform: "translate3d(0, -100%, 0)", visibility: "visible" },
    to: { transform: "translateZ(0)" },
  },
  "slide-in-left": {
    "0%": { transform: "translate3d(-100%, 0, 0)", visibility: "visible" },
    to: { transform: "translateZ(0)" },
  },
  "slide-in-right": {
    "0%": { transform: "translate3d(100%, 0, 0)", visibility: "visible" },
    to: { transform: "translateZ(0)" },
  },
  "slide-in-up": {
    "0%": { transform: "translate3d(0, 100%, 0)", visibility: "visible" },
    to: { transform: "translateZ(0)" },
  },
  "slide-out-down": {
    "0%": { transform: "translateZ(0)" },
    to: { visibility: "hidden", transform: "translate3d(0, 100%, 0)" },
  },
  "slide-out-left": {
    "0%": { transform: "translateZ(0)" },
    to: { visibility: "hidden", transform: "translate3d(-100%, 0, 0)" },
  },
  "slide-out-right": {
    "0%": { transform: "translateZ(0)" },
    to: { visibility: "hidden", transform: "translate3d(100%, 0, 0)" },
  },
  "slide-out-up": {
    "0%": { transform: "translateZ(0)" },
    to: { visibility: "hidden", transform: "translate3d(0, -100%, 0)" },
  },
  "content-show": {
    "0%": { opacity: "0", transform: "translate(-50%, -48%) scale(0.96)" },
    to: { opacity: "1", transform: "translate(-50%, -50%) scale(1)" },
  },
}

/** Default animation shorthand for each keyframe name */
export const animations: Record<string, string> = {
  "accordion-down": "accordion-down 200ms ease-out",
  "accordion-up": "accordion-up 200ms ease-out",
  bounce: "bounce 1s ease infinite",
  flash: "flash 1s ease",
  pulse: "pulse 1s ease infinite",
  "rubber-band": "rubber-band 1s ease",
  "shake-x": "shake-x 1s ease",
  "shake-y": "shake-y 1s ease",
  "head-shake": "head-shake 1s ease-in-out",
  swing: "swing 1s ease",
  tada: "tada 1s ease",
  wobble: "wobble 1s ease",
  jello: "jello 1s ease",
  "heart-beat": "heart-beat 1.3s ease-in-out infinite",
  "back-in-down": "back-in-down 1s ease",
  "back-in-left": "back-in-left 1s ease",
  "back-in-right": "back-in-right 1s ease",
  "back-in-up": "back-in-up 1s ease",
  "back-out-down": "back-out-down 1s ease",
  "back-out-left": "back-out-left 1s ease",
  "back-out-right": "back-out-right 1s ease",
  "back-out-up": "back-out-up 1s ease",
  "bounce-in": "bounce-in 0.75s ease",
  "bounce-in-down": "bounce-in-down 1s ease",
  "bounce-in-left": "bounce-in-left 1s ease",
  "bounce-in-right": "bounce-in-right 1s ease",
  "bounce-in-up": "bounce-in-up 1s ease",
  "bounce-out": "bounce-out 0.75s ease",
  "bounce-out-down": "bounce-out-down 1s ease",
  "bounce-out-left": "bounce-out-left 1s ease",
  "bounce-out-right": "bounce-out-right 1s ease",
  "bounce-out-up": "bounce-out-up 1s ease",
  "fade-in": "fade-in 0.3s ease",
  "fade-in-down": "fade-in-down 0.3s ease",
  "fade-in-down-big": "fade-in-down-big 0.3s ease",
  "fade-in-left": "fade-in-left 0.3s ease",
  "fade-in-left-big": "fade-in-left-big 0.3s ease",
  "fade-in-right": "fade-in-right 0.3s ease",
  "fade-in-right-big": "fade-in-right-big 0.3s ease",
  "fade-in-up": "fade-in-up 0.3s ease",
  "fade-in-up-big": "fade-in-up-big 0.3s ease",
  "fade-in-top-left": "fade-in-top-left 0.3s ease",
  "fade-in-top-right": "fade-in-top-right 0.3s ease",
  "fade-in-bottom-left": "fade-in-bottom-left 0.3s ease",
  "fade-in-bottom-right": "fade-in-bottom-right 0.3s ease",
  "fade-out": "fade-out 0.3s ease",
  "fade-out-down": "fade-out-down 0.3s ease",
  "fade-out-down-big": "fade-out-down-big 0.3s ease",
  "fade-out-left": "fade-out-left 0.3s ease",
  "fade-out-left-big": "fade-out-left-big 0.3s ease",
  "fade-out-right": "fade-out-right 0.3s ease",
  "fade-out-right-big": "fade-out-right-big 0.3s ease",
  "fade-out-up": "fade-out-up 0.3s ease",
  "fade-out-up-big": "fade-out-up-big 0.3s ease",
  "fade-out-top-left": "fade-out-top-left 0.3s ease",
  "fade-out-top-right": "fade-out-top-right 0.3s ease",
  "fade-out-bottom-right": "fade-out-bottom-right 0.3s ease",
  "fade-out-bottom-left": "fade-out-bottom-left 0.3s ease",
  flip: "flip 1s ease",
  "flip-in-x": "flip-in-x 0.75s ease",
  "flip-in-y": "flip-in-y 0.75s ease",
  "flip-out-x": "flip-out-x 0.75s ease",
  "flip-out-y": "flip-out-y 0.75s ease",
  "light-speed-in-right": "light-speed-in-right 1s ease-out",
  "light-speed-in-left": "light-speed-in-left 1s ease-out",
  "light-speed-out-right": "light-speed-out-right 1s ease-in",
  "light-speed-out-left": "light-speed-out-left 1s ease-in",
  "rotate-in": "rotate-in 0.6s ease",
  "rotate-in-down-left": "rotate-in-down-left 0.6s ease",
  "rotate-in-down-right": "rotate-in-down-right 0.6s ease",
  "rotate-in-up-left": "rotate-in-up-left 0.6s ease",
  "rotate-in-up-right": "rotate-in-up-right 0.6s ease",
  "rotate-out": "rotate-out 0.6s ease",
  "rotate-out-down-left": "rotate-out-down-left 0.6s ease",
  "rotate-out-down-right": "rotate-out-down-right 0.6s ease",
  "rotate-out-up-left": "rotate-out-up-left 0.6s ease",
  "rotate-out-up-right": "rotate-out-up-right 0.6s ease",
  hinge: "hinge 2s ease",
  "jack-in-the-box": "jack-in-the-box 1s ease",
  "roll-in": "roll-in 1s ease",
  "roll-out": "roll-out 1s ease",
  "zoom-in": "zoom-in 0.3s ease",
  "zoom-in-down": "zoom-in-down 0.3s ease",
  "zoom-in-left": "zoom-in-left 0.3s ease",
  "zoom-in-right": "zoom-in-right 0.3s ease",
  "zoom-in-up": "zoom-in-up 0.3s ease",
  "zoom-out": "zoom-out 0.3s ease",
  "zoom-out-down": "zoom-out-down 0.3s ease",
  "zoom-out-left": "zoom-out-left 0.3s ease",
  "zoom-out-right": "zoom-out-right 0.3s ease",
  "zoom-out-up": "zoom-out-up 0.3s ease",
  "slide-in-down": "slide-in-down 0.3s ease",
  "slide-in-left": "slide-in-left 0.3s ease",
  "slide-in-right": "slide-in-right 0.3s ease",
  "slide-in-up": "slide-in-up 0.3s ease",
  "slide-out-down": "slide-out-down 0.3s ease",
  "slide-out-left": "slide-out-left 0.3s ease",
  "slide-out-right": "slide-out-right 0.3s ease",
  "slide-out-up": "slide-out-up 0.3s ease",
  "content-show": "content-show 150ms cubic-bezier(0.16, 1, 0.3, 1)",
}
