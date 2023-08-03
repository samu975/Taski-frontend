"use client";
import axios from "axios";

const token = localStorage.getItem("token");

const config = {
  headers: { Authorization: `Bearer ${token}` },
};

export const findOneTask = async (id: string) => {
  const task = await axios
    .post(
      "http://localhost:3000/graphql",
      {
        query: `
        query Query($taskId: ID!) {
          task(id: $taskId) {
            title
            status
            expiredAt
            description
            category {
              id 
            }
          }
        }
        `,
        variables: {
          taskId: id,
        },
      },
      config
    )
    .then((response) => {
      return response.data.data.task;
    })
    .catch((err) => {
      console.log(err);
    });
  return task;
};
