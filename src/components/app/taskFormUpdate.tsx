"use client";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { findOneTask } from "@/app/app/task/utils/findOneTask";
const validationSchema = yup.object({
  title: yup
    .string()
    .required("El nombre es requerido")
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(20, "El nombre debe tener menos de 20 caracteres"),
  description: yup
    .string()
    .max(100, "La descripcion debe tener menos de 100 caracteres"),
});
async function getCategory() {
  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const categories = await axios
    .post(
      `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
      {
        query: `
      query Query {
        categories {
          id
          name
          color
        }
      }
      `,
      },
      config
    )
    .then((response) => {
      return response.data.data.categories;
    });
  return categories;
}
const TaskFormUpdate = () => {
  const router = useRouter();
  const id = window.location.pathname.split("/")[4];
  const [task, setTask] = useState({
    title: "",
    status: "",
    expiredAt: "",
    description: "",
    category: {
      id: "",
    },
  });
  const [formattedDate, setFormattedDate] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedCategories = await getCategory();
      setCategories(fetchedCategories);
      setTask(await findOneTask(id));
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (task) {
      const date = new Date(task.expiredAt);
      const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
      setFormattedDate(formattedDate);
    }
  }, [task]);

  const formik = useFormik({
    initialValues: {
      title: task?.title || "",
      status: task?.status || "",
      expiredAt: formattedDate || "",
      description: task?.description || "",
      categoryID: task?.category?.id || "",
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
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
          mutation Mutation($updateTaskInput: UpdateTaskInput!) {
            updateTask(updateTaskInput: $updateTaskInput) {
              title
              status
              description
              expiredAt
              category {
                name
              }
            }
          }
            `,
            variables: {
              updateTaskInput: {
                id: id,
                title: values.title,
                status: values.status,
                expiredAt: values.expiredAt,
                description: values.description,
                categoryID: values.categoryID,
              },
            },
          },
          config
        )
        .then((response) => {
          if (response.data.data) {
            router.push("/app/task/all");
          } else {
            formik.setFieldError("CategoryID", "Datos inválidos");
          }
          resetForm();
        })
        .catch((error) => {
          console.error(error);
          formik.setFieldError("CategoryID", "Datos inválidos");
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
          Actualizar Tarea
        </h4>
        <label htmlFor="title" className="text-lg font-Roboto mb-3">
          Título
        </label>
        <input
          type="text"
          onChange={formik.handleChange}
          name="title"
          id="title"
          value={formik.values.title}
          className="border border-gray-300 p-2 rounded-lg mb-4"
        />
        {formik.errors.title ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {formik.errors.title}
          </div>
        ) : null}
        <label htmlFor="description" className="text-lg font-Roboto mb-3">
          Descripción
        </label>
        <textarea
          name="description"
          id="description"
          cols={30}
          rows={4}
          className="border border-gray-300 p-2 rounded-lg mb-4"
          maxLength={100}
          onChange={formik.handleChange}
          value={formik.values.description}
        ></textarea>
        {formik.errors.description ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {formik.errors.description}
          </div>
        ) : null}
        <label htmlFor="status" className="text-lg font-Roboto mb-3">
          Estado
        </label>
        <select
          name="status"
          id="status"
          className="border border-gray-300 p-2 rounded-lg mb-4"
          onChange={formik.handleChange}
          value={formik.values.status}
        >
          <option></option>
          <option value="OPEN">Sin iniciar</option>
          <option value="IN_PROGRESS">En Progreso</option>
          <option value="FINISHED">Finalizado</option>
        </select>
        {formik.errors.status ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {formik.errors.status}
          </div>
        ) : null}
        <label htmlFor="expiredAt" className="text-lg font-Roboto mb-3">
          Fecha límite
        </label>
        <input
          type="date"
          name="expiredAt"
          id="expiredAt"
          className="border border-gray-300 p-2 rounded-lg mb-4"
          onChange={formik.handleChange}
          value={formik.values.expiredAt}
        />
        <label htmlFor="categoryID" className="text-lg font-Roboto mb-3">
          Categoría
        </label>
        <select
          name="categoryID"
          id="categoryID"
          className="border border-gray-300 p-2 rounded-lg mb-4"
          onChange={formik.handleChange}
          value={formik.values.categoryID}
        >
          <option value="">Seleccione una categoría</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {formik.errors.categoryID ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {formik.errors.categoryID}
          </div>
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
export default TaskFormUpdate;
