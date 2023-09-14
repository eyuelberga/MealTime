import { ReactNode } from "react";

export interface ListHeaderProps {
    children: ReactNode
}

export function ListHeader({ children }: ListHeaderProps) {
    return (<header className="border-b border-slate-100">
        <div className="grow flex justify-between py-2">
            {children}
        </div>
    </header>)
}