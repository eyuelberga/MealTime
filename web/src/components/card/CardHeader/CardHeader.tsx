import { ReactNode } from "react";

export interface CardHeaderProps {
    title?: string;
    textSize?: 'sm' | "md" | "lg" | "xl" | "3xl";
    children?: ReactNode;
}

export function CardHeader({ title, children, textSize = "md" }: CardHeaderProps) {
    return (<header className="px-5 py-4 border-b border-slate-100">
        <div className="flex items-start lg:items-center justify-between gap-4 flex-col lg:flex-row">
            {title && <div>
                <h2 className={`font-semibold text-slate-800 text-${textSize}`}>{title}</h2>
            </div>}
            {children && <div className={`w-full ${title ? "lg:w-fit" : ""} `}>
                {children}
            </div>}
        </div>
    </header>)

}