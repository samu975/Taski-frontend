"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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

const CategoryMenu = () => {
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const categoryColors = (color: String) => {
    switch (color) {
      case "amarillo":
        return "bg-yellow-400";
      case "azul":
        return "bg-blue-400";

      case "verde":
        return "bg-green-400";
      case "violeta":
        return "bg-violet-400";
      case "rosa":
        return "bg-pink-400";
      case "naranja":
        return "bg-orange-400";
      case "celeste":
        return "bg-cyan-400";
      case "gris":
        return "bg-gray-400";
      default:
        return "bg-white";
    }
  };

  function handleMenu() {
    setMenuVisible(!menuVisible);
  }

  function goToCategories(category: String) {
    router.push(`/app/category/${category}`);
  }
  useEffect(() => {
    const fetchData = async () => {
      setCategories(await getCategory());
    };
    fetchData();
  }, []);
  return (
    <>
      <button
        className={`bg-indigo-600 shadow-md  p-2  ${
          menuVisible ? "w-full md:w-52" : "w-10 rounded-br-lg"
        }`}
        onClick={() => handleMenu()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6 text-white"
        >
          <path d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
          <path d="M6 6h.008v.008H6V6z" />
        </svg>
      </button>
      {menuVisible && (
        <div className="absolute bot-full left-0 bg-white border border-gray-300 shadow-md w-full md:w-52">
          {categories.map((category, index) => (
            <div
              onClick={() => {
                goToCategories(category.id);
                setMenuVisible(false);
              }}
              key={index}
              className={`p-2 flex cursor-pointer ${categoryColors(
                category.color
              )}`}
            >
              {category.name}
              <div
                className={`text-red-500 absolute right-1 z-10 `}
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/app/category/delete/${category.id}`);
                  setMenuVisible(false);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </div>
            </div>
          ))}
          <button
            className="p-2 w-full text-left hover:bg-gray-200 bg-teal-600"
            onClick={() => {
              router.push("/app/category/new");
              setMenuVisible(false);
            }}
          >
            Agregar nueva categoria
          </button>
        </div>
      )}
    </>
  );
};

export default CategoryMenu;
