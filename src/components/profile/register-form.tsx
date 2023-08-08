"use client";
import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import { useRouter } from "next/navigation";

const validationSchema = yup.object({
  name: yup.string().required("El nombre es requerido"),

  lastname: yup.string().required("El apellido es requerido"),

  email: yup
    .string()
    .email("El email es invalido")
    .required("El email es requerido"),

  password: yup
    .string()
    .required("La contraseña es requerida")
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
});

const RegisterForm = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: { name: "", lastname: "", email: "", password: "" },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      event?.preventDefault();
      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/graphql`, {
          query: `
        mutation Mutation($createUserInput: CreateUserInput!) {
          createUser(createUserInput: $createUserInput) {
            name
          }
        }
          `,
          variables: {
            createUserInput: {
              name: values.name,
              lastname: values.lastname,
              email: values.email,
              password: values.password,
            },
          },
        })
        .then((response) => {
          const data = response.data.data.createUser;
          if (data.name) {
            router.push("/profile/login");
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
    <>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col bg-white shadow-lg rounded-2xl p-6 mb-12"
      >
        <h4 className="font-Roboto font-semibold text-2xl text-teal-500 mb-8 text-center">
          Registro
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
        />
        {formik.errors.email ? (
          <div className="my-2 text-red-600">{formik.errors.email}</div>
        ) : null}
        <label htmlFor="email" className="text-lg font-Roboto mb-3">
          Constraseña:
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
    </>
  );
};

export default RegisterForm;
