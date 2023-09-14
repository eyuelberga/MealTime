import { ReactNode } from "react";

export interface CardBodyProps {
    children?: ReactNode
    padding?: "sm" | "lg" | "xl";
}
export function CardBody({ children, padding = "lg" }: CardBodyProps) {
    const paddingValues = {
        "sm": 2,
        "lg": 4,
        "xl": 8
    };
    return <div className={`px-${paddingValues[padding]} py-${paddingValues[padding]} p-${paddingValues[padding]}`}>
        {children}
    </div>
}