import AddPercentage from "@/components/home/AddPercentage";
import ExpertAnalysis from "@/components/home/ExpertAnalysis";
import HeroSection from "@/components/home/HeroSection";
import HomeHeader from "@/components/home/HomeHeader";
import Resources from "@/components/home/Resources";
import WhatIsCPI from "@/components/home/WhatIsCPI";
// import SmoothScrolling from "@/components/layout/SmoothScrolling";

import dynamic from "next/dynamic";

const Panels = dynamic(() => import("@/components/home/Panels"), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] animate-pulse bg-gray-100 rounded-lg" />
  ),
});
const AddYourDAO = dynamic(() => import("@/components/home/AddYourDAO"), {
  ssr: false,
});
const Methodology = dynamic(() => import("@/components/home/Methodology"), {
  ssr: false,
});
const FeaturedDAOChart = dynamic(
  () => import("@/components/home/FeaturedDAOChart"),
  { ssr: false }
);

const Footer = dynamic(() => import("@/components/layout/Footer"), {
  ssr: false,
});

export default function Home() {
  return (
    // <SmoothScrolling>
    <main className="flex min-h-screen flex-col items-center">
      <div className="w-[100%] overflow-x-hidden">
        <HomeHeader />
        <section aria-label="Introduction and Methodology">
          <HeroSection />
          <AddPercentage />
          <WhatIsCPI />
          <Methodology />
        </section>
        <section aria-label="Data Analysis">
          <FeaturedDAOChart />
          <ExpertAnalysis />
          <Panels />
        </section>
        <Resources />
        <AddYourDAO />
        <Footer />
      </div>
    </main>
    // </SmoothScrolling>
  );
}
