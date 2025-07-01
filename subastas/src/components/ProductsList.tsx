import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { ModeEdit } from '@mui/icons-material';
import { t } from "i18next";
import type { Product } from "../interfaces/productInterface";
import { useProductList } from "../hooks/useProductList";
import { UpdateProduct } from "./UpdateProductForm";


interface Column {
  id: "title" | "description" | "price" | "duration" | "status" | "actions";
  label: string;
  minWidth?: number;
  align?: "right" | "left" | "center";
}

interface ProductListProps {
  products: Product[];
  deleteProduct: (productId: string) => void;
  editProduct: (product: Product) => void;
}

export default function ProductsList({ products, deleteProduct, editProduct }: ProductListProps) {
  const {
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
  } = useProductList();

  const columns: Column[] = [
    {
      id: "title",
      label: t("productsManagement.name"),
      minWidth: 120,
      align: "left"
    },
    {
      id: "description",
      label: t("productsManagement.description"),
      minWidth: 200,
      align: "left"
    },
    {
      id: "price",
      label: t("productsManagement.price"),
      minWidth: 100,
      align: "left"
    },
    {
      id: "duration",
      label: t("productsManagement.duration"),
      minWidth: 100,
      align: "left"
    },
    {
      id: "status",
      label: t("productsManagement.status"),
      minWidth: 100,
      align: "left"
    },
    {
      id: "actions",
      label: t("productsManagement.actions"),
      minWidth: 100,
      align: "left"
    }
  ];


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
              {products
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((product) => (
                  <TableRow key={product.id}>
                    <TableCell align="left">{product.title}</TableCell>
                    <TableCell align="left">{product.description}</TableCell>
                    <TableCell align="left">{product.price}</TableCell>
                    <TableCell align="left">{product.duration}</TableCell>
                    <TableCell align="left">{product.status}</TableCell>
                    <TableCell align="left">
                      <Button onClick={(event) => {
                        event.stopPropagation();
                        handleOpenUpdateDialog(product);
                      }}>
                        <ModeEdit />
                      </Button>
                      <Button onClick={(event) => {
                        handleOpenDialog(product);
                        event.stopPropagation();
                      }}>
                        <RemoveShoppingCartIcon />
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
          count={products.length}
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
            {t("dialog.sureDeleteProduct") + selectedProductTitle + "?"}
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
                deleteProduct(selectedProductId);
                handleCloseDialog();
              }} autoFocus>
              {t("dialog.confirm")}
            </Button>
          </DialogActions>
        </Dialog>
        <UpdateProduct
          open={updateOpen}
          onClose={handleCloseUpdateDialog}
          productId={selectedProductId}
          editProduct={editProduct}
        />
      </Paper>
    </>
  );
}
