import { createElement, ElementType, ReactNode } from "react";

export interface ListProps<T extends ElementType> {
    as?: T;
    children: ReactNode;
}

export function List<T extends React.ElementType = "ul">({ as, children }: ListProps<T>
    & Omit<React.ComponentPropsWithoutRef<T>, keyof ListProps<T>>) {
    const Component = as || "ul";
    return createElement(Component, {}, children);
}