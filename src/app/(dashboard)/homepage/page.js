"use client";
import ForceDirectedGraph from "@/components/ForceDirectedGraph";
import GraphInfo from "@/components/GraphInfo";
import Legend from "@/components/ui/Legend";
import { fetchGraphData, prepareGraphData } from "@/lib/fetchGraphData";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });

  useEffect(() => {
    const fetchData = async () => {
      const rawData = await fetchGraphData();
      const processedData = prepareGraphData(rawData);
      setGraphData(processedData);
    };

    fetchData();
  }, []);

  return (
    <div className="my-2 ml-4 flex h-[98%] flex-col text-gray-500 md:flex-row">
      {/* LEFT */}
      <div className="flex w-full flex-col gap-2">
        {/* LEFT - UP */}
        <div className="flex h-full w-[99%] rounded-md bg-white shadow-md dark:bg-gray-500">
          <Legend header="Overview" />
          <div className="relative left-40 top-4">
            <GraphInfo />
          </div>
          <ForceDirectedGraph nodes={graphData.nodes} links={graphData.links} />
        </div>
        {/* LEFT - DOWN */}
        {/* <div className="h-1/3 w-full rounded-md bg-white shadow-md dark:bg-gray-500 dark:text-gray-300">
          <Chart />
        </div> */}
      </div>

      {/* RIGHT */}
      {/* <div className="md:w-1/5">
        <EventCalendar />
      </div> */}
    </div>
  );
};

export default HomePage;
