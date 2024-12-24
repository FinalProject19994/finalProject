"use client";
import MultipleSelector from "@/components/ui/MultipleSelector";
import { auth, db } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const Page = () => {
  const [departments, setDepartments] = useState([]);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);

  useEffect(() => {
    const fetchDepartmentsAndCourses = async () => {
      try {
        // Fetch departments
        const departmentSnapshot = await getDocs(collection(db, "departments"));
        const fetchedDepartments = departmentSnapshot.docs.map((doc) => ({
          id: doc.id,
          value: doc.id,
          label: doc.data().title,
        }));
        setDepartments(fetchedDepartments);

        // Fetch courses
        const coursesSnapshot = await getDocs(collection(db, "courses"));
        const fetchedCourses = coursesSnapshot.docs.map((doc) => ({
          id: doc.id,
          value: doc.id,
          label: doc.data().title,
        }));
        setCourses(fetchedCourses);
      } catch (error) {
        console.error("Error fetching departments or courses:", error);
      }
    };

    fetchDepartmentsAndCourses();
  }, []);

  const router = useRouter();

  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const nameRef = useRef();
  const phoneNumberRef = useRef();

  const handleSignUp = async (event) => {
    event.preventDefault();

    // Ensure passwords match before creating the user
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      console.error("Passwords do not match");
      return;
    }

    console.log("Email:", emailRef.current.value);
    console.log("Password:", passwordRef.current.value);
    console.log("Confirm Password:", confirmPasswordRef.current.value);

    try {
      // Create the user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value,
      );

      const user = userCredential.user;

      // Save attributes in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: nameRef.current.value,
        phone: phoneNumberRef.current.value,
        email: emailRef.current.value,
        role: "Lecturer",
        departments: selectedDepartments.map((department) =>
          doc(db, "departments", department.id),
        ),
        courses: selectedCourses.map((course) => doc(db, "courses", course.id)),
      });

      router.push("/homepage");
    } catch (error) {
      console.error("Error creating user:", error.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 lg:text-xl">
      <form
        onSubmit={handleSignUp}
        className="mx-4 flex w-full flex-col rounded-md bg-white text-gray-500 shadow-md md:w-3/5 md:p-8"
      >
        <h1 className="m-2 mb-16 text-center text-3xl font-bold text-primary_purple sm:text-4xl">
          Create a new account
        </h1>

        <div className="mx-auto w-full space-y-6 md:w-3/4 lg:w-2/3">
          <h2 className="text-lg font-bold text-gray-500">
            Personal information
          </h2>

          <div className="flex flex-col gap-4">
            {/* Full name */}
            <input
              type="text"
              placeholder="Full name"
              className="w-full rounded-md border p-2 outline-none"
              ref={nameRef}
            />

            {/* Phone Number */}
            <input
              type="text"
              placeholder="Phone Number"
              className="rounded-md border p-2 outline-none"
              ref={phoneNumberRef}
            />

            {/* Department */}
            <MultipleSelector
              options={departments}
              onSelect={(selected) => setSelectedDepartments(selected)}
              selection="departments"
            />

            {/* Courses */}
            <MultipleSelector
              options={courses}
              onSelect={(selected) => setSelectedCourses(selected)}
              selection="courses"
            />
          </div>

          <h2 className="pt-6 text-lg font-bold text-gray-500">
            Privacy information
          </h2>
          <div className="flex flex-col gap-4">
            {/* Email */}
            <input
              type="email"
              placeholder="Email Address"
              className="rounded-md border p-2 outline-none"
              ref={emailRef}
            />

            {/* Password */}
            <input
              type="password"
              placeholder="Password"
              className="rounded-md border p-2 outline-none"
              ref={passwordRef}
            />

            {/* Confirm Password */}
            <input
              type="password"
              placeholder="Confirm Password"
              className="rounded-md border p-2 outline-none"
              ref={confirmPasswordRef}
            />
          </div>
        </div>

        <button className="mt-16 w-1/2 self-center rounded-md bg-primary_green p-2 font-semibold text-white hover:brightness-110 sm:w-1/3 lg:w-1/4">
          Sign up
        </button>
        <div className="mt-2 flex justify-center">
          <p className="mr-2 text-center">Already have an account?</p>
          <Link href="/" className="text-center text-primary_purple">
            Log in
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Page;
