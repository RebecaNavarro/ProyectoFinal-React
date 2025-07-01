import { useState, type ChangeEvent } from "react";

import type { User } from "../interfaces/userInterface";

export const useUserList = () => {
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
    const [selectedUserId, setSelectedUserId] = useState<string>("");
    const [selectedUserName, setSelectedUserName] = useState<string>("");

    const handleOpenDialog = (user: User) => {
        setOpen(true);
        setSelectedUserId(user.id);
        setSelectedUserName(user.name);
    };

    const handleOpenUpdateDialog = (user: User) => {
        setUpdateOpen(true);
        setSelectedUserId(user.id);
    };

    const handleCloseDialog = () => {
        setOpen(false);
        setSelectedUserId("");
    };

    const handleCloseUpdateDialog = () => {
        setUpdateOpen(false);
    };

    return {
        open,
        updateOpen,
        page,
        rowsPerPage,
        selectedUserId,
        selectedUserName,
        handleChangePage,
        handleChangeRowsPerPage,
        handleOpenDialog,
        handleOpenUpdateDialog,
        handleCloseDialog,
        handleCloseUpdateDialog
    };
}