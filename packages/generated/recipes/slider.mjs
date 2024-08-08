import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const sliderFn = /* @__PURE__ */ createRecipe('slider', {}, [])

const sliderVariantMap = {
  "orientation": [
    "horizontal",
    "vertical"
  ]
}

const sliderVariantKeys = Object.keys(sliderVariantMap)

export const slider = /* @__PURE__ */ Object.assign(memo(sliderFn.recipeFn), {
  __recipe__: true,
  __name__: 'slider',
  __getCompoundVariantCss__: sliderFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: sliderVariantKeys,
  variantMap: sliderVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, sliderVariantKeys)
  },
  getVariantProps: sliderFn.getVariantProps,
})