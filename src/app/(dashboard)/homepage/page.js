"use client";
import Chart from "@/components/Chart";
import EventCalendar from "@/components/EventCalendar";
import ForceDirectedGraph from "@/components/ForceDirectedGraph";
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
    <div className="ml-4 flex h-screen flex-col text-gray-500 md:flex-row">
      {/* LEFT */}
      <div className="flex w-full flex-col gap-2">
        {/* LEFT - UP */}
        <div className="flex h-2/3 rounded-md bg-white shadow-md">
          <Legend header="Overview" />
          <ForceDirectedGraph nodes={graphData.nodes} links={graphData.links} />
        </div>
        {/* LEFT - DOWN */}
        <div className="h-1/3 w-full rounded-md bg-white shadow-md">
          <Chart />
        </div>
      </div>

      {/* RIGHT */}
      <div className="md:w-1/5">
        <EventCalendar />
      </div>
    </div>
  );
};

export default HomePage;
