"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ApiResponse, DelegateData } from "@/types";
import { formatNumber } from "@/lib/utils/formatNumber";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import AvatarGenerator from "../ui/AvatarGenerator";
import { truncateAddress } from "@/lib/utils/truncateAddress";
import MembershipBadges from "../ui/MembershipBadges";
import Pagination from "./Pagination";
import { Tooltip } from "react-tooltip";
import { MdContentCopy } from "react-icons/md";

export interface InitialDataProps {
  initialData: DelegateData[];
  member: boolean;
  background: string;
  platform: string;
  iconURL: string;
}

const ROW_HEIGHT = 50;

const OptimismDataTable: React.FC<InitialDataProps> = ({
  initialData,
  member,
  background,
  platform,
  iconURL,
}) => {
  const [page, setPage] = useState<number>(1); // Start from page 1
  const [sort, setSort] = useState<string>("voting_power");
  const [isAsc, setIsAsc] = useState<boolean>(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 20 });
  const containerRef = useRef<HTMLDivElement>(null);

  const ITEMS_PER_PAGE = 20;

  // Memoized calculations for pagination and data
  const paginatedData = useMemo(() => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    return initialData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [initialData, page]);

  const totalPages = useMemo(() => {
    return Math.ceil(initialData.length / ITEMS_PER_PAGE);
  }, [initialData]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const tableRef = useRef<HTMLDivElement>(null);

  const handleSortChange = (value: string) => {
    setSort(value);
  };

  const handleSortOrderChange = () => {
    setIsAsc((prev) => !prev);
  };

  useEffect(() => {
    const options = {
      root: containerRef.current,
      rootMargin: '100px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute('data-index'));
          const newStart = Math.max(0, index - 10);
          const newEnd = Math.min(paginatedData.length, index + 20);
          setVisibleRange({ start: newStart, end: newEnd });
        }
      });
    }, options);

    const container = containerRef.current;
    if (container) {
      container.querySelectorAll('.row-marker').forEach(el => observer.observe(el));
    }

    return () => observer.disconnect();
  }, [paginatedData.length]);

  const Row = ({ index, item }: { index: number; item: any }) => (
    <div className="flex flex-row gap-2 text-black font-mori text-sm md:text-base py-4 px-4 border-b border-gray-200">
      <div className="flex justify-start items-center basis-1/5 min-w-[50px]">
        {index + 1}
      </div>
      <div
        className="basis-1/2 flex items-center gap-1 min-w-[100px]"
        data-tooltip-id="my-tooltip"
        data-tooltip-content={
          item.ens_name === null ? item.delegate : item.ens_name
        }
        data-tooltip-place="bottom"
      >
        <AvatarGenerator address={item.delegate || ""} />
        <span className="truncate font-semibold max-w-xs text-xs lg:text-[15px]">
          {item.ens_name === null
            ? truncateAddress(item.delegate || "")
            : item.ens_name}
        </span>
        <button
          onClick={() => {
            if (item.delegate) {
              navigator.clipboard.writeText(item.delegate);
              setCopiedIndex(index);

              // Remove the "Copied!" text after 2 seconds
              setTimeout(() => {
                setCopiedIndex(null);
              }, 800);
            }
          }}
          className="ml-2 text-black hover:opacity-100 opacity-50 relative"
          title="Copy Delegate Address"
        >
          <MdContentCopy />
          {copiedIndex === index && (
            <span className="absolute top-[-5px] left-[400%] transform -translate-x-1/2 bg-transparent text-blue-700 text-xs px-2 py-1 rounded border border-blue-700">
              Copied!
            </span>
          )}
        </button>
      </div>
      <Tooltip id="my-tooltip" />
      {platform === "optimism" ? (
        <div className="basis-1/2 flex flex-row justify-center items-center min-w-[100px]">
          <div className="flex flex-row gap-0 items-center justify-center">
            <MembershipBadges item={item} />
          </div>
        </div>
      ) : null}
      <div className="basis-1/2 flex flex-row justify-center items-center flex-wrap min-w-[140px]">
        <span className="flex flex-col items-center justify-center text-xs lg:text-sm">
          {formatNumber(parseInt(item.voting_power))}
          <span className="font-semibold ">
            {"(" + Number(item.th_vp).toFixed(2) + "%)"}
          </span>
        </span>
      </div>
      <div className="basis-1/2 flex items-center justify-center font-bold min-w-[120px]">
        {Number(item.influence).toFixed(5)}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col justify-center items-center m-auto bg-white rounded-[20px]">
      <div
        className={`p-[20px] md:p-[30px] h-[100px] rounded-t-[20px] w-full flex justify-between items-center ${background} ${
          platform === "compound" ? "text-black" : "text-white"
        }`}
      >
        <span className="flex flex-row items-center text-inherit font-mori font-semibold text-xl md:text-2xl">
          <Image
            src={iconURL}
            alt="optimism logo"
            width={56}
            height={56}
            className="h-[40px] w-[40px]  md:h-[50px] md:w-[50px] rounded-full mr-2"
          />
          All Delegates
        </span>
        <span className="font-normal text-md md:text-xl font-mori">
          {/* {"(" + formatNumber(initialData.length) + " delegates)"} */}
          (235,285 Delegates)
        </span>
      </div>

      <div className="w-full border rounded-lg shadow-sm" ref={containerRef}>
        {/* Header */}
        <div className="flex flex-row gap-2 bg-[#f0f0f0] text-black font-mori font-semibold text-sm md:text-base py-4 px-4 border-b">
          <div className="flex justify-start items-center basis-1/5 min-w-[50px]">
            #
          </div>
          <div className="flex items-center justify-start basis-1/2 min-w-[100px]">
            Delegate
          </div>
          {platform === "optimism" && (
            <div className="flex justify-center items-center basis-1/2 min-w-[100px]">
              Member
            </div>
          )}
        </div>

        <div className="h-[650px] overflow-auto">
          {paginatedData.slice(visibleRange.start, visibleRange.end).map((item, idx) => (
            <React.Fragment key={idx + visibleRange.start}>
              <div className="row-marker" data-index={idx + visibleRange.start} />
              <Row index={idx + visibleRange.start} item={item} />
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="my-4">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      <div className="font-mori font-normal text-xs text-gray-500 self-end p-4">
        Last updated on:-{" "}
        <span className="text-black ml-1">30 November, 2024</span>
      </div>
    </div>
  );
};

export default OptimismDataTable;
