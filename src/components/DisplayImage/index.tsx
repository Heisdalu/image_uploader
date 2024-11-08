import Image from "next/image";

const DisplayImage = () => {
  return (
    <div className="flex justify-center items-center w-[100%] rounded-[10px] max-w-[400px] bg-transparent dark:bg-[#212936] dark:shadow-none p-[0.5rem] shadow-[6px_17px_39px_-14px_#E5E7EB]">
      <div className="w-[100%] space-y-[24px]">
        <div className="rounded-[10px] h-[250px] w-[100%] bg-blue-400"></div>
        <div className=" flex justify-center space-x-[1rem] text-white text-[0.8rem]">
          <button className="bg-[#3662E3] flex items-center justify-center space-x-[0.5rem] py-[0.5rem] px-[1rem] rounded-[10px]">
            <span>
              <Image height={15} width={15} src="Link.svg" alt="" />
            </span>
            <span>Share</span>
          </button>
          <button className="bg-[#3662E3] flex justify-center items-center space-x-[0.5rem] py-[0.5rem] px-[1rem] rounded-[10px]">
            <span>
              <Image height={15} width={15} src="download.svg" alt="" />
            </span>
            <span>Download</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default DisplayImage;
