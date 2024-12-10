"use client";
import EventCalendar from "@/components/EventCalendar";
import Chart from "@/components/Chart";
import ForceDirectedGraph from "@/components/ForceDirectedGraph";
// import { nodes, links } from "@/lib/data";
import Legend from "@/components/ui/Legend";
import { useEffect } from "react";
import { fetchGraphData, prepareGraphData } from "@/lib/fetchGraphData";
import { useState } from "react";

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
    <div className="flex h-[90dvh] flex-col gap-4 px-4 text-gray-500 md:flex-row">
      {/* LEFT */}
      <div className="flex flex-col gap-4 text-3xl md:w-4/5">
        <div className="relative h-screen w-full rounded-md bg-white shadow-md md:h-2/3">
          <div className="absolute left-2 top-0 z-10">
            <h2 className="h-fit bg-white text-lg font-semibold">Overview</h2>
            <Legend />
          </div>

          <ForceDirectedGraph nodes={graphData.nodes} links={graphData.links} />
        </div>

        {/* LEFT - BOTTOM (Admin only) */}
        <div className="h-4/5 w-full rounded-md bg-white shadow-md md:h-1/3">
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
