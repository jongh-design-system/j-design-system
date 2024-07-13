import { type RecipeVariantProps } from "jh-generated/css";
export declare const buttonCva: import("jh-generated/types").RecipeRuntimeFn<{
    size: {
        small: {
            height: "44";
            fontSize: "sm";
            paddingLeft: "8";
            paddingRight: "8";
        };
        medium: {
            height: "44";
            fontSize: "lg";
            paddingLeft: "16";
            paddingRight: "16";
        };
        large: {
            height: "48";
            fontSize: "lg";
            paddingLeft: "16";
            paddingRight: "16";
        };
    };
    br: {
        normal: {
            borderRadius: "sm";
        };
        rounded: {
            borderRadius: "rounded";
        };
    };
    variant: {
        primary: {
            backgroundColor: "blue_300";
            color: "text_primary";
        };
        text: {
            border: "1px solid";
            borderColor: "border_basic";
            backgroundColor: "white";
        };
    };
}>;
export type ButtonVariants = RecipeVariantProps<typeof buttonCva>;
