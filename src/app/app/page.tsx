"use client";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function App() {
  const router = useRouter();
  const token = window.localStorage.getItem("token");
  const user = JSON.parse(window.localStorage.getItem("user"));

  useEffect(() => {
    if (!token) {
      router.push("/");
    }
  }, []);

  const resNoToken = (
    <div>
      <h3>Esta es una página protegida</h3>
      <p>Si no estás logueado, serás redirigido a la página de inicio</p>
    </div>
  );

  return (
    <>
      {!token ? resNoToken : null}
      <div className="flex items-center flex-col">
        <h1 className="font-Roboto font-bold text-xl">
          Bienvenido <span className="text-indigo-600">{user.name}</span>
        </h1>
        <p className="px-6 mt-6 font-Roboto font-medium text-md">
          Para visualizar tus task selecciona una opcion en el menu de{" "}
          <span className="text-teal-600">estado</span> o en el menu de{" "}
          <span className="text-indigo-600">categorias</span>
        </p>
        <p className="px-6 mt-6 font-Roboto font-medium text-md">
          Para crear una nueva task haz click en el boton de abajo{" "}
        </p>
        <button
          onClick={() => {
            router.push("/app/task/new");
          }}
          className="mt-4 bg-teal-600 p-2 text-white rounded-md"
        >
          Crear Task
        </button>
      </div>
    </>
  );
}
