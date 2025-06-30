import * as Yup from "yup";
import { useState } from "react";
import { useFormik } from "formik";
import { t } from "i18next";
import { registerUser } from "../services/Auth";

export const useUserRegistry = (onClose: () => void) => {
  const userSchema = Yup.object({
    name: Yup.string()
      .required(t("registerUser.name_required"))
      .min(3, t("registerUser.name_min"))
      .max(50, t("registerUser.name_max")),
    password: Yup.string()
      .required(t("registerUser.password_required"))
      .min(6, t("registerUser.password_min"))
      .max(20, t("registerUser.password_max")),
    role: Yup.string()
      .required(t("registerUser.role_required"))
      .oneOf(["admin", "user"], t("registerUser.role_invalid")),
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
      role: "",
    },
    validationSchema: userSchema,
    onSubmit: async (values) => {
      try {
        await registerUser(
          values.name,
          values.password,
          values.role
        );
        handleClose();
      } catch (error) {
        setErrorMessage(
          t("registerUser.error_in_register") + (error as Error).message
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
