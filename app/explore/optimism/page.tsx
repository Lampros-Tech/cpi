// src/app/explore/optimism/page.tsx
import OptimismDataTable from "@/components/common/OptimismDataTable";
import Header from "@/components/layout/Header";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import arrow from "@/public/assets/images/pixelarticons_arrow-up.svg";

async function getDelegates() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/delegates?page=1&limit=100`, {
      cache: "no-store", // Always fetch fresh data
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch delegates: ${res.statusText}`);
    }

    return res.json(); // Will match the API { success, page, total, data }
  } catch (error) {
    console.error("Error fetching delegates:", error);
    return { data: [] }; // Fallback empty array
  }
}

const OptimismPage = async () => {
  const { data: initialDataOptimism } = await getDelegates();

  return (
    <div className="bg-dark-gray">
      <Header />
      <div className="container mx-auto pb-4 flex flex-col bg-dark-gray">
        <h1 className="font-mori font-semibold text-[#fffce1] text-2xl md:text-4xl lg:text-6xl tracking-tight text-center my-6 md:my-12">
          OP Delegates
        </h1>

        <div className="custom-scrollbar">
          <Suspense fallback={<>Loading...</>}>
            <OptimismDataTable
              initialData={initialDataOptimism}
              background="bg-optimism"
              platform="optimism"
              member={true}
              iconURL="/assets/images/op_small.svg"
            />
          </Suspense>
        </div>

        <div className="my-20 flex items-center justify-center">
          <Link
            className="flex flex-row button-50 heroarrowbtn max-w-max justify-center items-center font-redhat font-semibold text-xl mr-8"
            href="/explore"
          >
            <span className="ml-4 drop-shadow-custom">Other DAOs Delegates</span>
            <Image
              src={arrow}
              alt="arrow icon"
              className="border border-white rounded-full bg-[#FF0E00] p-3"
              width={50}
              height={50}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OptimismPage;
