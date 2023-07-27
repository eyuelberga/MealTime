"use client";
export interface ErrorProps {
    error: Error
}
export default function Error({
    error
}: ErrorProps) {
    const getErrorMessage = (err: any) => {
        if (err && process.env.NODE_ENV !== "production") {
            if (err.response && err.response.data) {
                return err.response.data.message;
            }
            return err.message;
        }
        return "We're sorry, but we're having some technical difficulties. Please try again later."
    }

    return (
        <>
            <section className="relative z-10 py-[120px]">
                <div className="container">
                    <div className="flex -mx-4">
                        <div className="w-full px-4">
                            <div className="mx-auto max-w-[400px] text-center">
                                <h2 className="mb-2 text-[50px] font-bold leading-none text-rose-600 sm:text-[80px] md:text-[100px]">
                                    500
                                </h2>
                                <h4 className="mb-3 text-[22px] font-semibold leading-tight text-rose-600">
                                    Oops, something went wrong!
                                </h4>
                                <p className="mb-8 text-lg text-gray-600">
                                    {getErrorMessage(error)}
                                </p>
                                <button
                                    onClick={
                                        () => { window.location.assign(window.location.pathname) }
                                    }
                                    className="inline-block px-8 py-3 text-base font-semibold text-center text-rose-600 transition border border-rose-600 rounded-lg hover:bg-rose-600 hover:text-white"
                                >
                                    Try Again
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute top-0 left-0 flex items-center justify-between w-full h-full space-x-5 -z-10 md:space-x-8 lg:space-x-14">
                    <div className="h-full w-1/3 bg-gradient-to-t from-[#FFFFFF14] to-[#C4C4C400]" />
                    <div className="flex w-1/3 h-full">
                        <div className="h-full w-1/2 bg-gradient-to-b from-[#FFFFFF14] to-[#C4C4C400]" />
                        <div className="h-full w-1/2 bg-gradient-to-t from-[#FFFFFF14] to-[#C4C4C400]" />
                    </div>
                    <div className="h-full w-1/3 bg-gradient-to-b from-[#FFFFFF14] to-[#C4C4C400]" />
                </div>
            </section>
        </>

    )
}