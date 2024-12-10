"use client";
import ForceDirectedGraph from "@/components/ForceDirectedGraph";
import Legend from "@/components/ui/Legend";
import { useEffect, useState } from "react";
import { fetchGraphData, prepareGraphData } from "@/lib/fetchGraphData";

const Page = ({ children }) => {
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
    <div className="flex h-[90dvh] flex-col gap-4 px-4 sm:flex-col md:flex-row">
      {/* LEFT */}
      <div className="w-full md:w-1/2">{children}</div>

      {/* RIGHT */}
      <div className="flex w-full rounded-md bg-white text-3xl shadow-md md:w-1/2">
        <div className="relative left-2 top-0 z-10 w-min">
          <Legend />
        </div>
        <ForceDirectedGraph
          nodes={graphData.nodes}
          links={graphData.links}
          page="activity"
        />
      </div>
    </div>
  );
};

export default Page;
