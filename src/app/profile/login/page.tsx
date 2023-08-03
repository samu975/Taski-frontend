"use client";
import BurguerMenu from "@/components/common/burguerMenu";
import LoginForm from "@/components/profile/login-form";
import LogoMobile from "../../../components/common/logo-mobile";
import TaskiAnimated from "@/components/animated/taski-Animated";
import { useEffect, useState } from "react";

export default function Login() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  });
  if (!hydrated) {
    return null;
  }

  return (
    <>
      <div className="mt-8 mb-4 w-full flex justify-center">
        <h2 className="text-center text-2xl font-Roboto font-bold">
          ¡Bienvenido de nuevo!
        </h2>
      </div>
      <div className="flex w-full justify-center mb-8">
        <TaskiAnimated />
      </div>
      <div className="flex justify-center w-full">
        <LoginForm />
      </div>
    </>
  );
}
