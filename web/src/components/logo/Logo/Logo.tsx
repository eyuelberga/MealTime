import { LogoIcon } from "@/components/icons";
import Image from "next/image";

export function Logo() {
    return <div className='flex p-1 flex-wrap items-center gap-1 text-rose-600 leading-tight'>
        <Image alt="Meal Time logo" src="/logo.png" width="55" height="55" />
        <p className='hidden lg:block text-2xl font-semibold '>Meal Time</p>
    </div>
}