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
    id: 4,
    title: "Course 4",
    description: "This is another dummy course",
    date: "2023-03-15",
    time: "3:00 PM",
  },
  {
    id: 4,
    title: "Course 4",
    description: "This is another dummy course",
    date: "2023-03-15",
    time: "3:00 PM",
  },
  {
    id: 4,
    title: "Course 4",
    description: "This is another dummy course",
    date: "2023-03-15",
    time: "3:00 PM",
  },
];

const EventCalendar = () => {
  const [value, onChange] = useState(new Date());

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-md bg-white p-4 shadow-md">
        <Calendar value={value} onChange={onChange} />
      </div>

      <div className="max-h-[55vh] overflow-hidden rounded-md bg-white p-4 shadow-md">
        {/* Activities Heading */}
        <div className="sticky top-0 z-10 bg-white">
          <div className="flex items-center justify-between">
            <h1 className="my-4 text-xl font-semibold">My Courses</h1>
          </div>
        </div>

        {/* Activities */}
        <div className="flex h-full flex-col gap-3 overflow-y-scroll pr-2 text-sm">
          {dummyActivities.map((activity) => (
            <div
              className="odd:border-t-primary_blue even:border-t-primary_yellow rounded-md border-2 border-t-4 border-gray-100 bg-white p-5"
              key={activity.id}
            >
              <div className="flex items-center justify-between">
                <h1 className="font-semibold text-gray-600">
                  {activity.title}
                </h1>
                <span className="text-sm text-gray-400">{activity.time}</span>
              </div>
              <p className="mt-2text-sm text-gray-400">
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
