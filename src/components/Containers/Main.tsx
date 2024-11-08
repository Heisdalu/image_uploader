import Drag from "../Drag/Drag";
import DisplayImage from "../DisplayImage";
import Loading from "../Loading/Loading";

const DragContainer = () => {
  return (
    <>
      <div className="h-[calc(100%-75px)]  flex items-center justify-center px-[1rem] ">
        {/* <Drag /> */}
        {/* <Loading /> */}
        <DisplayImage />
      </div>
    </>
  );
};
export default DragContainer;
