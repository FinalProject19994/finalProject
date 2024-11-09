"use client";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import { useState } from "react";

const dummyActivities = [
  {
    id: 1,
    title: "Course 1",
    description: "This is a dummy course",
    date: "2023-03-01",
    time: "10:00 AM",
  },
  {
    id: 2,
    title: "Course 2",
    description: "This is another dummy course",
    date: "2023-03-05",
    time: "2:00 PM",
  },
  {
    id: 3,
    title: "Course 3",
    description: "This is a dummy course",
    date: "2023-03-10",
    time: "11:00 AM",
  },
  {
    id: 4,
    title: "Course 4",
    description: "This is another dummy course",
    date: "2023-03-15",
    time: "3:00 PM",
  },
  {
    id: 5,
    title: "Course 4",
    description: "This is another dummy course",
    date: "2023-03-15",
    time: "3:00 PM",
  },
  {
    id: 6,
    title: "Course 4",
    description: "This is another dummy course",
    date: "2023-03-15",
    time: "3:00 PM",
  },
  {
    id: 7,
    title: "Course 4",
    description: "This is another dummy course",
    date: "2023-03-15",
    time: "3:00 PM",
  },
];

const EventCalendar = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className="flex h-full flex-col gap-4">
      {/* Calendar component taking natural space */}
      <div className="rounded-md bg-white p-4 shadow-md">
        <Calendar value={date} onChange={setDate} />
      </div>

      {/* Activities list taking remaining space and scrollable if needed */}
      <div className="flex h-[calc(100vh-27rem)] flex-grow flex-col overflow-hidden rounded-md bg-white p-4 shadow-md">
        {/* Activities Heading */}
        <div className="sticky top-0 z-10 bg-white">
          <div className="flex items-center justify-between">
            <h1 className="my-4 text-xl font-semibold">My Courses</h1>
          </div>
        </div>

        {/* Scrollable activities list */}
        <div className="flex flex-col gap-3 overflow-y-auto pr-2 text-sm">
          {dummyActivities.map((activity) => (
            <div
              className="rounded-md border-2 border-t-4 border-gray-100 bg-white p-5 odd:border-t-primary_green even:border-t-primary_purple_table"
              key={activity.id}
            >
              <div className="flex items-center justify-between">
                <h1 className="font-semibold text-gray-600">
                  {activity.title}
                </h1>
                <span className="text-sm text-gray-400">{activity.time}</span>
              </div>
              <p className="mt-2 text-sm text-gray-400">
                {activity.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventCalendar;
