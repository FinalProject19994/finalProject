import React from "react";

const page = () => {
  return (
    <form className="mx-4 flex h-[90dvh] max-h-screen flex-col gap-4 rounded-md bg-white p-4 text-gray-500 shadow-md">
      <h1 className="mb-8 text-center text-3xl font-bold text-primary_purple">
        Profile Settings
      </h1>
      <div className="mx-auto w-1/2 lg:w-1/3">
        <h2 className="mb-2 text-lg font-bold text-primary_green">
          Personal Settings
        </h2>
        {/* First Name and Last Name */}
        <div className="my-2 flex justify-between gap-8">
          <div className="flex w-1/2 flex-col text-sm">
            <label className="font-semibold italic">First Name</label>
            <input
              type="text"
              defaultValue="Joy"
              className="rounded-md border p-2 text-gray-700 outline-none"
            />
          </div>
          <div className="flex w-1/2 flex-col text-sm">
            <label className="font-semibold italic">Last Name</label>
            <input
              type="text"
              defaultValue="Simha Oz"
              className="rounded-md border p-2 text-gray-700 outline-none"
            />
          </div>
        </div>

        {/* Phone Number */}
        <div className="my-2 flex flex-col text-sm">
          <label className="font-semibold italic">Phone number</label>
          <input
            type="text"
            defaultValue="054-7777-7777"
            className="rounded-md border p-2 text-gray-700 outline-none"
          />
        </div>

        {/* Department */}
        <div className="my-2 flex flex-col text-sm">
          <label className="font-semibold italic">Department</label>
          <select className="rounded-md border p-2 outline-none">
            <option value="Software Engineering">Software Engineering</option>
            <option value="Applied Mathematics">Applied Mathematics</option>
          </select>
        </div>

        {/* Courses */}
        <div className="my-2 flex flex-col text-sm">
          <label className="font-semibold italic">Courses</label>
          <select className="rounded-md border p-2 outline-none">
            <option value="Computer Networks">Computer Networks</option>
            <option value="Computer graphics">Computer graphics</option>
          </select>
        </div>

        <h2 className="mb-2 mt-8 text-lg font-bold text-primary_green">
          Privacy Settings
        </h2>
        {/* Email */}
        <div className="my-2 flex flex-col text-sm">
          <label className="font-semibold italic">Email</label>
          <input
            type="Email"
            defaultValue="Simha2015@gmail.com"
            className="rounded-md border p-2 text-gray-700 outline-none"
          />
        </div>

        {/* Password */}
        <div className="my-2 flex flex-col text-sm">
          <label className="font-semibold italic">Password</label>
          <input
            type="Password"
            placeholder="Password"
            className="rounded-md border p-2 text-gray-700 outline-none"
          />
        </div>

        {/* Confirm Password */}
        <div className="my-2 flex flex-col text-sm">
          <label className="font-semibold italic">Confirm Password</label>
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
