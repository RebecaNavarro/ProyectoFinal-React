import { useState, type ChangeEvent } from "react";

import type { Product } from "../interfaces/productInterface";

export const useProductList = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (_: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const [open, setOpen] = useState(false);
    const [updateOpen, setUpdateOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState<string>("");
    const [selectedProductTitle, setSelectedProductTitle] = useState<string>("");

    const handleOpenDialog = (product: Product) => {
        setOpen(true);
        setSelectedProductId(product.id);
        setSelectedProductTitle(product.title);
    };

    const handleOpenUpdateDialog = (product: Product) => {
        setUpdateOpen(true);
        setSelectedProductId(product.id);
    };

    const handleCloseDialog = () => {
        setOpen(false);
        setSelectedProductId("");
    };

    const handleCloseUpdateDialog = () => {
        setUpdateOpen(false);
    };

    return {
        open,
        updateOpen,
        page,
        rowsPerPage,
        selectedProductId,
        selectedProductTitle,
        handleChangePage,
        handleChangeRowsPerPage,
        handleOpenDialog,
        handleOpenUpdateDialog,
        handleCloseDialog,
        handleCloseUpdateDialog
    };
}