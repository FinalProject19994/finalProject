import EventCalendar from "@/app/components/EventCalendar";

const AdminPage = () => {
  return (
    <div className="flex flex-col gap-4 p-4 text-gray-500 md:flex-row">
      {/* LEFT */}
      <div className="w-full rounded-md bg-primary_blue text-center text-3xl shadow-md md:w-2/3">
        GRAPH (WIP)
      </div>

      {/* RIGHT */}
      <div className="flex w-full flex-col gap-8 md:w-1/3">
        <EventCalendar />
      </div>
    </div>
  );
};

export default AdminPage;
