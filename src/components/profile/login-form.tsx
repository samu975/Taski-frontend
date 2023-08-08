"use client";
import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import { useRouter } from "next/navigation";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("El email es invalido")
    .required("El email es requerido"),
  password: yup
    .string()
    .required("La contraseña es requerida")
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export default function LoginForm() {
  const router = useRouter();
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (event?.cancelable) {
        event.preventDefault();
      }
      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/graphql`, {
          query: `
            mutation Mutation($loginInput: LoginInput!) {
              login(loginInput: $loginInput) {
                user {
                  id
                  name
                  email
                }
                token
              }
            }
          `,
          variables: {
            loginInput: {
              email: values.email,
              password: values.password,
            },
          },
        })
        .then((response) => {
          const data = response.data.data.login;
          if (data.token) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            router.push("/app");
          } else {
            formik.setFieldError("password", "Invalid credentials");
          }
        })
        .catch((error) => {
          console.error(error);
          formik.setFieldError("password", "Invalid credentials");
        });
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className=" flex flex-col bg-white shadow-lg rounded-2xl p-6 mb-12"
    >
      <h4 className="font-Roboto font-semibold text-2xl text-teal-500 mt-4 mb-8 text-center">
        Log in
      </h4>
      <label htmlFor="email" className="text-lg font-Roboto mb-3">
        Email:
      </label>
      <input
        type="email"
        onChange={formik.handleChange}
        name="email"
        id="email"
        value={formik.values.email}
        className="border border-gray-300 rounded-md p-2 mb-4"
      />
      {formik.errors.email ? (
        <div className="my-2 text-red-600">{formik.errors.email}</div>
      ) : null}

      <label htmlFor="password" className="text-lg font-Roboto mb-3">
        Contraseña:
      </label>
      <input
        type="password"
        onChange={formik.handleChange}
        name="password"
        id="password"
        value={formik.values.password}
        className="border border-gray-300 rounded-md p-2 mb-4"
      />
      {formik.errors.password ? (
        <div className="mb-2 text-red-600">{formik.errors.password}</div>
      ) : null}

      <button className="bg-indigo-600 p-2 my-3 text-white rounded-lg">
        Enviar
      </button>
    </form>
  );
}
