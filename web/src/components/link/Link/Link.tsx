import { Url } from "next/dist/shared/lib/router/router";
import NextLink, { LinkProps } from "next/link";
export function withFrom(href: Url) {
    if (typeof window === 'undefined')
        return href;
    const hrefString = href.toString();
    return `${hrefString}${hrefString.includes("?") ? "&" : "?"}from=${window.location.pathname}`;

}
export function Link(props: LinkProps) {
    return <NextLink {...props} href={withFrom(props.href)} />
}