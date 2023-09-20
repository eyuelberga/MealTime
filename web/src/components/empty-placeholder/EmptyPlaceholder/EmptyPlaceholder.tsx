import { Button } from "@radix-ui/themes";
import { CardBody } from "@/components/card";
import Link from "next/link";
import { ReactNode } from "react";
export interface EmptyPlaceholderProps {
    title: string;
    subtitle?: string;
    cta?: string;
    href?: string;
    image?: ReactNode
}

export function EmptyPlaceholder({ title, subtitle, href, cta, image }: EmptyPlaceholderProps) {
    return <CardBody>
        <div className="items-center flex justify-center flex-col md:flex-row gap-6 flex-wrap">
            <div>
                {image}
            </div>
            <div className="text-center">
                <h1 className="my-2 text-gray-800 font-bold text-2xl">
                    {title}
                </h1>
                {subtitle && <p className="my-2 text-gray-800">
                    {subtitle}
                </p>}
                {href && cta && <Link href={href}> <Button variant="outline">
                    {cta}
                </Button></Link>}
            </div>

        </div>
    </CardBody>
}