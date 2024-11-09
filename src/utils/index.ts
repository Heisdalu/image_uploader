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
