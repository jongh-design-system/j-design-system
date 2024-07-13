import { type ComponentPropsWithRef, type ComponentPropsWithoutRef, type ElementType } from "react";
type AsProp<C extends ElementType> = {
    as?: C;
};
export type AsRef<C extends ElementType> = ComponentPropsWithRef<C>["ref"];
export type AsComponentProps<C extends ElementType, Props = object> = AsProp<C> & ComponentPropsWithoutRef<C> & Props & {
    ref?: AsRef<C>;
};
export type AsComponentPropsWithRef<C extends ElementType, Props = object> = Props & {
    ref?: AsRef<C>;
};
export {};
