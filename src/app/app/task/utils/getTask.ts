"use client";
import axios from "axios";

const token = localStorage.getItem("token");

const config = {
  headers: { Authorization: `Bearer ${token}` },
};

export const getTasks = async () => {
  const tasks = await axios
    .post(
      "http://localhost:3000/graphql",
      {
        query: `
        query Query {
          tasks {
            id
            title
            status
            description
            expiredAt
            category {
              color
            }
          }
        }
        `,
      },
      config
    )
    .then((response) => {
      return response.data.data.tasks;
    });
  return tasks;
};
