/* eslint-disable @typescript-eslint/no-require-imports */
const storyGen = require("./stories.cjs")
const uiGen = require("./ui.cjs")
module.exports = function generator(plop) {
  storyGen(plop)
  uiGen(plop)
}
