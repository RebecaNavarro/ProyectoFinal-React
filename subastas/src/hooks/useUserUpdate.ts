import { useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";;
import { t } from "i18next";
import type { User } from "../interfaces/userInterface";
import { useUserStore } from "../store/userStore"

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


export const useUserUpdate = (userId: string, editUser: (user: User) => void, onClose: () => void) => {

    const { fetchUsers, users } = useUserStore((state) => state);

    const formik = useFormik({
        initialValues: {
            name: "",
            password: "",
            role: "",
        },
        validationSchema: userSchema,
        onSubmit: async (values) => {
            try {
                const user = await editUser({
                    id: userId,
                    ...formik.values
                });
                handleClose();
            } catch (error) {
                console.error("Error al registrar el usuario:", error);
            }
        },
    });

    const handleClose = () => {
        formik.resetForm();
        onClose();
    };

    useEffect(() => {
        const selectedUser = users.find((u) => u.id === userId);
        if (selectedUser) {
            formik.setValues({
                name: selectedUser.name,
                password: selectedUser.password,
                role: selectedUser.role,
            });
        }
    }, [userId, users]);

    useEffect(() => {
        fetchUsers();
    }, []);

    return {
        formik,
        handleClose,
        fetchUsers
    };
}