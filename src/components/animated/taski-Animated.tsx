"use cliet";
import { TypeAnimation } from "react-type-animation";

const TaskiAnimated = () => {
  return (
    <TypeAnimation
      sequence={[
        "Domina tus tareas",
        1000,
        "Domina tu productividad",
        1000,
        "Domina tu tiempo",
        1000,
        "Domina tu éxito",
        3000,
      ]}
      wrapper="h3"
      speed={20}
      repeat={Infinity}
      className="text-center text-2xl font-bold font-Roboto text-indigo-600"
    />
  );
};

export default TaskiAnimated;
