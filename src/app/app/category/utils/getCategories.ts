"use client";
import axios from "axios";
import Cookies from "js-cookie";
const token = Cookies.get("token");

const config = {
  headers: { Authorization: `Bearer ${token}` },
};

export const getCategoryAndTasks = async (idCategory: string) => {
  const categoryAndTasks = await axios
    .post(
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
          categoryId: idCategory,
        },
      },
      config
    )
    .then((response) => {
      return response.data.data.category;
    });
  return categoryAndTasks;
};
