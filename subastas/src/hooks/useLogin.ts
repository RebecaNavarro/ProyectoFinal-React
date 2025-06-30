import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getUser } from "../services/Auth";
import { useAuth } from "../context/AuthContext";

export const useLogin = () => {

 const { login } = useAuth();

 const navigate = useNavigate();

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
          login(user);
            navigate("/Auctions");
          
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
