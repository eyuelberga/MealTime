export function ThrowError({ error }: { error: string; }) {
    throw new Error(error);
    return <></>;
};