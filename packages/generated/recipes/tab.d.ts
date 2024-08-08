/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface TabVariant {
  
}

type TabVariantMap = {
  [key in keyof TabVariant]: Array<TabVariant[key]>
}

export type TabVariantProps = {
  [key in keyof TabVariant]?: ConditionalValue<TabVariant[key]> | undefined
}

export interface TabRecipe {
  __type: TabVariantProps
  (props?: TabVariantProps): string
  raw: (props?: TabVariantProps) => TabVariantProps
  variantMap: TabVariantMap
  variantKeys: Array<keyof TabVariant>
  splitVariantProps<Props extends TabVariantProps>(props: Props): [TabVariantProps, Pretty<DistributiveOmit<Props, keyof TabVariantProps>>]
  getVariantProps: (props?: TabVariantProps) => TabVariantProps
}


export declare const tab: TabRecipe