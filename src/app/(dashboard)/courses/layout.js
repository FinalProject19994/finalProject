import CoursesGraph from "./CoursesGraph";
import { SelectedCourseIdProvider } from "@/context/CoursesContext";

export const metadata = {
  title: "Courses",
};

const Page = ({ children }) => {
  return (
    <SelectedCourseIdProvider>
      <div className="my-2 flex h-[98%] flex-col gap-4 px-4 md:flex-row">
        {/* LEFT */}
        <div className="h-[98%] w-full md:w-[60%]">{children}</div>

        {/* RIGHT */}
        <div className="flex h-full rounded-md bg-white shadow-md dark:bg-gray-500 md:w-[40%]">
          <CoursesGraph />
        </div>
      </div>
    </SelectedCourseIdProvider>
  );
};

export default Page;
