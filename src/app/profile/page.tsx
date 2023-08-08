"use client";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useRouter } from "next/navigation";

const validationSchema = yup.object({
  name: yup.string().required("El nombre es requerido"),
  lastName: yup.string().required("El apellido es requerido"),
  email: yup
    .string()
    .email("El email no es valido")
    .required("El email es requerido"),
  password: yup
    .string()
    .required("La contraseña es requerida")
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
});

const page = () => {
  const router = useRouter();
  const userLocalStorage = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
          {
            query: `
            query Query($userId: ID!) {
              user(id: $userId) {
                name
                lastname
                email
                password
              }
            }
            `,
            variables: {
              userId: userLocalStorage.id,
            },
          },
          config
        );

        setUser(response.data.data.user);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    fetchData();
  }, [userLocalStorage.id]);

  console.log(user);
  return (
    <div className="w">
      <h1>Esta es la pagina de perfil</h1>
    </div>
  );
};

export default page;
