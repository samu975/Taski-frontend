"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getTasks } from "../utils/getTask";
import { getCategoryColors } from "../utils/getCategoryColors";
const FinishedTasks = () => {
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const user = JSON.parse(window.localStorage.getItem("user"));

  function getStatus(status: String) {
    switch (status) {
      case "OPEN":
        return "Sin comenzar";
      case "IN_PROGRESS":
        return "En progreso";
      case "FINISHED":
        return "Finalizada";
      default:
        return "Sin comenzar";
    }
  }

  function getStatusColor(status: String) {
    switch (status) {
      case "OPEN":
        return "text-green-400";
      case "IN_PROGRESS":
        return "text-yellow-400";
      case "FINISHED":
        return "text-blue-400";
      default:
        return "text-green-400";
    }
  }

  useEffect(() => {
    async function getTasksAsync() {
      await getTasks().then((response) => {
        const taskFiltrer = response.filter(
          (task) => task.status === "FINISHED"
        );
        setTasks(taskFiltrer);
      });
    }
    getTasksAsync();
  }, []);

  return (
    <>
      <div className="flex items-center flex-col">
        <h1 className="font-Roboto font-bold text-xl">
          Bienvenido <span className="text-indigo-600">{user.name}</span>
        </h1>

        <p className="font-roboto font-medium text-lg my-4 mx-4 px-2 text-center">
          En esta sección podras visualizar, editar y eliminar todas tus{" "}
          <span className="text-teal-600">tareas</span> creadas
        </p>
        {tasks.length > 0 ? (
          <>
            {tasks.map((task, index) => {
              const date = new Date(task.expiredAt);
              return (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center w-3/5 bg-white rounded-md shadow-md my-4 p-2 md:w-2/12"
                >
                  <div
                    className={`flex items-center justify-center w-2 h-2 rounded-t-md ${getCategoryColors(
                      task.category.color
                    )}`}
                  ></div>
                  <h3 className="font-roboto font-bold ">{task.title}</h3>
                  <div className="flex items-center justify-center w-full">
                    <p className="font-roboto font-medium text-md">
                      Estado:{" "}
                      <span
                        className={`font-roboto font-bold text-md whitespace-nowrap ${getStatusColor(
                          task.status
                        )}`}
                      >
                        {getStatus(task.status)}
                      </span>
                    </p>
                  </div>
                  <p className="font-roboto font-medium text-md">
                    Descripcion: {task.description}
                  </p>
                  <p>
                    {date.getDate() +
                      "/" +
                      (date.getMonth() + 1) +
                      "/" +
                      date.getFullYear()}
                  </p>
                  <div className="w-full flex justify-evenly my-2">
                    <button
                      className="bg-purple-500 text-white py-2 px-4 rounded-lg"
                      onClick={() => {
                        router.push(`/app/task/edit/${task.id}`);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </button>
                    <button
                      className="bg-purple-500 text-white py-2 px-4 rounded-lg"
                      onClick={() => {
                        router.push(`/app/task/delete/${task.id}`);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              );

              //acaba
            })}
          </>
        ) : (
          <div>
            <h3>No tienes tareas creadas</h3>
          </div>
        )}
        <button
          onClick={() => {
            router.push("/app/task/new");
          }}
          className="my-4 bg-teal-600 p-2 rounded-md text-white"
        >
          Crear Task
        </button>
      </div>
    </>
  );
};

export default FinishedTasks;
