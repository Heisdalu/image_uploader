import Image from "next/image";

const DisplayImage = ({ url }: { url: string }) => {
  const download = () => {
    // Create a temporary link element
    const link = document.createElement("a");
    link.href = url;
    link.download = `${"image"}.jpg`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex justify-center items-center w-[100%] rounded-[10px] max-w-[400px] bg-transparent dark:bg-[#212936] dark:shadow-none p-[0.5rem] shadow-[6px_17px_39px_-14px_#E5E7EB]">
      <div className="w-[100%] space-y-[24px]">
        <div className="overflow-hidden rounded-[10px] h-[250px] w-[100%] bg-gray-200">
          <Image
            height={250}
            width={300}
            src={url}
            alt="image"
            className="h-[100%] w-[100%]"
          />
        </div>
        <div className=" flex justify-center space-x-[1rem] text-white text-[0.8rem]">
          {/* <button className="bg-[#3662E3] flex items-center justify-center space-x-[0.5rem] py-[0.5rem] px-[1rem] rounded-[10px]">
            <span>
              <Image height={15} width={15} src="Link.svg" alt="" />
            </span>
            <span>Share</span>
          </button> */}
          <button
            onClick={download}
            className="bg-[#3662E3] flex justify-center items-center space-x-[0.5rem] py-[0.5rem] px-[1rem] rounded-[10px]"
          >
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
