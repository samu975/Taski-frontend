"use client";

import axios from "axios";

const token = localStorage.getItem("token");

const config = {
  headers: { Authorization: `Bearer ${token}` },
};

export const deleteButtonHandler = async (id: string) => {
  const tasks = await axios
    .post(
      "http://localhost:3000/graphql",
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
