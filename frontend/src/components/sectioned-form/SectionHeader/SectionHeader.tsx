import { ReactNode } from "react";

export interface SectionHeaderProps {
    isTitle?: boolean;
    children?: ReactNode;
}
export function SectionHeader({ children, isTitle = false }: SectionHeaderProps) {
    const extraClass = isTitle ? "border-b pb-2 mb-2 text-3xl" : "text-lg";
    return (<div className="col-span-12">
        <div className={`${extraClass} font-semibold text-gray-800`}>
            {children}
        </div>
    </div>)
}