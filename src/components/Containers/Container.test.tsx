import { render, screen } from "@testing-library/react";
import Container from "./Container";

describe("Home", () => {
  test("must accept a JSX child", () => {
    render(<Container children={<h1 className=""></h1>} />);
    const child = screen.getByRole("heading");
    expect(child).toBeInTheDocument();
  });
});
