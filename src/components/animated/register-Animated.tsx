"use client";
import { TypeAnimation } from "react-type-animation";

const registerAnimated = () => {
  return (
    <TypeAnimation
      sequence={[
        "tu vida",
        1000,
        "tu productividad",
        1000,
        "tu tiempo",
        1000,
        "tu éxito",
        1000,
        "tus tareas",
        3000,
      ]}
      wrapper="span"
      speed={20}
      repeat={Infinity}
      className="text-xl font-bold font-Roboto text-indigo-600"
    />
  );
};

export default registerAnimated;
