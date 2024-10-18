"use client";
import EventCalendar from "@/app/components/EventCalendar";
import SunburstChart from "@/app/components/SunburstChart";

const AdminPage = () => {
  return (
    // fix width for mobile view
    <div className="flex flex-col gap-4 p-4 text-gray-500 md:flex-row">
      {/* LEFT */}
      <div className="flex flex-col gap-4 text-3xl md:w-3/4 md:flex-row">
        {/* LEFT - LEFT */}
        <div className="flex w-[43%] flex-col gap-4">
          {/* LEFT - LEFT - TOP */}
          <div className="flex-grow rounded-md bg-primary_blue shadow-md">
            Core skills - sunburst
          </div>
          {/* LEFT - LEFT - BOTTOM */}
          <div className="flex-grow rounded-md bg-primary_orange shadow-md">
            Activities - bar chart
          </div>
        </div>
        {/* LEFT - RIGHT */}
        <div className="w-[57%] flex-grow rounded-md bg-primary_yellow shadow-md">
          Graph - nodes and edges
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex w-full flex-col gap-8 md:w-1/4">
        <EventCalendar />
      </div>
    </div>
  );
};

export default AdminPage;
