export function CardHeaderPlaceholder() {
    return <div
        role="status"
        className="px-5 py-4 border-b border-slate-100 animate-pulse"
    >
        <div className="flex items-start lg:items-center justify-between gap-4 flex-col lg:flex-row">
            <div className="bg-gray-200 h-12 w-1/4">
            </div>
            <div className="h-12 w-full bg-gray-200">
            </div>

        </div>
        <span className="sr-only">Loading...</span>
    </div>
}