export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                {children}
            </div>
        </section>
    )
}