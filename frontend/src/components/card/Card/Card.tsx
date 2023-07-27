import { ReactNode } from "react";


export interface CardProps {
  children?: ReactNode;
  shadow?: "sm" | "md" | "lg" | "xl" | "2xl";
  hoverShadow?: "sm" | "md" | "lg" | "xl" | "2xl";
  fullHeight?: boolean;
  isLoading?: boolean;
  loadingMessage?: string;
  className?: string;
  border?: boolean;
}
export function Card({ children, hoverShadow, shadow, fullHeight, isLoading = false, border = true, loadingMessage = "Please wait...", className }: CardProps) {
  return <div className={`relative ${fullHeight ? "h-full" : ""} bg-white ${shadow ? "shadow-" + shadow : ''} ${hoverShadow ? "hover:shadow-" + hoverShadow : ''} ${border ? "border" : ""} ${className}`}>
    {isLoading && <div className="absolute bg-white backdrop-blur bg-opacity-60 z-10 h-full w-full flex items-center justify-center">
      <div className="flex flex-col  items-center">
        <svg
          className="animate-spin h-16 w-16 text-rose-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx={12}
            cy={12}
            r={10}
            stroke="currentColor"
            strokeWidth={2}
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <p className="text-rose-600 text-center">{loadingMessage}</p>
      </div>
    </div>


    }


    {children}


  </div>
}