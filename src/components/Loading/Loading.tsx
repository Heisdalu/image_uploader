import { exitAnimate } from "@/utils";
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <motion.div
      {...exitAnimate}
      className="flex justify-center items-center w-[100%] rounded-[10px] max-w-[400px] bg-[#fff] dark:bg-[#212936] dark:shadow-none h-[100px] p-[0.5rem] shadow-[6px_17px_39px_-14px_#E5E7EB]"
    >
      <div className=" w-[100%] flex justify-center flex-col items-center space-y-[16px]">
        <h1 className="space-x-[5px]">
          <span className="font-medium text-black dark:text-white">
            Uploading,
          </span>
          <span className="text-[#4D5562]">please wait...</span>
        </h1>
        <div className="dark:bg-[#4D5562] overflow-hidden relative rounded-[10px] w-[70%] h-[7px] bg-[#E5E7EB]">
          <motion.div
            animate={{ left: "calc(100% - 30px)" }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse",
              type: "tween",
            }}
            className="absolute top-0 left-[-40px] rounded-[10px] h-[100%] w-[50px] bg-[#3662E3]"
          ></motion.div>
        </div>
      </div>
    </motion.div>
  );
};
export default Loading;
