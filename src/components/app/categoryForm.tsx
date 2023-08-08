"use client";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useRouter } from "next/navigation";

const validationSchema = yup.object({
  name: yup
    .string()
    .required("El nombre es requerido")
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(20, "El nombre debe tener menos de 20 caracteres"),
});

const CategoryForm = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      color: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      event?.preventDefault();
      axios
        .post(
          `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
          {
            query: `
        mutation Mutation($createCategoryInput: CreateCategoryInput!) {
          createCategory(createCategoryInput: $createCategoryInput) {
            name
            color
          }
        }
        `,
            variables: {
              createCategoryInput: {
                name: values.name,
                color: values.color,
              },
            },
          },
          config
        )
        .then((response) => {
          if (response.data.data) {
            router.push("/app/task/all");
          } else {
            formik.setFieldError("CategoryID", "Datos invalidos ");
          }
          resetForm();
        });
    },
  });

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col bg-white shadow-lg rounded-2xl p-6 mb-12 h-full"
      >
        <h4 className="font-Roboto font-semibold text-2xl text-teal-500 mb-8 text-center">
          Crear Categoria
        </h4>
        <label htmlFor="name" className="text-lg font-Roboto mb-3">
          nombre
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
          <div>
            <p className="text-red-500 text-xs italic">{formik.errors.name}</p>
          </div>
        ) : null}
        <label htmlFor="color" className="text-lg font-Roboto mb-3">
          Color
        </label>
        <select
          name="color"
          id="color"
          className="border border-gray-300 p-2 rounded-lg mb-4"
          onChange={formik.handleChange}
          value={formik.values.color}
        >
          <option></option>
          <option value="amarillo">amarillo </option>
          <option value="azul">azul</option>
          <option value="rojo">rojo</option>
          <option value="verde">verde</option>
          <option value="violeta">violeta</option>
          <option value="rosa">rosa</option>
          <option value="naranja">naranja</option>
          <option value="celeste">celeste</option>
          <option value="gris">gris</option>
          <option value="blanco">blanco</option>
        </select>
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
export default CategoryForm;
