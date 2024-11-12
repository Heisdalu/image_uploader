import Container from "@/components/Containers/Container";
import Image from "next/image";
import { Inter } from "next/font/google";
import DragContainer from "@/components/Containers/Main";
import { useState } from "react";
import Link from "next/link";
import { Toaster } from "react-hot-toast";

// If loading a variable font, you don't need to specify the font weight 0.825rem...0.75... 0.625
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function Home() {
  const [isDark, setIsDark] = useState(false);
  return (
    <div className={`${inter.className} ${isDark ? "dark" : ""}`}>
      <Toaster
        toastOptions={{
          className: "baller",
          duration: 3000,
        }}
        position="top-right"
      />

      <Container>
        <header className="flex py-[1rem] px-[1rem] md:py-[1rem] md:px-[1.5rem] border-b-[1px] dark:border-[#212936]">
          <Link
            href={"/"}
            className="space-x-[0.5rem] flex justify-center items-center"
          >
            <span>
              <Image src="/logo-small.svg" height={20} width={20} alt="" />
            </span>
            <span className="text-[1rem] font-bold text-black dark:text-white">
              ImageUpload
            </span>
          </Link>

          <button
            onClick={() => setIsDark((prev) => !prev)}
            className="ml-auto p-[0.5rem] rounded-[10px] border-[1px] border-[#e5e7eb] dark:border-[#212936] dark:bg-[#4D5562]"
          >
            <Image
              src="/Sun_fill.svg"
              className="hidden dark:block"
              height={20}
              width={20}
              alt=""
            />
            <Image
              className="block dark:hidden"
              src="/Moon_fill.svg"
              height={20}
              width={20}
              alt=""
            />
          </button>
        </header>
        <DragContainer />
      </Container>
    </div>
  );
}
