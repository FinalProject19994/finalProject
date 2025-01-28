"use client";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

const Settings = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(userDocRef);

          if (docSnap.exists()) {
            setUserData(docSnap.data());
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, []);

  return (
    <form className="mx-4 my-2 flex h-[98%] max-h-screen flex-col gap-4 rounded-md bg-white p-4 text-gray-500 shadow-md dark:bg-gray-500">
      <h1 className="mb-8 text-center text-3xl font-bold text-primary_purple dark:text-primary_purple_table">
        Profile Settings
      </h1>
      <div className="mx-auto w-1/2 lg:w-1/3">
        <h2 className="mb-2 text-lg font-bold text-gray-600 dark:text-gray-400">
          Personal Settings
        </h2>
        {/* Full name */}
        <div className="my-2 flex flex-col text-sm">
          <div className="flex flex-col text-sm">
            <label className="font-semibold dark:text-gray-300">
              Full Name
            </label>
            <input
              type="text"
              placeholder={userData?.name}
              className="rounded-md border p-2 outline-none dark:bg-gray-400 dark:text-gray-700 dark:placeholder-slate-700"
            />
          </div>
        </div>

        {/* Phone Number */}
        <div className="my-2 flex flex-col text-sm">
          <label className="font-semibold dark:text-gray-300">
            Phone number
          </label>
          <input
            type="text"
            placeholder={userData?.phone}
            className="rounded-md border p-2 outline-none dark:bg-gray-400 dark:text-gray-700 dark:placeholder-slate-700"
          />
        </div>

        <div className="my-8 h-px bg-gray-300" />
        <h2 className="mb-2 mt-8 text-lg font-bold text-gray-600 dark:text-gray-400">
          Privacy Settings
        </h2>
        {/* Email */}
        <div className="my-2 flex flex-col text-sm">
          <label className="font-semibold dark:text-gray-300">Email</label>
          <input
            type="Email"
            placeholder={userData?.email}
            className="rounded-md border p-2 outline-none dark:bg-gray-400 dark:text-gray-700 dark:placeholder-slate-700"
          />
        </div>

        {/* Password */}
        <div className="my-2 flex flex-col text-sm">
          <label className="font-semibold dark:text-gray-300">Password</label>
          <input
            type="Password"
            placeholder="Password"
            className="rounded-md border p-2 outline-none dark:bg-gray-400 dark:text-gray-700 dark:placeholder-slate-700"
          />
        </div>

        {/* Confirm Password */}
        <div className="my-2 flex flex-col text-sm">
          <label className="font-semibold dark:text-gray-300">
            Confirm Password
          </label>
          <input
            type="Password"
            placeholder="Confirm Password"
            className="rounded-md border p-2 outline-none dark:bg-gray-400 dark:text-gray-700 dark:placeholder-slate-700"
          />
        </div>
      </div>
      <button className="mt-8 w-1/12 self-center rounded-md bg-primary_purple p-2 font-bold text-white hover:bg-purple-500">
        Save
      </button>
    </form>
  );
};

export default Settings;
