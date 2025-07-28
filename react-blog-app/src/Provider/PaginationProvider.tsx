import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
    type ReactNode,
} from "react";
import type { PaginationContextType } from "../types/PaginationContextTypes";

type PaginationProviderProps = {
    children: ReactNode;
};

export const PaginationContext = createContext<PaginationContextType | null>(
    null
);

export const PaginationProvider = ({ children }: PaginationProviderProps) => {
    const [items, setItems] = useState<any[]>([]);
    const [itemsPerPage, setItemsPerPage] = useState<number>(3);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [totalItems, setTotalItems] = useState<number>(0);

    const setTotalItemLength = useCallback((length: number) => {
        setTotalItems(length)
    }, [])

    const totalPages = useMemo(() => {
        if (totalItems !== 0) //server side pagination
            return Math.ceil(totalItems / itemsPerPage);
        return Math.ceil(items.length / itemsPerPage); //client side pagination
    }, [totalItems, itemsPerPage, items]);



    const paginatedItems = useMemo(() => {
        if (totalItems !== 0)//server side pagination
            return items
        //client side pagination
        const start = currentPage * itemsPerPage;
        const end = start + itemsPerPage;
        return items.slice(start, end);

    }, [items, currentPage, itemsPerPage]);

    const setPage = useCallback((page: number) => {
        if (page >= 0 && page < totalPages) {
            setCurrentPage(page);
        }
    }, [totalPages]);

    const pages = useMemo(() => {
        return Array.from({ length: totalPages }).map((_, index) => index)
    }, [items, itemsPerPage])

    function getPaginationRange(currentPage: number, totalPages: number, delta: number = 2) {
        const range = [];
        const left = Math.max(0, currentPage - delta)
        const right = Math.min(totalPages - 1, currentPage + delta)
        let lastPage;
        for (let i = 0; i < totalPages; i++) {
            if (i == 0 || i == totalPages - 1 || (i >= left && i <= right)) {
                if (lastPage != undefined && i - lastPage > 1) {
                    range.push('...')
                }
                range.push(i)
                lastPage = i
            }
        }

        return range;
    }
    const paginationButton = useMemo(() => {
        const displayPages = getPaginationRange(currentPage, totalPages, 2);

        return (
            <div className="max-w-6xl mx-auto flex flex-wrap justify-center mt-8 gap-2">

                {/* Previous */}
                <button
                    onClick={() => setPage(Math.max(0, currentPage - 1))}
                    disabled={currentPage === 0}
                    className={`px-3 py-2 rounded-md border transition
                            ${currentPage === 0
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-white text-blue-600 border-gray-300 hover:bg-gray-100'}
                     `}
                >
                    Previous
                </button>

                {/* Dynamic pages with dots */}
                {displayPages.map((item, idx) => (
                    typeof item === 'string'
                        ? <span key={`dots-${idx}`} className="px-3 py-2">…</span>
                        : (
                            <button
                                key={item}
                                onClick={() => setPage(item)}
                                className={`px-3 py-2 rounded-md border transition
                                ${item === currentPage
                                        ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                                        : 'bg-white text-blue-600 border-gray-300 hover:bg-gray-100'}
                                `}
                            >
                                {item + 1}
                            </button>
                        )
                ))}


                {/* Next */}
                <button
                    onClick={() => setPage(Math.min(totalPages - 1, currentPage + 1))}
                    disabled={currentPage >= totalPages - 1}
                    className={`px-3 py-2 rounded-md border transition
                         ${currentPage >= totalPages - 1
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-white text-blue-600 border-gray-300 hover:bg-gray-100'}
                `}
                >
                    Next
                </button>
            </div>
        );
    }, [totalPages, currentPage, setPage, paginatedItems]);



    const value = useMemo(
        () => ({
            items,
            currentPage,
            totalPages,
            paginatedItems,
            setPage,
            setItems,
            itemsPerPage,
            setItemsPerPage,
            paginationButton,
            getPaginationRange,
            pages,
            totalItems,
            setTotalItemLength
        }),
        [
            items,
            currentPage,
            totalPages,
            paginatedItems,
            setPage,
            itemsPerPage,
            setItemsPerPage,
            paginationButton,
            pages,
            getPaginationRange,
            totalItems,
            setTotalItemLength
        ]
    );

    return (
        <PaginationContext.Provider value={value}>
            {children}
        </PaginationContext.Provider>
    );
};

export const usePagination = () => {
    const context = useContext(PaginationContext);
    if (!context) {
        throw new Error("usePagination must be used within a PaginationProvider");
    }
    return context;
};
