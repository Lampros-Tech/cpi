"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { FaXTwitter } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";
import { HiOutlineDocumentText } from "react-icons/hi";

import img2 from "@/public/assets/images/white-logo-icon.png";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import ContactModal from "../ui/ContactModal";
import NewsLetterSignUp from "../common/NewsLetterSignUp";
import { RiContactsBook3Line } from "react-icons/ri";

const Footer: React.FC = () => {
  const movingTextRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  // GSAP animation for infinite loop of CoPI text
  useGSAP(
    () => {
      if (movingTextRef.current) {
        const marqueeWidth = movingTextRef.current.scrollWidth / 2; // Half the width to handle seamless looping

        gsap.to(movingTextRef.current, {
          x: -marqueeWidth, // Move by half the width to simulate the infinite loop
          duration: 50, // Adjust duration for speed
          ease: "linear", // Keep it smooth and steady
          repeat: -1, // Infinite loop
        });
      }
    },
    { scope: movingTextRef }
  );

  return (
    <footer className="bg-black border-t border-[#777777] pt-20 text-white py-10 relative overflow-hidden">
      {/* Newsletter Signup Section */}
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="w-full md:w-auto">
            <h2 className="text-lg mb-2 font-mori font-normal">
              Sign up to our newsletter:
            </h2>
            <>
              <NewsLetterSignUp />
            </>
          </div>
          <div className="mt-10 md:mt-auto">
            <Image
              src={img2}
              width={100}
              alt="white logo icon"
              loading="lazy"
            />
          </div>
        </div>
      </div>
      <div className="container mx-auto px-6 mt-10">
        {/* Social Links */}
        <div className="flex flex-wrap space-x-4 md:space-x-8 mt-4 md:mt-0 items-center font-mori font-normal tracking-tighter">
          <a
            href="https://x.com/chain_haya"
            className="social-link twitter flex items-center space-x-2 group"
            target="_blank"
          >
            <FaXTwitter className="w-5 h-5 text-white mb-1" />
            <span>Twitter</span>
            <svg
              className="w-6"
              width="50"
              height="50"
              viewBox="0 0 50 50"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.4721 34.2505L15.4165 32.1949L27.75 19.8615L25.6944 17.8059L27.75 15.7504L29.8055 17.8059L31.8611 15.7504L33.9167 17.8059L31.8611 19.8615L33.9167 21.9171L31.8611 23.9727L29.8055 21.9171L17.4721 34.2505ZM31.8611 28.0838L33.9167 26.0282L31.8611 23.9727L29.8055 26.0282L31.8611 28.0838ZM31.8611 28.0838L29.8055 30.1394L31.8611 32.1949L33.9167 30.1394L31.8611 28.0838ZM21.5833 17.8059L23.6388 15.7504L25.6944 17.8059L23.6388 19.8615L21.5833 17.8059ZM21.5833 17.8059L19.5277 19.8615L17.4721 17.8059L19.5277 15.7504L21.5833 17.8059Z"
                fill="currentColor"
              />
            </svg>
          </a>

          <a
            href="https://t.me/ChaIn_L"
            className="social-link telegram flex items-center space-x-2"
            target="_blank"
          >
            <FaTelegramPlane className="w-5 h-5 text-white mb-1" />
            <span>Telegram</span>
            <svg
              className="w-6"
              width="50"
              height="50"
              viewBox="0 0 50 50"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.4721 34.2505L15.4165 32.1949L27.75 19.8615L25.6944 17.8059L27.75 15.7504L29.8055 17.8059L31.8611 15.7504L33.9167 17.8059L31.8611 19.8615L33.9167 21.9171L31.8611 23.9727L29.8055 21.9171L17.4721 34.2505ZM31.8611 28.0838L33.9167 26.0282L31.8611 23.9727L29.8055 26.0282L31.8611 28.0838ZM31.8611 28.0838L29.8055 30.1394L31.8611 32.1949L33.9167 30.1394L31.8611 28.0838ZM21.5833 17.8059L23.6388 15.7504L25.6944 17.8059L23.6388 19.8615L21.5833 17.8059ZM21.5833 17.8059L19.5277 19.8615L17.4721 17.8059L19.5277 15.7504L21.5833 17.8059Z"
                fill="currentColor"
              />
            </svg>
          </a>

          <div
            className="social-link cursor-pointer contact flex items-center space-x-2"
            onClick={openModal}
          >
            <RiContactsBook3Line className="w-5 h-5 text-white mb-1" />
            <span>Contact Us</span>
          </div>

          <a
            href="https://docs.daocpi.com"
            className="social-link docs flex items-center space-x-2"
            target="_blank"
          >
            <HiOutlineDocumentText className="w-5 h-5 text-white mb-1" />
            <span>Docs</span>
            <svg
              className="w-6"
              width="50"
              height="50"
              viewBox="0 0 50 50"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.4721 34.2505L15.4165 32.1949L27.75 19.8615L25.6944 17.8059L27.75 15.7504L29.8055 17.8059L31.8611 15.7504L33.9167 17.8059L31.8611 19.8615L33.9167 21.9171L31.8611 23.9727L29.8055 21.9171L17.4721 34.2505ZM31.8611 28.0838L33.9167 26.0282L31.8611 23.9727L29.8055 26.0282L31.8611 28.0838ZM31.8611 28.0838L29.8055 30.1394L31.8611 32.1949L33.9167 30.1394L31.8611 28.0838ZM21.5833 17.8059L23.6388 15.7504L25.6944 17.8059L23.6388 19.8615L21.5833 17.8059ZM21.5833 17.8059L19.5277 19.8615L17.4721 17.8059L19.5277 15.7504L21.5833 17.8059Z"
                fill="currentColor"
              />
            </svg>
          </a>
          
        </div>
      </div>
      {/* CoPI moving text with transparent text clipped to gradient background */}
      <div className="relative mt-0 h-80 overflow-hidden">
        <div
          ref={movingTextRef}
          className="absolute whitespace-nowrap text-[18rem] font-mori font-semibold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600"
          style={{
            backgroundImage:
              "linear-gradient(to right, #A78BFA, #F472B6, #FDE68A)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {/* Two copies of the CPI text for seamless looping */}
          <span className="mx-6">CPI CPI CPI CPI CPI CPI CPI CPI CPI</span>
        </div>
      </div>
      {isOpen && <ContactModal closeModal={closeModal} />}
    </footer>
  );
};

export default Footer;
