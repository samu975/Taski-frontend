"use client";
import React, { useEffect, useState } from "react";

import { deleteCategoryButtonHandler } from "../../utils/deleteButtonCategory";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Category } from "@/components/inteface/Category.interface";

import Cookies from "js-cookie";

const Page = () => {
  const [category, setcategory] = useState({} as Category);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  let id: any;
  let token = Cookies.get("token");
  if (typeof window !== "undefined") {
    id = window.location.pathname.split("/")[4];
  }

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    async function getCategory() {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
          {
            query: `
            query Query($categoryId: ID!) {
              category(id: $categoryId) {
                name
                color
                tasks {
                  id
                  title
                  status
                  description
              status
              expiredAt
            }
            
          }
        }
        `,
            variables: {
              categoryId: id,
            },
          },
          config
        );
        setcategory(response.data.data.category);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    }
    getCategory();
  }, [id]);

  function handleDelete() {
    deleteCategoryButtonHandler(id);
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
          <h3 className="font-bold font-Roboto px-4 text-center">
            Estas seguro que deseas eliminar la categoria {""}
            <span className="text-indigo-600 font-bold font-Roboto text-center">
              {category.name}
            </span>
            {""} y todas sus tasks?
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
