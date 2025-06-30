import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { ModeEdit } from '@mui/icons-material';
import { t } from "i18next";
import { useUserList } from "../hooks/useUserList";
import { UpdateUser } from "./UpdateUserForm";
import type { User } from "../interfaces/userInterface";


interface Column {
  id: "nombre" | "rol" | "actions";
  label: string;
  minWidth?: number;
  align?: "right" | "left" | "center";
}

interface UsersListProps {
  users: User[];
  deleteUser: (userId: string) => void;
  editUser: (user: User) => void;
}

const columns: Column[] = [
  {
    id: "nombre",
    label: t("userManagement.name"),
    minWidth: 120,
    align: "left"
  },
  {
    id: "rol",
    label: t("userManagement.role"),
    minWidth: 100,
    align: "left",
  },
  {
    id: "actions",
    label: t("userManagement.actions"),
    minWidth: 100,
    align: "left",
  }
];

export default function UsersList({ users, deleteUser, editUser }: UsersListProps) {
  const {
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
  } = useUserList();

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "visible", marginTop: 2 }}>
        <TableContainer
          sx={{
            maxHeight: 440,
            width: "100%",
            overflowX: "auto",
            maxWidth: { xs: 450, sm: 550, md: 600, lg: 1000, xl: 1400 },
          }}
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                  <TableRow key={user.id}>
                    <TableCell align="left">{user.name}</TableCell>
                    <TableCell align="left">{user.role}</TableCell>
                    <TableCell align="left">
                      <Button onClick={(event) => {
                        event.stopPropagation();
                        handleOpenUpdateDialog(user);
                      }}>
                        <ModeEdit />
                      </Button>
                      <Button onClick={(event) => {
                        handleOpenDialog(user);
                        event.stopPropagation();
                      }}>
                        <PersonRemoveIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ marginTop: 3 }}
        />
        <Dialog
          open={open}
          onClose={handleCloseDialog}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {t("dialog.sureDeleteUser") + selectedUserName + "?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {t("dialog.noBackAction")}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color='inherit' autoFocus onClick={handleCloseDialog}>
              {t("dialog.cancel")}
            </Button>
            <Button
              color='inherit'
              sx={{ backgroundColor: "red" }}
              onClick={() => {
                deleteUser(selectedUserId);
                handleCloseDialog();
              }} autoFocus>
              {t("dialog.confirm")}
            </Button>
          </DialogActions>
        </Dialog>
        <UpdateUser
          open={updateOpen}
          onClose={handleCloseUpdateDialog}
          userId={selectedUserId}
          editUser={editUser}
        />
      </Paper>
    </>
  );
}
