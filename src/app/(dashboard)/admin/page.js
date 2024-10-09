import EventCalendar from "@/app/components/EventCalendar";

const AdminPage = () => {
  return (
    <div className="flex flex-col gap-4 p-4 md:flex-row">
      {/* LEFT */}
      <div className="bg-primary_blue w-full rounded-md text-center text-3xl shadow-md md:w-2/3">
        GRAPH
      </div>

      {/* RIGHT */}
      <div className="flex w-full flex-col gap-8 md:w-1/3">
        <EventCalendar />
      </div>
    </div>
  );
};

export default AdminPage;
