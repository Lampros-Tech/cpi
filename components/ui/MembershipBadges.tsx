import React from "react";
import Image from "next/image";
import { Tooltip } from "react-tooltip";
import { DelegateData } from "@/types";

const MembershipBadges: React.FC<{ item: DelegateData }> = ({ item }) => {
  const badges = [
    {
      key: "ch_member_r2",
      zIndex: 60,
      tooltipmsg: "Citizens' House Member Round 2",
      src: "/assets/images/2.svg",
    },
    {
      key: "ch_member_r3",
      zIndex: 60,
      tooltipmsg: "Citizens' House Member Round 3",
      src: "/assets/images/2.svg",
    },
    {
      key: "ch_member_r4",
      zIndex: 60,
      tooltipmsg: "Citizens' House Member Round 4",
      src: "/assets/images/2.svg",
    },
    {
      key: "ch_member_r5",
      zIndex: 60,
      tooltipmsg: "Citizens' House Member Round 5",
      src: "/assets/images/2.svg",
    },
    {
      key: "ch_member_r6",
      zIndex: 60,
      tooltipmsg: "Citizens' House Member Round 6",
      src: "/assets/images/2.svg",
    },
    {
      key: "ch_member_r7",
      zIndex: 60,
      tooltipmsg: "Citizens' House Member Round 7",
      src: "/assets/images/2.svg",
    },
    {
      key: "gc_member_s3",
      zIndex: 50,
      tooltipmsg: "Grants Council Member Season 3",
      src: "/assets/images/3.svg",
    },
    {
      key: "gc_member_s4",
      zIndex: 50,
      tooltipmsg: "Grants Council Member Season 4",
      src: "/assets/images/3.svg",
    },
    {
      key: "gc_member_s5",
      zIndex: 50,
      tooltipmsg: "Grants Council Member Season 5",
      src: "/assets/images/3.svg",
    },
    {
      key: "gc_member_s6",
      zIndex: 50,
      tooltipmsg: "Grants Council Member Season 6",
      src: "/assets/images/3.svg",
    },
    {
      key: "gc_member_s7",
      zIndex: 50,
      tooltipmsg: "Grants Council Member Season 7",
      src: "/assets/images/3.svg",
    },
    {
      key: "gc_member_mm_s5",
      zIndex: 40,
      tooltipmsg: "Grants Council (Milestone & Metrics Sub-committee) Season 5",
      src: "/assets/images/3.svg",
    },
    {
      key: "gc_member_mm_s6",
      zIndex: 40,
      tooltipmsg: "Grants Council (Milestone & Metrics Sub-committee) Season 6",
      src: "/assets/images/3.svg",
    },
    {
      key: "gc_member_mm_s7",
      zIndex: 40,
      tooltipmsg: "Grants Council (Milestone & Metrics Sub-committee) Season 7",
      src: "/assets/images/3.svg",
    },
    {
      key: "gc_member_op_s7",
      zIndex: 40,
      tooltipmsg: "Grants Council (Operations Sub-committee) Season 7",
      src: "/assets/images/26.png",
    },
    {
      key: "sc_member_s5",
      zIndex: 30,
      tooltipmsg: "Security Council Member Season 5",
      src: "/assets/images/5.svg",
    },
    {
      key: "sc_member_s6",
      zIndex: 30,
      tooltipmsg: "Security Council Member Season 6",
      src: "/assets/images/5.svg",
    },
    {
      key: "sc_member_s7",
      zIndex: 30,
      tooltipmsg: "Security Council Member Season 7",
      src: "/assets/images/5.svg",
    },
    {
      key: "coc_member_s5",
      zIndex: 20,
      tooltipmsg: "Code of Conduct Council Member Season 5",
      src: "/assets/images/6.svg",
    },
    {
      key: "coc_member_s6",
      zIndex: 20,
      tooltipmsg: "Code of Conduct Council Member Season 6",
      src: "/assets/images/6.svg",
    },
    {
      key: "dab_member_s5",
      zIndex: 10,
      tooltipmsg: "Developer Advisory Board Member Season 5",
      src: "/assets/images/7.svg",
    },
    {
      key: "dab_member_s6",
      zIndex: 10,
      tooltipmsg: "Developer Advisory Board Member Season 6",
      src: "/assets/images/7.svg",
    },
    {
      key: "dab_member_s7",
      zIndex: 10,
      tooltipmsg: "Developer Advisory Board Member Season 7",
      src: "/assets/images/7.svg",
    },
    {
      key: "mmc_member_s7",
      zIndex: 10,
      tooltipmsg: "Milestone & Metrics Council Season 7",
      src: "/assets/images/25.png",
    },
  ] as const;

  const activeBadges = badges.filter(
    (badge) => item[badge.key as keyof DelegateData] === 1  );

  if (activeBadges.length === 0) {
    return <div className="text-center">-</div>;
  }

  return (
    <div className="flex flex-row gap-0 items-center justify-center ">
      {activeBadges.map((badge, index) => (
        <Image
          key={badge.key}
          className={`border border-black rounded-full z-[${
            badge.zIndex
          }] cursor-pointer ${index !== 0 ? "-ml-7" : ""} hover:border-2 hover:z-[200]`}
          src={badge.src}
          height={35}
          width={35}
          alt="member icon"
          data-tooltip-id="my-tooltip"
          data-tooltip-content={badge.tooltipmsg}
          data-tooltip-place="right"
        />
      ))}
      <Tooltip id="my-tooltip" />
    </div>
  );
};

export default MembershipBadges;
