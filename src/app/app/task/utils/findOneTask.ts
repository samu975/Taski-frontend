"use client";
import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("token");

const config = {
  headers: { Authorization: `Bearer ${token}` },
};

export const findOneTask = async (id: string) => {
  const task = await axios
    .post(
      `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
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
