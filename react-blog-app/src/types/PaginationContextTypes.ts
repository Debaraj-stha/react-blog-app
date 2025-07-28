import type { ReactNode } from "react";
import type { BlogType } from "./blog";

export type PaginationContextType = {
    items: any[];
    currentPage: number;
    totalPages: number;
    paginatedItems: any[];
    setPage: (page: number) => void;
    setItems: (items: BlogType[]) => void;
    itemsPerPage: number;
    setItemsPerPage: (number: number) => void;
    paginationButton: ReactNode;
    pages: number[];
    getPaginationRange: (currentPage: number, totalPages: number, delta?: number) => (number | string)[];
    totalItems:number;
    setTotalItemLength:(length:number)=>void;
};
