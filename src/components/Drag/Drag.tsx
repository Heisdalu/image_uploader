import Image from "next/image";
import { ChangeEvent } from "react";

const Drag = () => {
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;

    const file = e.target.files[0];
    console.log(file, "ll");

    if (!file.type.includes("image")) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);
    // if (!reader) return;
    console.log(reader);

    reader.onloadstart = () => {
      console.log("start");
    };
    reader.onprogress = (e) => {
      console.log(e, "llll");
    };
    reader.onloadend = () => {
      console.log("end");
    };

    //   if(e.target.files.)
  };

  return (
    <div className="w-[100%] rounded-[10px] max-w-[500px] bg-[#fff] h-[300px] p-[0.5rem]">
      <div className="h-[100%] border-[2px] border-dashed border-[#E5E7EB] borer-[#3662E3] rounded-[10px] p-[0.5rem] flex flex-col text-center justify-center items-center space-y-[1.25rem]">
        <div>
          <Image src="/exit.svg" height={30} width={30} alt="" />
        </div>
        <div className="space-y-[0.5rem]">
          <div className="flex space-x-[6px]">
            <p className="font-medium">Drag & drop a file or </p>
            {/* <button className="text-[#3662E3]">browse files</button> */}
            <input
              accept="image"
              onChange={changeHandler}
              type="file"
              className="custom-file-input"
              name=""
              id=""
            />
          </div>
          <p className="text-[#4D5562] text-[0.75rem]">
            JPG, PNG or GIF - Max file size 2MB
          </p>
        </div>
      </div>
    </div>
  );
};
export default Drag;
