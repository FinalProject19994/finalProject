import ActivitesGraph from "./ActivitiesGraph";

const Page = ({ children }) => {
  return (
    <div className="my-2 flex h-[98%] flex-col gap-4 px-4 md:flex-row">
      {/* LEFT */}
      <div className="h-[98%] w-full md:w-1/2">{children}</div>

      {/* RIGHT */}
      <div className="flex h-full rounded-md bg-white shadow-md md:w-1/2">
        <ActivitesGraph />
      </div>
    </div>
  );
};

export default Page;
