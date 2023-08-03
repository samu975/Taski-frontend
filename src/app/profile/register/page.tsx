import RegisterAnimated from "@/components/animated/register-Animated";
import RegisterForm from "@/components/profile/register-form";
import React from "react";

const Register = () => {
  return (
    <>
      <h1 className="font-Roboto font-bold text-2xl text-center my-8">
        Bienvenido a <span className="text-indigo-600">Taski</span>
      </h1>
      <div className="flex justify-center w-full">
        <RegisterForm />
      </div>
    </>
  );
};

export default Register;
