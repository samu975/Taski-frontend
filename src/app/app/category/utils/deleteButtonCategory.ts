"use client";
import Cookies from "js-cookie";

import axios from "axios";

const token = Cookies.get("token");

const config = {
  headers: { Authorization: `Bearer ${token}` },
};

export const deleteCategoryButtonHandler = async (id: string) => {
  const tasks = await axios
    .post(
      `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
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
