"use client";
import EventCalendar from "@/app/components/EventCalendar";
import Chart from "@/app/components/Chart";
import SigmaGraph from "@/app/components/SigmaGraph";
import ForceDirectedGraph from "@/app/components/ForceDirectedGraph";
import { nodes, links } from "@/lib/dummyData";

const HomePage = () => {
  return (
    <div className="flex h-[90dvh] flex-col gap-4 px-4 text-gray-500 md:flex-row">
      {/* LEFT */}
      <div className="flex flex-col gap-4 text-3xl md:w-3/4">
        <div className="relative h-2/3 w-full rounded-md bg-white shadow-md">
          <div className="absolute left-2 top-0 z-10">
            <h2 className="h-fit bg-white text-lg font-semibold">Overview</h2>

            {/* LEGEND */}
            <div className="absolute left-2 top-10 bg-white">
              <div className="flex items-center gap-2 text-sm">
                <div className="h-2 w-2 bg-primary_green"></div>
                <p>Skills</p>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="h-2 w-2 bg-primary_yellow"></div>
                <p>Courses</p>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="h-2 w-2 bg-primary_purple_table"></div>
                <p>Activities</p>
              </div>
            </div>
          </div>

          <ForceDirectedGraph nodes={nodes} links={links} />
          {/* <SigmaGraph /> */}
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
      <div className="flex w-full flex-col md:w-1/4">
        <EventCalendar />
      </div>
    </div>
  );
};

export default HomePage;
