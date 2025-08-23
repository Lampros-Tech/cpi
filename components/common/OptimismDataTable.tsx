"use client";

import { DelegateData } from "@/types";
import { formatNumber } from "@/lib/utils/formatNumber";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Skeleton from "react-loading-skeleton";
import AvatarGenerator from "../ui/AvatarGenerator";
import { truncateAddress } from "@/lib/utils/truncateAddress";
import MembershipBadges from "../ui/MembershipBadges";
import Pagination from "./Pagination";
import { Tooltip } from "react-tooltip";
import { MdContentCopy } from "react-icons/md";

export interface InitialDataProps {
  initialData: DelegateData[];
  initialTotal: number;
  initialPage: number;
  member: boolean;
  background: string;
  platform: string;
  iconURL: string;
}

const ITEMS_PER_PAGE = 20;

const OptimismDataTable: React.FC<InitialDataProps> = ({
  initialData,
  initialTotal,
  initialPage,
  member,
  background,
  platform,
  iconURL,
}) => {
  const [data, setData] = useState<DelegateData[]>(initialData);
  const [page, setPage] = useState<number>(initialPage);
  const [totalDelegates, setTotalDelegates] = useState<number>(initialTotal);
  const [totalPages, setTotalPages] = useState<number>(Math.ceil(initialTotal / ITEMS_PER_PAGE));
  const [loading, setLoading] = useState<boolean>(false);
  
  const [sort, setSort] = useState<string>("voting_power");
  const [isAsc, setIsAsc] = useState<boolean>(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const isMounted = useRef(false); // To prevent useEffect from running on initial render
  const tableRef = useRef<HTMLTableElement | null>(null);

  useEffect(() => {
    // We don't want to fetch on the initial render because we have `initialData`
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    const fetchDelegates = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/delegates?page=${page}&limit=${ITEMS_PER_PAGE}&sort=${sort}&isAsc=${isAsc}`);
        console.log(`api/delegates?page=${page}&limit=${ITEMS_PER_PAGE}&sort=${sort}&isAsc=${isAsc}`)
        const result = await res.json();

        if (result.success) {
          setData(result.data);
          setTotalDelegates(result.total);
          setTotalPages(Math.ceil(result.total / ITEMS_PER_PAGE));
        } else {
            // Handle API error
            console.error("Failed to fetch new data:", result.error);
            setData([]); // Clear data on error
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
        // Scroll to top of the table after fetch
        tableRef.current?.scrollTo(0, 0);
      }
    };

    fetchDelegates();
  }, [page, sort, isAsc]); // Re-run effect when page or sort options change

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleSortChange = (value: string) => {
    // If clicking the same sort button, toggle order. Otherwise, set new sort column.
    if (sort === value) {
      setIsAsc(prev => !prev);
    } else {
      setSort(value);
      setIsAsc(false); // Default to descending on new column
    }
    setPage(1); // Reset to page 1 when sorting changes
  };

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
          (244,604 Delegates)
        </span>
      </div>

      <div
        className="max-h-[650px] overflow-y-auto w-full custom-scrollbar border-b"
        ref={tableRef}
      >
        <div
          className={`${
            platform === "optimism" ? "min-w-[550px]" : "min-w-[450px]"
          } flex flex-row gap-2 bg-[#f0f0f0] text-black font-mori font-semibold text-sm md:text-[16px] leading-normal sticky top-0 z-[100] py-4 px-4`}
        >
          <div className="flex justify-start items-center basis-1/5 min-w-[50px] ">
            #
          </div>
          <div className="flex items-center justify-start basis-1/2 min-w-[100px] ">
            Delegate
          </div>
          {platform === "optimism" ? (
            <div className="flex justify-center items-center basis-1/2 min-w-[100px]">
              Member
            </div>
          ) : null}
          <div className="flex justify-center items-center basis-1/2 min-w-[140px]">
            {platform === "optimism" ? (
              <div className="flex justify-center py-2 max-w-[140px] min-w-[140px] border border-[#a3a3a3] rounded-full">
                <span>Voting Power</span>
                <button
                  type="button"
                  aria-label="asc"
                  className="ml-1"
                  onClick={() => {
                    handleSortChange("voting_power");
                  }}
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 320 512"
                    aria-hidden="true"
                    focusable="false"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {sort !== "voting_power" ? (
                      <path d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41zm255-105L177 64c-9.4-9.4-24.6-9.4-33.9 0L24 183c-15.1 15.1-4.4 41 17 41h238c21.4 0 32.1-25.9 17-41z"></path>
                    ) : isAsc ? (
                      <path d="M279 224H41c-21.4 0-32.1-25.9-17-41L143 64c9.4-9.4 24.6-9.4 33.9 0l119 119c15.2 15.1 4.5 41-16.9 41z"></path>
                    ) : (
                      <path d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"></path>
                    )}
                  </svg>
                </button>
              </div>
            ) : (
              <div className="flex justify-center py-2 max-w-[140px] min-w-[140px]">
                <span>Voting Power</span>
              </div>
            )}
          </div>
          <div className="flex justify-center items-center basis-1/2 min-w-[120px] ">
            <div className="flex justify-center py-2 max-w-[120px] min-w-[120px] border border-[#a3a3a3] rounded-full">
              <span>Influence</span>
              <button
                type="button"
                aria-label="asc"
                className="ml-1"
                onClick={() => {
                  handleSortChange("influence");
                }}
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 320 512"
                  aria-hidden="true"
                  focusable="false"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {sort !== "influence" ? (
                    <path d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41zm255-105L177 64c-9.4-9.4-24.6-9.4-33.9 0L24 183c-15.1 15.1-4.4 41 17 41h238c21.4 0 32.1-25.9 17-41z"></path>
                  ) : isAsc ? (
                    <path d="M279 224H41c-21.4 0-32.1-25.9-17-41L143 64c9.4-9.4 24.6-9.4 33.9 0l119 119c15.2 15.1 4.5 41-16.9 41z"></path>
                  ) : (
                    <path d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"></path>
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div
          className={`${
            platform === "optimism" ? "min-w-[550px]" : "min-w-[450px]"
          } divide-y md:text-sm text-xs text-black font-mori font-normal`}
        >
          {data.map((item, index) => (
            <div
              key={index}
              className="flex flex-row gap-2 py-3 px-4 hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="basis-1/5 flex items-center min-w-[50px]">
                {(page - 1) * ITEMS_PER_PAGE + index + 1}
              </div>
              <div
                className="basis-1/2 flex items-center gap-1 min-w-[100px]"
                data-tooltip-id="my-tooltip"
                data-tooltip-content={
                  item.name === null ? item.delegate : item.name
                }
                data-tooltip-place="bottom"
              >
                <AvatarGenerator address={item.delegate || ""} />
                <span className="truncate font-semibold max-w-xs text-xs lg:text-[15px]">
                  {item.name === null
                    ? truncateAddress(item.delegate || "")
                    : item.name}
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
        <span className="text-black ml-1">23 June, 2025</span>
      </div>
    </div>
  );
};

export default OptimismDataTable;