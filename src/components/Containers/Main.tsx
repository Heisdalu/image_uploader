import Drag from "../Drag/Drag";
import DisplayImage from "../DisplayImage";
import Loading from "../Loading/Loading";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

const DragContainer = () => {
  const [file, setFile] = useState<{
    form: FormData | null;
    url: string;
  }>({
    form: null,
    url: "",
  });
  const [viewState, setViewState] = useState<"idle" | "loading" | "success">(
    "idle"
  );

  const formHandler = (data: { value: FormData; url: string }) => {
    setFile({
      form: data.value,
      url: data.url,
    });
    setViewState("loading");
    setTimeout(() => {
      setViewState("success");
    }, 5000);
  };

  // console.log(file);

  return (
    <>
      <div
        className={`h-[calc(100%-75px)] ${
          viewState === "idle" ? "" : "flex items-center justify-center"
        }  px-[1rem] `}
      >
        <AnimatePresence mode="wait">
          {viewState === "idle" && (
            <Drag key={"drag"} formUpdate={formHandler} />
          )}
          {viewState === "loading" && <Loading key={"loading"} />}
          {viewState === "success" && (
            <DisplayImage url={file.url} key={"display"} />
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
export default DragContainer;
