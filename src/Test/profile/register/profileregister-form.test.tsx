import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RegisterForm from "../../../components/profile/register-form";
import axios from "axios";

jest.mock("axios");
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null),
    };
  },
}));

describe("RegisterForm", () => {
  it("renders correctly", () => {
    render(<RegisterForm />);

    expect(screen.getByText("Registro")).toBeInTheDocument();
    expect(screen.getByLabelText("Nombre:")).toBeInTheDocument();
    expect(screen.getByLabelText("Apellido:")).toBeInTheDocument();
    expect(screen.getByLabelText("Email:")).toBeInTheDocument();
    expect(screen.getByLabelText("Constraseña:")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Enviar" })).toBeInTheDocument();
  });

  it("displays validation errors on invalid submission", async () => {
    render(<RegisterForm />);
    const submitButton = screen.getByRole("button", { name: "Enviar" });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("El nombre es requerido")).toBeInTheDocument();
      expect(screen.getByText("El apellido es requerido")).toBeInTheDocument();
      expect(screen.getByText("El email es requerido")).toBeInTheDocument();
      expect(
        screen.getByText("La contraseña es requerida")
      ).toBeInTheDocument();
    });
  });

  it("handles successful submission", async () => {
    const mockRouterPush = jest.fn();
    const mockResponse = {
      data: {
        data: {
          createUser: {
            name: "Mock Name",
          },
        },
      },
    };

    jest
      .spyOn(require("next/router"), "useRouter")
      .mockReturnValue({ push: mockRouterPush });

    render(<RegisterForm />);
    const submitButton = screen.getByRole("button", { name: "Enviar" });

    fireEvent.change(screen.getByLabelText("Nombre:"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText("Apellido:"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByLabelText("Email:"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Constraseña:"), {
      target: { value: "password" },
    });

    fireEvent.click(submitButton);
  });
});
