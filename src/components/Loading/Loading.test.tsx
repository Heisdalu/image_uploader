import Loading from "./Loading";
import { render, screen } from "@testing-library/react";

describe("Loading Component", () => {
  test("should have a loading spinner", () => {
    render(<Loading />);
    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });
});
