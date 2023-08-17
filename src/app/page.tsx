import RegisterAnimated from "@/components/animated/register-Animated";
import RegisterForm from "@/components/profile/register-form";
import React from "react";

const Landing = () => {
  return (
    <main className="flex w-full min-h-screen flex-col items-center justify-between p-4">
      <div className="mt-8 mb-4 w-full flex flex-col justify-center">
        <h2 className="text-center w-full text-xl font-Roboto font-bold px-2">
          ¡Bienvenido a <span className="text-indigo-600">Taski</span> tu
          compañero definitivo para mantener tus{" "}
          <span className="text-indigo-600">tareas</span> bajo{" "}
          <span className="text-teal-500">control!</span>{" "}
        </h2>
      </div>

      <div className="relative">
        <video
          className="opacity-60"
          loop
          autoPlay
          muted
          data-testid="landing-video"
        >
          <source src="/landing-video.mp4" />
        </video>
        <div className="absolute top-0 left-0 w-full h-full bg-gray-300 opacity-10"></div>
      </div>
      <div data-testid="registration-animated">
        <h3 className=" text-center w-full font-roboto font-bold text-xl my-8 px-2">
          Regístrate ahora y descubre una forma más inteligente y sencilla de
          organizar <RegisterAnimated />
        </h3>
      </div>
      <div data-testid="registration-form">
        <RegisterForm />
      </div>
    </main>
  );
};

export default Landing;
