import { Button, Container, Box, Typography } from "@mui/material";
import { t } from "i18next";
import { useState, useEffect } from "react";
import { RegisterProduct } from "../components/RegisterProductForm";
import { useProductStore } from "../store/productStore";
import ProductsList from "../components/ProductsList";

function ProductsManagement() {

    const [openRegisterProduct, setOpenRegisterProduct] = useState(false);

    const handleOpenRegisterProduct = () => setOpenRegisterProduct(true);

    const { deleteProduct, editProduct, fetchProducts, products } = useProductStore();

    const handleCloseRegisterProduct = () => {
        setOpenRegisterProduct(false);
        fetchProducts()
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <Container sx={{ ml: 0, mr: 0 }}>
            <Box display="flex" justifyContent="end">
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ borderRadius: 2 }}
                    onClick={handleOpenRegisterProduct}
                >
                    {t("productsManagement.addProduct")}
                </Button>
            </Box>
            <RegisterProduct open={openRegisterProduct} onClose={handleCloseRegisterProduct} />
            <Typography variant="h4" gutterBottom >
                {t("productsManagement.title")}
            </Typography>
            <ProductsList
                products={products}
                deleteProduct={deleteProduct}
                editProduct={editProduct}
            />
        </Container>
    );
}
export default ProductsManagement;