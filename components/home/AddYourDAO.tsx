"use client";
import Image from "next/image";
import img from "@/public/assets/images/plus_icon.png";
import NewDAOModal from "../ui/NewDAOModal";
import { useState } from "react";
// import dynamic from "next/dynamic";

// const Experience = dynamic(() => import("../ui/Experiment"), {
//   ssr: false,
// });

const AddYourDAO: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  return (
    <div className="min-h-[600px] bg-black relative flex items-center justify-center mb-10 overflow-x-hidden">
      <div className="relative z-50 w-full mx-auto flex flex-col items-center justify-center min-h-[600px]">
        <h1 className="font-mori max-w-[90%] font-semibold text-2.5xl md:text-5xl">
          Got a DAO? Let's Track It!
        </h1>
        <button
          className="mt-8 flex flex-row button-50 justify-center items-center font-redhat font-semibold text-xl mr-8"
          aria-label="add-your-dao"
          onClick={openModal}
        >
          <span className="ml-4 pr-2 drop-shadow-custom">Add Your DAO</span>
          <Image
            src={img}
            alt="arrow icon"
            className="rounded-full bg-[#957BFF] p-1"
            width={30}
            height={30}
            loading="lazy"
          />
        </button>
      </div>

      <video
        className="absolute w-auto h-full !max-w-none z-0 pointer-events-none"
        autoPlay
        loop
        muted
        playsInline
        controls={false}
        preload="metadata"
        aria-placeholder="blur"
        poster="/assets/images/video-fallback.png" 
      >
        <source src="/assets/images/video.webm" type="video/mp4" />
        <source src="/assets/images/video.mp4" type="video/mp4" />
        <Image
          src="/assets/images/video-fallback.png"
          alt="Static background image"
          fill
          className="absolute w-auto h-full !max-w-none"
          priority={false}
          loading="lazy"
          quality={75}
        />
        Your browser does not support the video tag.
      </video>
      {/* <Image src={"/assets/images/video-fallback.png"} fill={true} className="absolute !w-auto h-full mx-auto !max-w-none aspect-square" alt="background image" /> */}
      {/* <Experience /> */}
      {isOpen && <NewDAOModal closeModal={closeModal} />}
    </div>
  );
};

export default AddYourDAO;
