import { exitAnimate } from "@/utils";
import Image from "next/image";
import { ChangeEvent, FC } from "react";
import { motion } from "framer-motion";

interface DragProps {
  formUpdate: ({ value, url }: { value: FormData; url: string }) => void;
}

const Drag: FC<DragProps> = ({ formUpdate }) => {
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    const form = new FormData();
    const file = e.target.files[0];
    console.log(file, "ll");

    if (!file.type.includes("image")) return;

    form.append("file", file);

    formUpdate({
      value: form,
      url: URL.createObjectURL(file),
    });
    //   if(e.target.files.)
  };

  return (
    <motion.div
      {...exitAnimate}
      className="w-[100%] rounded-[10px] max-w-[500px] bg-[#fff] h-[300px] p-[0.5rem] dark:bg-[#212936]"
    >
      <div className="h-[100%] border-[2px] border-dashed border-[#E5E7EB] dark:border-[#4D5562] rounded-[10px] p-[0.5rem] flex flex-col text-center justify-center items-center space-y-[1.25rem]">
        <div>
          <Image src="/exit.svg" height={30} width={30} alt="" />
        </div>
        <div className="space-y-05px] dark:text-[#fff]">
          <div className="flex space-x-[6px]">
            <p className="font-medium">Drag & drop a file or </p>
            <input
              accept="image"
              onChange={changeHandler}
              type="file"
              className="custom-file-input"
              name=""
              id=""
            />
          </div>
          <p className="text-[#4D5562] dark:text-[#F9FAFBCC] text-[0.75rem]">
            JPG, PNG or GIF - Max file size 2MB
          </p>
        </div>
      </div>
    </motion.div>
  );
};
export default Drag;
