"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useRef } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const Page = () => {
  const router = useRouter();

  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const phoneNumberRef = useRef();
  // const departmentRef = useRef();
  // const coursesRef = useRef();

  const handleSignUp = async (event) => {
    event.preventDefault();

    // Ensure passwords match before creating the user
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      console.error("Passwords do not match");
      return;
    }

    try {
      // Create the user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value,
      );

      // Get the created user
      const user = userCredential.user;

      // Save attributes in Firestore
      await setDoc(doc(db, "users", user.uid), {
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        phoneNumber: phoneNumberRef.current.value,
        // department: departmentRef.current.value,
        // courses: coursesRef.current.value,
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
        className="mx-4 flex w-full flex-col rounded-md bg-white p-6 text-gray-500 shadow-md md:w-3/5 md:p-8"
      >
        <h1 className="m-2 mb-16 text-center text-3xl font-bold text-primary_purple sm:text-4xl">
          Create a new account
        </h1>

        <div className="mx-auto w-full space-y-6 md:w-3/4 lg:w-2/3">
          <h2 className="text-lg font-bold text-gray-500">
            Personal information
          </h2>

          {/* First Name and Last Name */}
          <div className="flex flex-col gap-3 md:flex-row">
            <input
              type="text"
              placeholder="First Name"
              className="flex-grow rounded-md border p-2 outline-none md:w-1/2"
              ref={firstNameRef}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="flex-grow rounded-md border p-2 outline-none md:w-1/2"
              ref={lastNameRef}
            />
          </div>

          <div className="flex flex-col gap-4">
            {/* Phone Number */}
            <input
              type="text"
              placeholder="Phone Number"
              className="rounded-md border p-2 outline-none"
              ref={phoneNumberRef}
            />

            {/* Department */}
            <select
              selected="select department"
              className="rounded-md border p-2 outline-none"
            >
              <option value="" selected disabled hidden>
                Choose Department
              </option>
              <option value="Software Engineering">Software Engineering</option>
              <option value="Applied Mathematics">Applied Mathematics</option>
            </select>
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
