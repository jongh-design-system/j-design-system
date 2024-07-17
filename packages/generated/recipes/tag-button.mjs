import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const tagButtonFn = /* @__PURE__ */ createRecipe('tagButton', {
  "size": "small"
}, [])

const tagButtonVariantMap = {
  "size": [
    "small",
    "large"
  ]
}

const tagButtonVariantKeys = Object.keys(tagButtonVariantMap)

export const tagButton = /* @__PURE__ */ Object.assign(memo(tagButtonFn.recipeFn), {
  __recipe__: true,
  __name__: 'tagButton',
  __getCompoundVariantCss__: tagButtonFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: tagButtonVariantKeys,
  variantMap: tagButtonVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, tagButtonVariantKeys)
  },
  getVariantProps: tagButtonFn.getVariantProps,
})