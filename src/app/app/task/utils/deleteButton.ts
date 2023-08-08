"use client";

import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("token");

const config = {
  headers: { Authorization: `Bearer ${token}` },
};

export const deleteButtonHandler = async (id: string) => {
  const tasks = await axios
    .post(
      `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
      {
        query: `
        mutation Mutation($removeTaskId: ID!) {
          removeTask(id: $removeTaskId) {
            title
            id
          }
        }
        `,
        variables: {
          removeTaskId: id,
        },
      },
      config
    )
    .then((response) => {
      return;
    });
  return tasks;
};
