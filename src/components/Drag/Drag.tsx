import { exitAnimate } from "@/utils";
import Image from "next/image";
import { ChangeEvent, DragEvent, FC, useEffect } from "react";
import { motion, useAnimate } from "framer-motion";

interface DragProps {
  formUpdate: ({ value, url }: { value: FormData; url: string }) => void;
}

const triggerForm = (file: File, func: DragProps["formUpdate"]) => {
  const form = new FormData();
  form.append("file", file);
  func({
    value: form,
    url: URL.createObjectURL(file),
  });
};

const Drag: FC<DragProps> = ({ formUpdate }) => {
  const [scope, animate] = useAnimate();

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];
    console.log(file, "ll");

    if (!file.type.includes("image")) return;

    triggerForm(file, formUpdate);
  };

  const drop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    console.log(e.dataTransfer.files);
    const file = e.dataTransfer.files;

    if (file[0]) {
      triggerForm(file[0], formUpdate);
    }

    animate([
      [scope.current, { backgroundColor: "#fff" }, { duration: 0.3 }],
      [".inner", { borderColor: "#E5E7EB" }, { duration: 0.3 }],
    ]);
  };

  useEffect(() => {
    window.addEventListener("drop", (e) => {
      e.preventDefault();
      e.stopPropagation();
    });
    window.addEventListener("dragenter", (e) => {
      e.preventDefault();
      e.stopPropagation();
    });
    window.addEventListener("dragover", (e) => {
      e.preventDefault();
      e.stopPropagation();
    });
  }, []);

  return (
    <motion.div
      {...exitAnimate}
      onDragLeave={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.currentTarget !== e.relatedTarget) {
          animate([
            [
              scope.current,
              { backgroundColor: "#C2DAF9" },
              { duration: 0.3, ease: "easeIn" },
            ],
            [".inner", { borderWidth: 0 }, { duration: 0.0000001, at: "<" }],
          ]);
        } else {
          animate([
            [
              scope.current,
              { backgroundColor: "#fff" },
              { duration: 0.3, ease: "easeIn" },
            ],
            [
              ".inner",
              { borderWidth: "2px" },
              { duration: 0.1, ease: "easeIn" },
            ],
          ]);
        }
      }}
      className="h-[100%] w-[100%] flex justify-center items-center"
    >
      <div
        ref={scope}
        onDrop={drop}
        className="outer w-[100%] rounded-[10px] max-w-[500px] bg-[#fff] h-[300px] p-[0.5rem] dark:bg-[#212936]"
      >
        <div className="inner h-[100%] border-[2px] border-dashed border-[#E5E7EB] dark:border-[#4D5562] rounded-[10px] p-[0.5rem] flex flex-col text-center justify-center items-center space-y-[1.25rem]">
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
      </div>
    </motion.div>
  );
};
export default Drag;
