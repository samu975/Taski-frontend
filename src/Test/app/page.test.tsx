import React from "react";
import { render } from "@testing-library/react";
import Landing from "../../app/page";
import configureStore, { MockStore } from "redux-mock-store";

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

const mockStore = configureStore();

let store: MockStore;

describe("Landing", () => {
  it("renders welcome message", () => {
    const { getByText } = render(<Landing />);

    const welcomeMessage = getByText((content, element) => {
      return content.startsWith("¡Bienvenido a");
    });

    expect(welcomeMessage).toBeInTheDocument();
  });

  it("renders registration form", () => {
    const { getByTestId } = render(<Landing />);

    const registrationForm = getByTestId("registration-form");
    expect(registrationForm).toBeInTheDocument();
  });

  it("renders video element", () => {
    const { getByTestId } = render(<Landing />);

    const videoElement = getByTestId("landing-video");
    expect(videoElement).toBeInTheDocument();
  });

  it("renders registration animated component", () => {
    const { getByTestId } = render(<Landing />);

    const registrationAnimated = getByTestId("registration-animated");
    expect(registrationAnimated).toBeInTheDocument();
  });
});
