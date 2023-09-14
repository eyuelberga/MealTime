import React, { InputHTMLAttributes } from "react";
import { BaseInputProps } from "@/components/input";

export interface LabelledInputProps extends BaseInputProps, InputHTMLAttributes<HTMLInputElement> {

}


export const LabelledInput = React.forwardRef(({ label, errorText, helperText, ...rest }: LabelledInputProps, ref: any) => {
    return (<div>
        <label
            htmlFor={rest.name}
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
            {label}
        </label>
        <input
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm  focus:ring-rose-600 focus:border-rose-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            ref={ref}
            {...rest}
        />
        {helperText && !errorText && <p className="mt-1 text-sm text-gray-500">{helperText}</p>}
        {errorText && <p className="text-sm text-red-600 mt-2">{errorText}</p>}
    </div>)
});
LabelledInput.displayName = "LabelledInput";