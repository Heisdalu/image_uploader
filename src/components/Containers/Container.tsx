import { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <div className="">
      <div className="bg-[#F9FAFB] dark:bg-[#121826] h-[100vh]">{children}</div>
    </div>
  );
};
export default Container;
