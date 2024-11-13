import MultipleSelector from "@/components/ui/MultipleSelector";

const page = () => {
  return (
    <form className="mx-4 flex h-[90dvh] max-h-screen flex-col gap-4 rounded-md bg-white p-4 text-gray-500 shadow-md">
      <h1 className="mb-8 text-center text-3xl font-bold text-primary_purple">
        Profile Settings
      </h1>
      <div className="mx-auto w-1/2 lg:w-1/3">
        <h2 className="mb-2 text-lg font-bold text-gray-600">
          Personal Settings
        </h2>
        {/* Full name */}
        <div className="my-2 flex flex-col text-sm">
          <div className="flex flex-col text-sm">
            <label className="font-semibold">Full Name</label>
            <input
              type="text"
              defaultValue="Joy Simha Oz"
              className="rounded-md border p-2 text-gray-700 outline-none"
            />
          </div>
        </div>

        {/* Phone Number */}
        <div className="my-2 flex flex-col text-sm">
          <label className="font-semibold">Phone number</label>
          <input
            type="text"
            defaultValue="054-7777-7777"
            className="rounded-md border p-2 text-gray-700 outline-none"
          />
        </div>

        <div className="mt-4 flex flex-col gap-4 text-sm">
          <div>
            {/* Department */}
            <label className="font-semibold">Department</label>
            <MultipleSelector
              options={[
                { id: 1, label: "Aerospace Engineering" },
                { id: 2, label: "Biological Engineering" },
                { id: 3, label: "Chemical Engineering" },
                { id: 4, label: "Civil Engineering" },
                { id: 5, label: "Computer Science and Engineering" },
                { id: 6, label: "Electrical Engineering" },
                { id: 7, label: "Environmental Engineering" },
                { id: 8, label: "Industrial Engineering" },
                { id: 9, label: "Materials Science and Engineering" },
                { id: 10, label: "Mechanical Engineering" },
              ]}
            />
          </div>

          <div>
            {/* Courses */}
            <label className="font-semibold">Courses</label>
            <MultipleSelector
              options={[
                { id: 1, label: "Computing for Business" },
                { id: 2, label: "Data Mining" },
                { id: 3, label: "Computational Biology" },
                { id: 4, label: "Computer Networks" },
                { id: 5, label: "Mathematics" },
                { id: 6, label: "Statistics" },
                { id: 7, label: "Computer Vision" },
              ]}
            />
          </div>
        </div>

        <h2 className="mb-2 mt-8 text-lg font-bold text-gray-600">
          Privacy Settings
        </h2>
        {/* Email */}
        <div className="my-2 flex flex-col text-sm">
          <label className="font-semibold">Email</label>
          <input
            type="Email"
            defaultValue="Simha2015@gmail.com"
            className="rounded-md border p-2 text-gray-700 outline-none"
          />
        </div>

        {/* Password */}
        <div className="my-2 flex flex-col text-sm">
          <label className="font-semibold">Password</label>
          <input
            type="Password"
            placeholder="Password"
            className="rounded-md border p-2 text-gray-700 outline-none"
          />
        </div>

        {/* Confirm Password */}
        <div className="my-2 flex flex-col text-sm">
          <label className="font-semibold">Confirm Password</label>
          <input
            type="Password"
            placeholder="Confirm Password"
            className="rounded-md border p-2 text-gray-700 outline-none"
          />
        </div>
      </div>
      <button className="mt-8 w-1/12 self-center rounded-md bg-primary_purple p-2 font-bold text-white hover:bg-purple-500">
        Save
      </button>
    </form>
  );
};

export default page;
