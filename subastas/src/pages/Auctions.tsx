import { Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { t } from "i18next";
import ProductCard from "../components/ProductCard";
import { getProductService } from "../services/ProductService";


function Auctions() {
    const [products, setProducts] = useState<any[]>([]);

    const getAllProducts = async () => {
        const res = await getProductService();
        setProducts(res);
    };

    const activeProducts = products.filter((p) => p.status === "active");
    const upcomingProducts = products.filter((p) => p.status === "upcoming");
    const pastProducts = products.filter((p) => p.status === "past");

    useEffect(() => {
        getAllProducts();
    }, [products]);

    const getProductCard = (product: any) => {
        const { title, description, image, price, duration, status, id } = product;
        return (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={title}>
                <ProductCard
                    title={title}
                    description={description}
                    image={image}
                    price={price}
                    duration={duration}
                    status={status}
                    id={id}
                />
            </Grid>
        );
    };

    return (
        <>
            <div style={{ marginBottom: "1rem", boxShadow: "0 2px 4px rgba(0,0,0,0.1)", padding: "1rem", borderRadius: "8px" }}>
                <Typography variant="h5" fontWeight="bold" fontFamily="Arial" textAlign={"center"}>
                    {t("auctions.actualActions")}
                </Typography>

                <Container maxWidth="lg" sx={{ py: 4 }}>
                    <Grid container spacing={3}>
                        {activeProducts.length > 0 ? (
                            activeProducts.map((product) => getProductCard(product))
                        ) : (
                            <Typography variant="body1" sx={{ ml: 2 }}>
                                {t("auctions.noActive")}
                            </Typography>
                        )}
                    </Grid>
                </Container>
            </div>
            <div style={{ marginBottom: "1rem", boxShadow: "0 2px 4px rgba(0,0,0,0.1)", padding: "1rem", borderRadius: "8px" }}>
                <Typography variant="h5" fontWeight="bold" fontFamily="Arial" textAlign={"center"}>
                    {t("auctions.upcomingAuctions")}
                </Typography>
                <Container maxWidth="lg" sx={{ py: 4 }}>
                    <Grid container spacing={3}>
                        {upcomingProducts.length > 0 ? (
                            upcomingProducts.map((product) => getProductCard(product))
                        ) : (
                            <Typography variant="body1" sx={{ ml: 2 }}>
                                {t("auctions.noUpcoming")}
                            </Typography>
                        )}
                    </Grid>
                </Container>
            </div>
            <div style={{ marginBottom: "1rem", boxShadow: "0 2px 4px rgba(0,0,0,0.1)", padding: "1rem", borderRadius: "8px" }}>
                <Typography variant="h5" fontWeight="bold" fontFamily="Arial" textAlign={"center"}>
                    {t("auctions.pastAuctions")}
                </Typography>
                <Container maxWidth="lg" sx={{ py: 4 }}>
                    <Grid container spacing={3}>
                        {pastProducts.length > 0 ? (
                            pastProducts.map((product) => getProductCard(product))
                        ) : (
                            <Typography variant="body1" sx={{ ml: 2 }}>
                                {t("auctions.noPast")}
                            </Typography>
                        )}
                    </Grid>
                </Container>
            </div>
        </>
    );
}

export default Auctions;
