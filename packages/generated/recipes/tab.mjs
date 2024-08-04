import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const tabFn = /* @__PURE__ */ createRecipe('tab', {}, [])

const tabVariantMap = {
  "type": [
    "underline",
    "pills"
  ]
}

const tabVariantKeys = Object.keys(tabVariantMap)

export const tab = /* @__PURE__ */ Object.assign(memo(tabFn.recipeFn), {
  __recipe__: true,
  __name__: 'tab',
  __getCompoundVariantCss__: tabFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: tabVariantKeys,
  variantMap: tabVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, tabVariantKeys)
  },
  getVariantProps: tabFn.getVariantProps,
})