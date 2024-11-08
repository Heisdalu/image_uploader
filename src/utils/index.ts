import { Variants } from "framer-motion";

export const exitAnimate: Variants = {
  inital: {
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
