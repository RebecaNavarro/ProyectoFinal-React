import * as Yup from "yup";
import { useState } from "react";
import { useFormik } from "formik";
import { t } from "i18next";
import { registerProduct } from "../services/ProductService";

export const useProductRegister = (onClose: () => void) => {
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

  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      image: "",
      price: 0,
      duration: 0,
      status: "active",
    },
    validationSchema: productSchema,
    onSubmit: async (values) => {
      try {
        await registerProduct(
          values.title,
          values.description,
          values.image,
          values.price,
          values.duration,
          values.status
        );
        handleClose();
      } catch (error) {
        setErrorMessage(
          t("registerProduct.error_in_register") + (error as Error).message
        );
        setShowError(true);
      }
    },
  });

  const closeSnackbar = () => {
    setShowError(false);
    setErrorMessage("");
  }

  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  return {
    handleClose,
    formik,
    errorMessage,
    showError,
    closeSnackbar,
  };
};
