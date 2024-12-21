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
    <div className="flex flex-col gap-4 overflow-hidden px-4 text-gray-500 md:flex-row">
      {/* LEFT */}
      <div className="flex flex-col gap-4 md:w-4/5">
        {/* Graph (2/3 vertical space) */}
        <div className="relative h-2/3 w-full rounded-md bg-white shadow-md">
          <Legend header="Overview Graph" />
          <ForceDirectedGraph nodes={graphData.nodes} links={graphData.links} />
        </div>

        {/* Chart (1/3 vertical space, Admin only) */}
        <div className="h-1/3 w-full rounded-md bg-white shadow-md">
          <div className="mx-4 mt-2 flex items-center justify-between text-base">
            <h1 className="font-semibold">Usage Stats</h1>
            <select>
              <option>2022</option>
              <option>2023</option>
              <option>2024</option>
            </select>
          </div>
          <Chart />
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex w-full flex-col md:w-1/5">
        <EventCalendar />
      </div>
    </div>
  );
};

export default HomePage;
