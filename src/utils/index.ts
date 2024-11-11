import userEvent from "@testing-library/user-event";
import { render } from "@testing-library/react";
import { Variants } from "framer-motion";

export const exitAnimate: Variants = {
  initial: {
    opacity: 1,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

// setup function
export function setup(jsx: JSX.Element) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
}
