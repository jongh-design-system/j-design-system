/// <reference types="react" />
/// <reference types="react" />
export declare const Button: import("react").ForwardRefExoticComponent<{
    size?: "medium" | "small" | "large" | undefined;
    br?: "normal" | "rounded" | undefined;
    variant?: "text" | "primary" | undefined;
} & Omit<import("react").DetailedHTMLProps<import("react").ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref"> & {
    as?: boolean | undefined;
} & import("react").RefAttributes<HTMLButtonElement>>;
