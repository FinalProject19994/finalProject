"use client";
import EventCalendar from "@/app/components/EventCalendar";

const HomePage = () => {
  return (
    <div className="flex flex-col gap-4 p-4 text-gray-500 md:flex-row">
      {/* LEFT */}
      <div className="flex flex-col gap-4 text-3xl md:w-3/4">
        <div className="h-2/3 w-full rounded-md bg-white shadow-md">Graph</div>
        <div className="h-1/3 w-full rounded-md bg-white shadow-md">
          Bar chart
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex w-full flex-col gap-8 md:w-1/4">
        <EventCalendar />
      </div>
    </div>
  );
};

export default HomePage;
