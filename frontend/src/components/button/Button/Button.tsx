import { createElement, ElementType, ReactNode } from "react";

export interface ButtonProps<T extends ElementType> {
    as?: T;
    children: ReactNode;
    variant?: "solid" | "outline" | "link" | "ghost";
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
    const commonClasses = "disabled:opacity-60 disabled:cursor-not-allowed h-full inline-flex justify-center items-center gap-2 text-sm transition-all";
    const soildVariant = "border border-transparent font-semibold bg-rose-500 text-white enabled:hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2";
    const outlineVariant = "border font-medium bg-white text-rose-700 align-middle enabled:hover:bg-rose-50 focus:z-10 focus:outline-none focus:ring-2 focus:ring-rose-600";
    const ghostVariant = "font-medium bg-white text-rose-700 align-middle enabled:hover:bg-rose-50 focus:z-10 focus:outline-none focus:ring-2 focus:ring-rose-600";
    const linkVariant = "text-rose-600 enabled:hover:text-rose-800 font-medium";
    const Component = as || "button";
    const className = `${variant !== "link" && size !== "sm" ? "py-3 px-4" : size === "sm" ? "py-2 px-2" : ""} ${fullWidth ? "w-full" : ""} ${commonClasses} ${variant === "solid" ? soildVariant : variant === "outline" ? outlineVariant : variant === "ghost" ? ghostVariant : linkVariant}`;
    const Children = isLoading ? variant === "solid" ? <SpinnerWhite /> : <SpinnerRose /> : children;
    return createElement(Component, { className, disabled: isDisabled || isLoading, ...rest }, Children);
}