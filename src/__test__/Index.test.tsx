import Index from "@/pages/index";
import { setup } from "@/utils";
import { screen } from "@testing-library/react";

describe("Index page", () => {
  test("should toggle dark mode", () => {
    const { user } = setup(<Index />);
    // const btn = screen.getByRole("");
    screen.logTestingPlaygroundURL();
  });
});
