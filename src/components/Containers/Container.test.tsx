import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Container from "./Container";

describe("Home", () => {
  test("renders a heading", () => {
    render(<Container children={<h1 className=""></h1>} />);

    const heading = screen.getByRole("heading");

    expect(heading).toBeInTheDocument();
  });
});
