"use client";
import EventCalendar from "@/app/components/EventCalendar";
import Chart from "@/app/components/Chart";

const HomePage = () => {
  return (
    <div className="flex h-[90dvh] flex-col gap-4 px-4 text-gray-500 md:flex-row">
      {/* LEFT */}
      <div className="flex flex-col gap-4 text-3xl md:w-3/4">
        <div className="h-2/3 w-full rounded-md bg-white shadow-md">Graph</div>

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
