/* eslint-disable @typescript-eslint/no-explicit-any */
import { Children, cloneElement, forwardRef, isValidElement, } from "react";
import Slottable from "./Slottable";
function mergeProps(slotProps, childProps) {
    const overrideProps = { ...childProps };
    for (const propName in childProps) {
        const [slotPropValue, childPropValue] = [
            slotProps[propName],
            childProps[propName],
        ];
        const isHandler = /^on[A-Z]/.test(propName);
        if (isHandler) {
            if (slotPropValue && childPropValue) {
                overrideProps[propName] = (...args) => {
                    //두 핸들러 함수를 받아서 둘다 실행
                    childPropValue(...args);
                    slotPropValue(...args);
                };
            }
            else if (slotPropValue) {
                overrideProps[propName] = slotPropValue;
            } //childProps에 있는건 이미 들어가있음
        }
        if (propName === "style") {
            overrideProps[propName] = { ...slotPropValue, ...childPropValue };
        }
        if (propName === "className") {
            overrideProps[propName] = [slotPropValue, childPropValue]
                .filter(Boolean)
                .join(" ");
        }
    }
    return { ...slotProps, ...overrideProps };
}
function isSlottable(child) {
    return isValidElement(child) && child.type === Slottable;
}
//ref는 함수일수도, 객체일수도 있음
const setRef = (ref, value) => {
    if (typeof ref === "function") {
        ref(value);
    }
    else if (ref !== null && ref !== undefined) {
        ;
        ref.current = value;
    }
};
const composeRefs = (...refs) => {
    return (node) => refs.forEach((ref) => setRef(ref, node));
};
const Slot = forwardRef((props, ref) => {
    const { children, ...slotProps } = props;
    const childrenArray = Children.toArray(children);
    const slottable = childrenArray.find(isSlottable);
    if (slottable) {
        const newElement = slottable.props.children;
        //'Slottable' 컴포넌트의 자식
        const newChildren = childrenArray.map((child) => {
            //'Slot' 컴포넌트의 children
            if (child !== slottable)
                return child;
            //'Slottable'이 아니라면 그대로 리턴
            if (isValidElement(newElement)) {
                //slottable의 children의 children을 리턴해야함
                return newElement.props.children;
            }
            else {
                console.warn("Slot component should have only one React element as a child");
            }
            return null;
        });
        return isValidElement(newElement)
            ? cloneElement(newElement, {
                ...mergeProps(slotProps, newElement.props),
                ref: ref
                    ? composeRefs(ref, newElement.ref)
                    : newElement.ref,
            }, newChildren)
            : null;
    }
    //slottable이 없을 경우
    if (isValidElement(children)) {
        return cloneElement(children, {
            ...mergeProps(slotProps, children.props),
            ref: ref
                ? composeRefs(ref, children.ref)
                : children.ref,
        });
    }
    console.warn("Slot component should have only one React element as a child");
    return null;
});
Slot.displayName = "Slot";
export default Slot;
//Slot은 전달된 props를 child에 merge하는 컴포넌트
//# sourceMappingURL=Slot.js.map