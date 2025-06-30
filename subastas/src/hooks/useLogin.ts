import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getUser } from "../services/Auth";
import { useAuth } from "../context/AuthContext";
import { useAuthStore } from "../store/authStore";

export const useLogin = () => {

  const { login } = useAuth();
  const { setUser, setToken, setIsAdmin, setIsAuth } = useAuthStore((state) => state);

  const navigate = useNavigate();

  const goToAuctions = () => {
    navigate("/Auctions");
  };

  const formik = useFormik({
    initialValues: {
      name: "beca",
      password: "123456",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("El nombre es requerido")
        .min(3, "El nombre debe tener al menos 3 caracteres")
        .max(50, "El nombre no puede exceder los 50 caracteres"),
      password: Yup.string()
        .required("La contraseña es requerida")
        .min(6, "La contraseña debe tener al menos 6 caracteres")
        .max(20, "La contraseña no puede exceder los 20 caracteres"),
    }),
    onSubmit: async (values) => {
      try {
        const user = await getUser(values.name);
        if (user && user.password === values.password) {
          setUser(user);
          setToken(user.token);
          setIsAuth(true);
          login(user.token);
          if (user.role === "admin") {
            setIsAdmin(true);
          }
          goToAuctions();
        }
        else {
          console.error("Credenciales incorrectas");
        }
      } catch (error) {
        console.error("Error al buscar el usuario:", error);

      }
    },
  });

  return {
    formik,

  };
};
