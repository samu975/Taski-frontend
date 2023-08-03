"use client";
import React from "react";
import { useRouter } from "next/navigation";

const TaskMenu = () => {
  const router = useRouter();

  const handleMenuClick = (status: String) => {
    switch (status) {
      case "OPEN":
        router.push("/app/task/open");
        break;
      case "IN_PROGRESS":
        router.push("/app/task/inprogress");
        break;
      case "FINISHED":
        router.push("/app/task/finished");
        break;
      default:
        router.push("/app/task/all");
        break;
    }
  };

  return (
    <>
      <ul className="p-2 shadow-lg flex gap-10 overflow-x-auto overflow-y-hidden h-10 ">
        <li
          onClick={() => handleMenuClick("All")}
          className="whitespace-nowrap border-b border-indigo-600 text-indigo-600 cursor-pointer"
        >
          All
        </li>
        <li
          onClick={() => handleMenuClick("OPEN")}
          className="whitespace-nowrap border-b border-green-600 cursor-pointer text-green-600"
        >
          Sin iniciar
        </li>
        <li
          onClick={() => handleMenuClick("IN_PROGRESS")}
          className="whitespace-nowrap border-b
         border-yellow-600 text-yellow-600 cursor-pointer"
        >
          En progeso
        </li>
        <li
          onClick={() => handleMenuClick("FINISHED")}
          className="whitespace-nowrap border-b border-blue-400 cursor-pointer text-blue-400"
        >
          Finalizados
        </li>
      </ul>
    </>
  );
};

export default TaskMenu;
