import { Button } from "@/components/button";
import { CardBody } from "@/components/card";
import {Link} from "@/components/link";
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
        <div className="items-center flex justify-center flex-col md:flex-row md:gap-28 gap-16">
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
                {href && cta && <Button variant="outline" as={Link} href={href}>
                    {cta}
                </Button>}
            </div>

        </div>
    </CardBody>
}