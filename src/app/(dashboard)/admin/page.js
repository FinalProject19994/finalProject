import EventCalendar from "@/app/components/EventCalendar";

const dummyActivities = [
  {
    id: 1,
    title: "Activity 1",
    description: "This is a dummy activity",
    date: "2023-03-01",
    time: "10:00 AM",
  },
  {
    id: 2,
    title: "Activity 2",
    description: "This is another dummy activity",
    date: "2023-03-05",
    time: "2:00 PM",
  },
  {
    id: 3,
    title: "Activity 3",
    description: "This is a dummy activity",
    date: "2023-03-10",
    time: "11:00 AM",
  },
  {
    id: 4,
    title: "Activity 4",
    description: "This is another dummy activity",
    date: "2023-03-15",
    time: "3:00 PM",
  },
];

const AdminPage = () => {
  return (
    <div className="flex flex-col gap-4 p-4 md:flex-row">
      {/* LEFT */}
      <div className="w-full bg-red-500 lg:w-2/3">LEFT</div>

      {/* RIGHT */}
      <div className="flex w-full flex-col gap-8 lg:w-1/3">
        <EventCalendar />
        <div className="flex flex-col gap-4 text-black">
          {dummyActivities.map((activity) => (
            <div key={activity.id}>
              <div className="flex items-center justify-between">
                <h1>{activity.title}</h1>
                <span>{activity.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
