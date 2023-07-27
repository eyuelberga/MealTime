import React, { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { Button } from "@/components/button";
import { BaseInputProps } from "@/components/input";
export interface RemovableInputProps extends BaseInputProps {
    onRemove?: () => void;

}
export interface LabelledInputProps extends RemovableInputProps, InputHTMLAttributes<HTMLInputElement> {
    width?: string;
    height?: string;
}

export interface LabelledTextareaProps extends RemovableInputProps, TextareaHTMLAttributes<HTMLTextAreaElement> { }

export interface LabelledSelectProps extends RemovableInputProps, SelectHTMLAttributes<HTMLSelectElement> { }

export interface LabelledInputContainerProps extends RemovableInputProps {
    children: ReactNode;
}

export const LabelledInputContainer = ({ children, label, errorText, helperText, onRemove }: LabelledInputContainerProps) => {
    return (<><div className="col-span-12 md:col-span-3">
        <label
            className="inline-block text-sm font-medium text-gray-500 mt-2.5"
        >
            {label}
        </label>
    </div>
        {/* End Col */}
        <div className="col-span-12 md:col-span-9">
            <div className="flex items-center">
                {children}
                {onRemove && <Button
                    variant="ghost"
                    onClick={onRemove}
                    type="button"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                </Button>}
            </div>
            {helperText && !errorText && <p className="mt-1 text-sm text-gray-500">{helperText}</p>}
            {errorText && <p className="text-sm text-red-600 mt-2">{errorText}</p>}

        </div></>
    )
};


export const LabelledTextarea = React.forwardRef(({ label, errorText, placeholder, onRemove, helperText, ...rest }: LabelledTextareaProps, ref: any) => {
    const inputClass = `py-2 px-3 block w-full border ${errorText ? 'border-red-500' : 'border-gray-200'} text-sm focus:border-rose-500 focus:ring-rose-500 disabled:opacity-50`;
    const displayName = label ? label : rest.name;
    return <LabelledInputContainer label={displayName} onRemove={onRemove} errorText={errorText} helperText={helperText}>
        <textarea
            className={inputClass}
            placeholder={placeholder ? placeholder : displayName}
            rows={6}
            ref={ref}
            {...rest}
        />
    </LabelledInputContainer>
});


export const LabelledInput = React.forwardRef(({ label, errorText, placeholder, onRemove, helperText, width = "full", height, ...rest }: LabelledInputProps, ref: any) => {
    const inputClass = `block ${rest.type === "color" ? "h-16 w-16" : "py-2 px-3 w-full"} border ${errorText ? 'border-red-500' : 'border-gray-200'} text-sm focus:border-rose-500 focus:ring-rose-500 file:border file:border-transparent file:font-semibold file:bg-rose-500 file:text-white file:mr-4 file:py-2 file:px-3 disabled:opacity-40 ${rest.type !== "file" ? "read-only:opacity-40" : ""}`
    const displayName = label ? label : rest.name;
    return (
        <LabelledInputContainer label={displayName} onRemove={onRemove} errorText={errorText} helperText={helperText}>
            <input
                className={inputClass}
                placeholder={placeholder ? placeholder : displayName}
                ref={ref}
                {...rest}
            />
        </LabelledInputContainer>

    )
});

export const LabelledSelect = React.forwardRef(({ label, errorText, placeholder, onRemove, helperText, children, ...rest }: LabelledSelectProps, ref: any) => {
    const inputClass = `py-2 px-3 block w-full border ${errorText ? 'border-red-500' : 'border-gray-200'} text-sm focus:border-rose-500 focus:ring-rose-500 disabled:opacity-40`;
    const displayName = label ? label : rest.name;
    return (
        <LabelledInputContainer label={displayName} onRemove={onRemove} errorText={errorText} helperText={helperText}>
            <select
                className={inputClass}
                placeholder={placeholder ? placeholder : displayName}
                ref={ref}
                {...rest}
            >
                {children}
            </select>
        </LabelledInputContainer>

    )
});
