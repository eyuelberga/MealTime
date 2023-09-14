import { createElement, ElementType, ReactNode } from "react";
import { Button as RButton } from "@radix-ui/themes";

export interface ButtonProps<T extends ElementType> {
    as?: T;
    children: ReactNode;
    variant?: "solid" | "outline" | "link" | "ghost"|any;
    fullWidth?: boolean;
    isDisabled?: boolean;
    isLoading?: boolean;
    size?: "sm" | "lg"
}

export function SpinnerRose() {
    return <div
        className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-rose-600 rounded-full"
        role="status"
        aria-label="loading"
    >
        <span className="sr-only">Loading...</span>
    </div>
}
export function SpinnerWhite() {
    return <div
        className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-white rounded-full"
        role="status"
        aria-label="loading"
    >
        <span className="sr-only">Loading...</span>
    </div>
}

export function Button<T extends React.ElementType = "button">({ size = "lg", isDisabled = false, isLoading = false, as, children, fullWidth, variant = "solid", ...rest }: ButtonProps<T>
    & Omit<React.ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>) {
    const commonClasses = "btn btn-primary";
    const soildVariant = "";
    const outlineVariant = "btn-outline";
    const ghostVariant = "btn-ghost";
    const linkVariant = "btn-link";
    const Component = as || "button";
    const className = `${variant !== "link" && size !== "sm" ? "py-3 px-4" : size === "sm" ? "py-2 px-2" : ""} ${fullWidth ? "w-full" : ""} ${commonClasses} ${variant === "solid" ? soildVariant : variant === "outline" ? outlineVariant : variant === "ghost" ? ghostVariant : linkVariant}`;
    const Children = isLoading ? variant === "solid" ? <SpinnerWhite /> : <SpinnerRose /> : children;
    // return createElement(Component, { className, disabled: isDisabled || isLoading, ...rest }, Children);
    return <RButton variant={variant}>{children}</RButton>
}