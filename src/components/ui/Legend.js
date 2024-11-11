import React from "react";

const Legend = () => {
  return (
    <div className="absolute left-2 top-10 bg-white">
      <div className="flex items-center gap-2 text-sm">
        <div className="h-2 w-2 bg-primary_green"></div>
        <p>Skills</p>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <div className="h-2 w-2 bg-primary_purple_table"></div>
        <p>Courses</p>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <div className="h-2 w-2 bg-primary_yellow"></div>
        <p>Activities</p>
      </div>
    </div>
  );
};

export default Legend;
