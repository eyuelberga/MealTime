import { ChevronLeftIcon, ChevronRightIcon } from '@/components/icons';
import { Button } from "@/components/button";
import Link from 'next/link';
import { getPaginationRange } from '@/helpers';

export interface PaginationProps {
    totalPages: number;
    currentItems: number;
    currentPage: number;
    totalItems: number;
    size: number;
    pathname: string;
    searchParams: Record<string, string>;
}


export function Pagination({ pathname, totalPages, currentPage, searchParams, totalItems, currentItems, size }: PaginationProps) {
    const isPrevDisabled = totalPages <= 1 || currentPage === 0;
    const isNextDisabled = currentPage >= totalPages - 1;
    const currentItemCount = (size * currentPage) + 1;
    const getTruncatedPageList = () => {
        return getPaginationRange(currentPage, totalPages - 1);
    }
    const updateSearchParam = (page: number) => {
        const updated = { ...searchParams };
        updated["page"] = page.toString();
        return pathname + "?" + Object.keys(updated).reduce((prev, current) => `${prev ? `${prev}&` : ''}${current}=${updated[current]}`, '');
    }
    const addOne = (page: number) => page + 1;
    return (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
                <Button
                    as={isPrevDisabled ? undefined : Link}
                    isDisabled={isPrevDisabled}
                    variant="outline"
                    href={updateSearchParam(currentPage - 1)}

                >
                    Previous
                </Button>
                <Button as={isNextDisabled ? undefined : Link}
                    isDisabled={isNextDisabled}
                    variant="outline"
                    href={updateSearchParam(currentPage + 1)}
                >
                    Next
                </Button>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{currentItemCount}</span> to <span className="font-medium">{(currentItemCount + currentItems) - 1}</span> of{' '}
                        <span className="font-medium">{totalItems}</span> results
                    </p>
                </div>
                <div>
                    <nav className="isolate inline-flex -space-x-px shadow-sm" aria-label="Pagination">
                        <Button as={isPrevDisabled ? undefined : Link}
                            isDisabled={isPrevDisabled}
                            variant="outline"
                            href={updateSearchParam(currentPage - 1)}
                        >

                            <span className="sr-only">Previous</span>
                            <ChevronLeftIcon />
                        </Button>
                        {getTruncatedPageList()
                            .map(
                                (page) => {
                                    if (typeof (page) !== "number") {
                                        return <span key={page} className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                                            ...
                                        </span>
                                    }
                                    return <Button key={page} as={Link} variant={page === currentPage ? "solid" : "outline"}
                                        href={updateSearchParam(page)}

                                    >
                                        {addOne(page)}
                                    </Button>
                                })}

                        <Button as={isNextDisabled ? undefined : Link}
                            isDisabled={isNextDisabled}
                            variant="outline"
                            href={updateSearchParam(currentPage + 1)}
                        >
                            <span className="sr-only">Next</span>
                            <ChevronRightIcon />
                        </Button>
                    </nav>
                </div>
            </div>
        </div>
    )
}
