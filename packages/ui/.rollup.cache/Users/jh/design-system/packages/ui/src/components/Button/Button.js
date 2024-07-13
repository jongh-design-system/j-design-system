import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from "react";
import { buttonCva } from "./style";
import Slot from "../Slot/Slot";
import { css } from "jh-generated/css";
export const Button = forwardRef(({ as, id, className, children, disabled = false, ...rest }, ref) => {
    const Comp = as ? Slot : "button";
    return (_jsx(Comp, { ref: ref, className: css(buttonCva.raw({ variant: "primary" }), {
            color: "text_danger",
        }), disabled: disabled, role: "button", id: id, "data-testid": id, ...rest, children: children }));
});
//# sourceMappingURL=Button.js.map