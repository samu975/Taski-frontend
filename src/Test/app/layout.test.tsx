import React from "react";
import { render } from "@testing-library/react";
import RootLayout from "../../app/layout";
const mockChildren = <div>Mock Child Component</div>;

describe("RootLayout", () => {
  it("renders children correctly", () => {
    const { getByText } = render(<RootLayout>{mockChildren}</RootLayout>);

    expect(getByText("Mock Child Component")).toBeInTheDocument();
  });

  it("renders LogoMobile and BurguerMenu components", () => {
    const { getByTestId } = render(<RootLayout>{mockChildren}</RootLayout>);

    const logoMobile = getByTestId("logo-mobile");
    const burguerMenu = getByTestId("burguer-menu");

    expect(logoMobile).toBeInTheDocument();
    expect(burguerMenu).toBeInTheDocument();
  });

  it("applies min-h-screen and bg-slate-100 classes to body", () => {
    const { container } = render(<RootLayout>{mockChildren}</RootLayout>);

    const body = container.querySelector("body");

    expect(body).toHaveClass("min-h-screen bg-slate-100");
  });
});
