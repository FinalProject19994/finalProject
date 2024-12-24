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
    <div className="flex h-full flex-col gap-4 px-4 py-4 sm:flex-col md:flex-row">
      {/* LEFT */}
      <div className="w-full md:w-1/2">{children}</div>

      {/* RIGHT */}
      <div className="flex w-full rounded-md bg-white shadow-md md:w-1/2">
        <Legend header="Activities Graph" />
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
