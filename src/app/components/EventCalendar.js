"use client";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import { useState } from "react";

const EventCalendar = () => {
  const [value, onChange] = useState(new Date());

  return (
    <div className="rounded-lg bg-white p-4">
      <Calendar value={value} onChange={onChange} />
    </div>
  );
};

export default EventCalendar;
