import Container from "@/components/Containers/Container";
import Image from "next/image";
import { Inter } from "next/font/google";
import Drag from "@/components/Drag/Drag";
import DragContainer from "@/components/Containers/Main";

// If loading a variable font, you don't need to specify the font weight 0.825rem...0.75... 0.625
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function Home() {
  return (
    <div className={inter.className}>
      <Container>
        <header className="flex py-[1rem] px-[1rem] md:py-[1rem] md:px-[1.5rem] border-[1px]">
          <h1 className="space-x-[0.5rem] flex justify-center items-center">
            <span>
              <Image src="/logo-small.svg" height={20} width={20} alt="" />
            </span>
            <span className="text-[1rem] font-bold">ImageUpload</span>
          </h1>

          <button className="ml-auto p-[0.5rem] rounded-[10px] border-[1px] border-[#e5e7eb]">
            <Image src="/Moon_fill.svg" height={20} width={20} alt="" />
          </button>
        </header>
        <DragContainer />
      </Container>
    </div>
  );
}
