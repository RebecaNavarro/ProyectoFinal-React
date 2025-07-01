import { useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { t } from "i18next";
import { useProductStore } from "../store/productStore";
import type { Product } from "../interfaces/productInterface";

const productSchema = Yup.object({
    title: Yup.string()
        .required(t("registerProduct.title_required"))
        .min(3, t("registerProduct.title_min"))
        .max(100, t("registerProduct.title_max")),
    description: Yup.string()
        .required(t("registerProduct.description_required"))
        .min(10, t("registerProduct.description_min"))
        .max(100, t("registerProduct.description_max")),
    image: Yup.string()
        .required(t("registerProduct.image_required"))
        .url(t("registerProduct.image_invalid")),
    price: Yup.number()
        .required(t("registerProduct.price_required"))
        .min(0, t("registerProduct.price_min")),
    duration: Yup.number()
        .required(t("registerProduct.duration_required"))
        .min(1, t("registerProduct.duration_min")),
    status: Yup.string()
        .required(t("registerProduct.status_required"))
        .oneOf(["active", "past", "upcoming"], t("registerProduct.status_invalid")),
});

export const useProductUpdate = (productId: string, editProduct: (product: Product) => void, onClose: () => void) => {

    const { fetchProducts, products } = useProductStore((state) => state);

    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            image: "",
            price: 0,
            duration: 0,
            status: "",
        },
        validationSchema: productSchema,
        onSubmit: async (values) => {
            try {
                const product = await editProduct({
                    id: productId,
                    ...formik.values
                });
                handleClose();
            } catch (error) {
                console.error("Error al registrar el producto:", error);
            }
        },
    });

    const handleClose = () => {
        formik.resetForm();
        onClose();
    };

    useEffect(() => {
        const selectedProduct = products.find((p) => p.id === productId);
        if (selectedProduct) {
            formik.setValues({
                title: selectedProduct.title,
                description: selectedProduct.description,
                image: selectedProduct.image,
                price: selectedProduct.price,
                duration: selectedProduct.duration,
                status: selectedProduct.status,
            });
        }
    }, [productId, products]);

    useEffect(() => {
        fetchProducts();
    }, []);

    return {
        formik,
        handleClose,
        fetchProducts
    };
}