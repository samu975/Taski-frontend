import { getByLabelText, render } from "@testing-library/react";
import { getToken } from "../../app/profile/page";
import Page from "../../app/profile/page";
import { act } from "react-dom/test-utils";
import React from "react";

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

describe("Profile page", () => {
  test("getToken returns null when no token is present", () => {
    const token = getToken();
    expect(token).toBe(null);
  });

  describe("Testing hooks", () => {
    test("useEffect and useState is called", () => {
      const mockState = {
        name: "Mock Name",
        lastname: "Mock Lastname",
        email: "mock@example.com",
        password: "mockpassword",
      };

      const mockUseState = jest.spyOn(React, "useState");
      mockUseState.mockImplementationOnce(() => [mockState, jest.fn()]);

      const mockUseEffect = jest.spyOn(React, "useEffect");
      mockUseEffect.mockImplementationOnce((f) => f());
      render(<Page />);

      expect(mockUseState).toHaveBeenCalled();

      expect(mockUseEffect).toHaveBeenCalled();
    });
  });

  describe("Testing Form", () => {
    test("renders form inputs", () => {
      const { getByLabelText } = render(<Page />);
      const nameInput = getByLabelText("Nombre:");
      const lastnameInput = getByLabelText("Apellido:");
      const emailInput = getByLabelText("Email:");
      const passwordInput = getByLabelText("Nueva Contraseña:");

      expect(nameInput).toBeInTheDocument();
      expect(lastnameInput).toBeInTheDocument();
      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
    });
  });
});
