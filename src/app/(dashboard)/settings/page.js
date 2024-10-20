import React from "react";

const page = () => {
  return (
    <form className="m-2 max-h-screen rounded-md bg-white p-4">
      <h1 className="text-center text-3xl">Profile Settings</h1>
      <div className="flex flex-col gap-4">
        <div className="flex justify-center gap-4">
          <input
            disabled
            type="text"
            placeholder="First Name"
            className="w-1/3"
          />
          <input
            disabled
            type="text"
            placeholder="Last Name"
            className="w-1/3"
          />
        </div>
        <input disabled type="text" placeholder="Email" />
        <input disabled type="text" placeholder="Password" />
        <input disabled type="text" placeholder="Phone" />
        <input disabled type="text" placeholder="Department" />
      </div>
    </form>
  );
};

export default page;
