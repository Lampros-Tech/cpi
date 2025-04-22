import dynamic from "next/dynamic";
import React from "react";
import Skeleton from "react-loading-skeleton";

const DynamicInlineMath = dynamic(
  () => import("react-katex").then((mod) => mod.InlineMath),
  {
    ssr: false,
    loading: () => (
      <span style={{ minHeight: "1.2em", display: "inline-block" }}>
        <Skeleton width={50} inline />
      </span>
    ),
  }
);

interface DynamicKatexProps {
  math: string;
  displayMode?: "inline";
  errorColor?: string;
  renderError?: (error: Error) => React.ReactNode;
}

const DynamicKatex: React.FC<DynamicKatexProps> = ({
  math,
  displayMode = "inline",
  ...rest
}) => {
  if (displayMode === "inline") {
    return <DynamicInlineMath math={math} {...rest} />;
  }
};

export default function HomePage() {
  const formula = String.raw`\sum_{i \in D} V_{i}^2 \quad \text{where} \quad V_{i} = \sum_{j \in \text{HCC}} (V_{j} * I_{j})`;
  return (
    <>
      <DynamicKatex math={formula} displayMode="inline" />
    </>
  );
}
