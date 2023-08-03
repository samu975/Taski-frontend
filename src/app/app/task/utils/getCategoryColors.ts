export const getCategoryColors = (color: String) => {
  switch (color) {
    case "amarillo":
      return "bg-yellow-400";
    case "azul":
      return "bg-blue-400";
    case "rojo":
      return "bg-red-400";
    case "verde":
      return "bg-green-400";
    case "violeta":
      return "bg-violet-400";
    case "rosa":
      return "bg-pink-400";
    case "naranja":
      return "bg-orange-400";
    case "celeste":
      return "bg-cyan-400";
    case "gris":
      return "bg-gray-400";
    default:
      return "bg-slate-400";
  }
};
