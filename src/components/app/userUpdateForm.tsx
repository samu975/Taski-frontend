"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { useFormik } from "formik";
import * as yup from "yup";
interface TokenDecodeType {
  id: string;
  iat: number;
  exp: number;
}

export default function UpdateUserForm() {
  const getToken = () => {
    const token = Cookies.get("token");

    if (token) {
      return token;
    }
    return null;
  };

  const token = getToken();

  const userID = token ? (jwt_decode(token) as TokenDecodeType).id : null;
  const router = useRouter();
  const [user, setUser] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(true);

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
          {
            query: `
            query Query($userId: ID!) {
              user(id: $userId) {
                name
                lastname
                email
                password
              }
            }
            `,
            variables: {
              userId: userID,
            },
          },
          config
        );

        setUser(response.data.data.user);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    fetchData();
  }, [userID]);

  const formik = useFormik({
    initialValues: {},
    onSubmit: (values) => {
      console.log("click");
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {/* Resto del código del formulario */}
      <button type="submit">Click</button>
    </form>
  );
}
