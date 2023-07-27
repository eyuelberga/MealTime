export  function Section({ children }: any) {
    return (<div className="grid grid-cols-12 gap-4 py-8 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200">
        {children}
    </div>)
}