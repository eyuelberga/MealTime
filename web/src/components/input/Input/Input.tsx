import React, { ReactNode, InputHTMLAttributes } from "react";

export interface BaseInputProps {
    label?: string;
    errorText?: string;
    helperText?: string;
}

export interface InputProps extends BaseInputProps, InputHTMLAttributes<HTMLInputElement> {
    leftInnerItem?: ReactNode;
    rightInnerItem?: ReactNode;
    bg?: boolean;

}

export const Input = React.forwardRef(({ bg, label, errorText, helperText, leftInnerItem, rightInnerItem, ...rest }: InputProps, ref: any) => {
    return (<div>
        <label htmlFor="default-search" className="text-sm font-medium text-gray-900 sr-only">{label}</label>
        <div className="relative">
            {leftInnerItem && <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                {leftInnerItem}
            </div>}
            <input id="default-search" ref={ref} className={`${bg ? "bg-gray-50" : "bg-white"} block w-full p-4 ${leftInnerItem ? "pl-10" : ""} text-sm text-gray-900 border border-gray-300 focus:ring-rose-500 focus:border-rose-500`} {...rest} />
            <div className="absolute right-2.5 bottom-2.5">
                {rightInnerItem}
            </div>
        </div>
        {helperText && !errorText && <p className="mt-1 text-sm text-gray-500">{helperText}</p>}
        {errorText && <p className="text-sm text-red-600 mt-2">{errorText}</p>}
    </div>)
});

Input.displayName = "Input";


