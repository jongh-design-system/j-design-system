import { ReactNode } from "react";
interface SlottableProps {
    children: ReactNode;
}
declare const Slottable: ({ children }: SlottableProps) => import("react/jsx-runtime").JSX.Element;
export default Slottable;
