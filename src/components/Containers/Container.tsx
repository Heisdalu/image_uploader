import { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => {
  return <div className="bg-[#F9FAFB] h-[100vh]">{children}</div>;
};
export default Container;
