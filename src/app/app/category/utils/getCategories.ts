"use client";
import axios from "axios";

const token = localStorage.getItem("token");

const config = {
  headers: { Authorization: `Bearer ${token}` },
};

export const getCategoryAndTasks = async (idCategory: string) => {
  const categoryAndTasks = await axios
    .post(
      "http://localhost:3000/graphql",
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
