"use client";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const handleSignUp = () => {
    router.replace("/homepage");
  };
  return (
    <div className="flex h-screen items-center justify-center bg-slate-100 lg:text-xl">
      <form className="mx-4 flex max-h-screen w-4/5 flex-col gap-4 rounded-md bg-white p-4 text-gray-500 shadow-md lg:w-1/2">
        <h1 className="m-2 text-center text-4xl font-bold text-primary_purple">
          Create a new account
        </h1>
        <div className="mx-auto w-1/2 space-y-4 lg:w-1/3">
          <h2 className="text-lg font-bold text-primary_green underline">
            Personal information
          </h2>
          {/* First Name and Last Name */}
          <div className="flex justify-between gap-8">
            <input
              type="text"
              placeholder="First Name"
              className="rounded-md border p-2 outline-none"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="rounded-md border p-2 outline-none"
            />
          </div>
          <div className="flex flex-col justify-between gap-8">
            {/* Phone Number */}
            <input
              type="text"
              placeholder="Phone Number"
              className="rounded-md border p-2 outline-none"
            />

            {/* Department */}
            <select
              defaultValue="select department"
              className="rounded-md border p-2 outline-none"
            >
              <option value="Software Engineering">Software Engineering</option>
              <option value="Applied Mathematics">Applied Mathematics</option>
            </select>

            {/* Courses */}
            <select className="rounded-md border p-2 outline-none">
              <option value="Computer Networks">Computer Networks</option>
              <option value="Computer graphics">Computer graphics</option>
            </select>
          </div>

          <h2 className="pt-6 text-lg font-bold text-primary_green underline">
            Privacy information
          </h2>
          <div className="flex flex-col justify-between gap-8">
            {/* Email */}
            <input
              type="Email"
              placeholder="Email Address"
              className="rounded-md border p-2 outline-none"
            />

            {/* Password */}
            <input
              type="Password"
              placeholder="Password"
              className="rounded-md border p-2 outline-none"
            />

            {/* Confirm Password */}
            <input
              type="Password"
              placeholder="Confirm Password"
              className="rounded-md border p-2 outline-none"
            />
          </div>
        </div>
        <button
          onClick={handleSignUp}
          className="mt-8 w-1/4 self-center rounded-md bg-primary_purple p-2 font-semibold text-white hover:brightness-110"
        >
          sign up
        </button>
      </form>
    </div>
  );
};

export default page;
