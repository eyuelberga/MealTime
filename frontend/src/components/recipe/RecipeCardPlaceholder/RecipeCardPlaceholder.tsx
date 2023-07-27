export function RecipeCardPlaceholder() {
    return <div
        role="status"
        className="border border-gray-200 shadow animate-pulse"
    >
        <div className="flex items-center justify-center h-64 mb-4 bg-gray-200 ">

        </div>
        <div className="p-4 md:p-6">
            <div className="h-2.5 bg-gray-200 w-48 mb-4" />
            <div className="h-2 bg-gray-200 mb-2.5" />
        </div>
        <span className="sr-only">Loading...</span>
    </div>

}