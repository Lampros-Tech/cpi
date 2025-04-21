import dynamic from "next/dynamic";
import LazyLoadChart from "../common/LazyLoadChart";

const CPIChartofDAOs = dynamic(() => import('../common/CPIChartofDAOs'), { ssr: false });
const LineGraph = dynamic(() => import('../common/LineGraph'), { ssr: false });
const CPIChartForOP = dynamic(() => import('../common/CPIChartForOp'), { ssr: false });

const FeaturedDAOChart: React.FC = () => {
    return <>
        <LazyLoadChart placeholderHeight="800px"> {/* Adjust height */}
            <CPIChartofDAOs />
        </LazyLoadChart>
        <LazyLoadChart placeholderHeight="800px"> {/* Adjust height */}
            <LineGraph />
        </LazyLoadChart>
        <LazyLoadChart placeholderHeight="800px"> {/* Adjust height */}
            <CPIChartForOP />
        </LazyLoadChart>
    </>
}

export default FeaturedDAOChart;