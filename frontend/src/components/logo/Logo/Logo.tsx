import { LogoIcon } from "@/components/icons";

export function Logo() {
    return <div className='flex  flex-wrap items-center gap-1 text-rose-600 leading-tight'>
        <LogoIcon className='w-16 h-16' />
        <p className='text-2xl font-semibold '>Meal Time</p>
    </div>
}