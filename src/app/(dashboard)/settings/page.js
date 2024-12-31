"use client";
import MultipleSelector from "@/components/ui/MultipleSelector";
import { auth, db } from "@/lib/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

const Settings = () => {
  const [userData, setUserData] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [courses, setCourses] = useState([]);

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

    const fetchDepartments = async () => {
      try {
        const departmentSnapshot = await getDocs(collection(db, "departments"));
        const fetchedDepartments = departmentSnapshot.docs.map((doc) => ({
          id: doc.id,
          value: doc.id,
          label: doc.data().title,
        }));
        setDepartments(fetchedDepartments);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    const fetchCourses = async () => {
      try {
        const courseSnapshot = await getDocs(collection(db, "courses"));
        const fetchedCourses = courseSnapshot.docs.map((doc) => ({
          id: doc.id,
          value: doc.id,
          label: doc.data().title,
        }));
        setCourses(fetchedCourses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchUserData();
    fetchDepartments();
    fetchCourses();
  }, []);

  return (
    <form className="mx-4 my-2 flex h-[98%] max-h-screen flex-col gap-4 rounded-md bg-white p-4 text-gray-500 shadow-md">
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
              placeholder={userData?.name}
              className="rounded-md border p-2 text-gray-700 outline-none"
            />
          </div>
        </div>

        {/* Phone Number */}
        <div className="my-2 flex flex-col text-sm">
          <label className="font-semibold">Phone number</label>
          <input
            type="text"
            placeholder={userData?.phone}
            className="rounded-md border p-2 text-gray-700 outline-none"
          />
        </div>

        <div className="mt-4 flex flex-col gap-4 text-sm">
          <div>
            {/* Department */}
            <label className="font-semibold">Departments</label>
            <MultipleSelector
              options={departments}
              selection="departments"
              // onSelect={(selected) => {
              //   setValue(
              //     "department",
              //     selected.map((department) => department.value),
              //   );
              // }}
            />
          </div>

          <div>
            {/* Courses */}
            <label className="font-semibold">Courses</label>
            <MultipleSelector
              options={courses}
              selection="courses"
              // onSelect={(selected) => {
              //   setValue(
              //     "department",
              //     selected.map((department) => department.value),
              //   );
              // }}
            />
          </div>
        </div>

        <div className="my-8 h-px bg-gray-300" />
        <h2 className="mb-2 mt-8 text-lg font-bold text-gray-600">
          Privacy Settings
        </h2>
        {/* Email */}
        <div className="my-2 flex flex-col text-sm">
          <label className="font-semibold">Email</label>
          <input
            type="Email"
            placeholder={userData?.email}
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

export default Settings;
