import { ReactNode } from "react";

export interface ListItemProps {
    children: ReactNode
}

export function ListItem({ children }: ListItemProps) {
    return (<li className="flex">
        <div className="grow flex items-center border-b border-slate-100 text-sm py-2">
            <div className="grow flex justify-between">
                {children}
            </div>
        </div>
    </li>)
}