/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface TagButtonVariant {
  size: "small" | "large"
}

type TagButtonVariantMap = {
  [key in keyof TagButtonVariant]: Array<TagButtonVariant[key]>
}

export type TagButtonVariantProps = {
  [key in keyof TagButtonVariant]?: ConditionalValue<TagButtonVariant[key]> | undefined
}

export interface TagButtonRecipe {
  __type: TagButtonVariantProps
  (props?: TagButtonVariantProps): string
  raw: (props?: TagButtonVariantProps) => TagButtonVariantProps
  variantMap: TagButtonVariantMap
  variantKeys: Array<keyof TagButtonVariant>
  splitVariantProps<Props extends TagButtonVariantProps>(props: Props): [TagButtonVariantProps, Pretty<DistributiveOmit<Props, keyof TagButtonVariantProps>>]
  getVariantProps: (props?: TagButtonVariantProps) => TagButtonVariantProps
}


export declare const tagButton: TagButtonRecipe