"use client";

import axios from "axios";

const token = localStorage.getItem("token");

const config = {
  headers: { Authorization: `Bearer ${token}` },
};

export const deleteCategoryButtonHandler = async (id: string) => {
  const tasks = await axios
    .post(
      "http://localhost:3000/graphql",
      {
        query: `
        mutation UpdateTask($removeCategoryId: ID!) {
          removeCategory(id: $removeCategoryId) {
            name
            color
          }
        }
        `,
        variables: {
          removeCategoryId: id,
        },
      },
      config
    )
    .then((response) => {
      return;
    });
  return tasks;
};
