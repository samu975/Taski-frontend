"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { useFormik } from "formik";

interface TokenDecodeType {
  id: string;
  iat: number;
  exp: number;
}

export const getToken = () => {
  const token = Cookies.get("token");
  if (token) {
    return token;
  }
  return null;
};

const Page = () => {
  const token = getToken();
  const userID = token ? (jwt_decode(token) as TokenDecodeType).id : null;
  const router = useRouter();
  const [user, setUser] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(true);

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
              userId: userID,
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
  }, [userID]);

  const formik = useFormik({
    initialValues: {
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      password: user.password,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      event?.preventDefault();
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/graphql`, {
          query: ` 
          mutation Mutation($updateUserInput: UpdateUserInput!) { 
            updateUser(updateUserInput: $updateUserInput) { 
              name 
              lastname 
              email 
              password 
            } 
          } 
          `,
          variables: {
            updateUserInput: {
              name: values.name,
              lastname: values.lastname,
              password: values.password,
              id: userID,
            },
          },
          config,
        })
        .then((response) => {
          const data = response.data.data.updateUser;
          console.log(data);
          if (data.name) {
            router.push("/app");
          } else {
            formik.setFieldError("password", "credenciales invalidas");
          }
        })
        .catch((error) => {
          console.error(error);
          formik.setFieldError("password", "credenciales invalidas");
        });
    },
  });

  return (
    <div className="flex justify-center w-full my-8">
      <form
        className="flex flex-col bg-white shadow-lg rounded-2xl p-6 mb-12"
        onSubmit={formik.handleSubmit}
      >
        <h4 className="font-Roboto font-semibold text-2xl text-teal-500 mb-8 text-center">
          Editar Perfil
        </h4>
        <label htmlFor="name" className="text-lg font-Roboto mb-3">
          Nombre:
        </label>
        <input
          type="text"
          onChange={formik.handleChange}
          name="name"
          id="name"
          value={formik.values.name}
          className="border border-gray-300 p-2 rounded-lg mb-4"
        />
        {formik.errors.name ? (
          <div className="my-2 text-red-600">{formik.errors.name}</div>
        ) : null}
        <label htmlFor="lastname" className="text-lg font-Roboto mb-3">
          Apellido:
        </label>
        <input
          type="text"
          onChange={formik.handleChange}
          name="lastname"
          id="lastname"
          value={formik.values.lastname}
          className="border border-gray-300 p-2 rounded-lg mb-4"
        />
        {formik.errors.lastname ? (
          <div className="my-2 text-red-600">{formik.errors.lastname}</div>
        ) : null}
        <label htmlFor="email" className="text-lg font-Roboto mb-3">
          Email:
        </label>
        <input
          type="email"
          onChange={formik.handleChange}
          name="email"
          id="email"
          value={formik.values.email}
          className="border border-gray-300 p-2 rounded-lg mb-4"
          readOnly
        />
        {formik.errors.email ? (
          <div className="my-2 text-red-600">{formik.errors.email}</div>
        ) : null}
        <label htmlFor="email" className="text-lg font-Roboto mb-3">
          Nueva Contraseña:
        </label>
        <input
          type="password"
          onChange={formik.handleChange}
          name="password"
          id="password"
          value={formik.values.password}
          className="border border-gray-300 p-2 rounded-lg mb-4"
        />

        {formik.errors.password ? (
          <div className="my-2 text-red-600">{formik.errors.password}</div>
        ) : null}
        <button
          type="submit"
          className="bg-indigo-600 p-2 my-3 text-white rounded-lg"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Page;
