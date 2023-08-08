"use client";
import React, { useEffect, useState } from "react";
import { deleteButtonHandler } from "../../utils";
import { useRouter } from "next/navigation";
import axios from "axios";

const Page = () => {
  const [task, setTask] = useState({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const id = window.location.pathname.split("/")[4];

  const token = localStorage.getItem("token");

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    async function getTask() {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
          {
            query: `
              query Query($taskId: ID!) {
                task(id: $taskId) {
                  title
                  status
                  expiredAt
                  description
                  category {
                    id 
                  }
                }
              }
            `,
            variables: {
              taskId: id,
            },
          },
          config
        );

        setTask(response.data.data.task);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    }

    getTask();
  }, [id]);

  function handleDelete() {
    deleteButtonHandler(id);
    router.back();
  }

  function handlerCancel() {
    router.back();
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex justify-center w-full">
        <div>
          <h3 className="font-bold font-Roboto text-center px-4">
            Estas seguro que deseas eliminar{" "}
            <span className="text-indigo-600">{task.title}</span>
          </h3>
          <div className="flex justify-evenly my-4 md:justify-center md:gap-8 ">
            <button
              className="bg-red-600 p-2 rounded-md text-white"
              onClick={() => {
                handleDelete();
              }}
            >
              Eliminar
            </button>
            <button
              className="bg-indigo-600 p-2 rounded-md text-white"
              onClick={() => {
                handlerCancel();
              }}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
