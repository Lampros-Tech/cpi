import type { Metadata } from "next";
import { Red_Hat_Display } from "next/font/google";
import localFont from "next/font/local";
import "react-loading-skeleton/dist/skeleton.css";
import "react-tooltip/dist/react-tooltip.css";
// import 'katex/dist/katex.min.css';
import "./globals.css";

const katex_main = localFont({
  src: [
    {
      path: "../public/fonts/katex/KaTeX_Main-Regular.woff2", // Adjust path if needed
      weight: "400", // Check actual weight if different
      style: "normal",
    },
    // Add other weights/styles for KaTeX_Main if you use them
  ],
  display: "swap", // Apply font-display: swap
  variable: "--font-katex-main", // Optional: use CSS variable
});

const katex_math = localFont({
  src: [
    {
      path: "../public/fonts/katex/KaTeX_Math-Italic.woff2", // Adjust path if needed
      weight: "400", // Check actual weight if different
      style: "italic",
    },
  ],
  display: "swap",
  variable: "--font-katex-math", 
});

const katex_size1 = localFont({
  src: [
    {
      path: "../public/fonts/katex/KaTeX_Size1-Regular.woff2", // Adjust path if needed
      weight: "400", // Check actual weight if different
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-katex-size1", // Optional: use CSS variable
});

const red_hat_display = Red_Hat_Display({
  weight: ["400", "600"],
  subsets: ["latin"],
  variable: "--font-red-hat",
  display: "swap",
});

const pp_mori = localFont({
  src: [
    {
      path: "./fonts/PPMori-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/PPMori-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-pp-mori",
});

export const metadata: Metadata = {
  title: "Concentration of Power Index in DAOs",
  description:
    "Tracking and analyzing the distribution of influence within decentralized governance structures",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${red_hat_display.variable} ${pp_mori.variable} ${katex_main.variable} ${katex_math.variable} ${katex_size1.variable}`}>
        {children}
      </body>
    </html>
  );
}
