"use client";
import { auth, db } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

const Page = () => {
  const router = useRouter();

  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const nameRef = useRef();
  const phoneNumberRef = useRef();

  const [error, setError] = useState("");

  const handleSignUp = async (event) => {
    event.preventDefault();
    setError("");

    // Validation checks (improved):
    if (!nameRef.current?.value) {
      setError("Full name is required.");
      return;
    }

    if (!emailRef.current?.value) {
      setError("Email address is required.");
      return;
    }

    if (passwordRef.current?.value.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (passwordRef.current?.value !== confirmPasswordRef.current?.value) {
      setError("Passwords do not match.");
      return;
    }

    if (!emailRef.current?.value.endsWith("@gmail.com")) {
      // if (!emailRef.current?.value.endsWith("@braude.ac.il")) {
      setError("Email must be from Braude domain.");
      return;
    }

    try {
      // Create user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value,
      );
      const user = userCredential.user;

      // Send email verification
      await sendEmailVerification(user);

      // Save attributes in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: nameRef.current.value,
        phone: phoneNumberRef.current.value,
        email: emailRef.current.value,
        role: "Lecturer",
      });

      alert(
        "Check your email to verify your account, an email has been sent to you.",
      );
      router.push("/");
    } catch (error) {
      console.error("Error creating user:", error.message);
      if (error.code === "auth/email-already-in-use") {
        setError("Email already in use.");
      } else {
        setError("Error creating user. Please try again.");
      }
    }
  };

  const getInputBorderClass = (field) => {
    if (error) {
      switch (field) {
        case "name":
          if (!nameRef.current?.value) {
            return "border-red-500 focus:border-red-700";
          }
          break;
        case "email":
          if (
            !emailRef.current?.value ||
            !emailRef.current?.value.endsWith("@braude.ac.il")
            // !emailRef.current?.value.endsWith("@gmail.com")
          ) {
            return "";
          }
          break;
        case "password":
          if (
            !passwordRef.current?.value ||
            passwordRef.current?.value.length < 6
          ) {
            return "border-red-500 focus:border-red-700";
          }
          break;
        case "confirmPassword":
          if (
            !confirmPasswordRef.current?.value ||
            passwordRef.current?.value !== confirmPasswordRef.current?.value
          ) {
            return "border-red-500 focus:border-red-700";
          }
          break;
      }
    }

    return "border-gray-300 focus:border-primary_purple dark:border-gray-500 dark:focus:border-primary_purple_table_light";
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 dark:bg-gray-800 lg:text-xl">
      <form
        onSubmit={handleSignUp}
        className="mx-4 flex w-full flex-col rounded-md bg-white text-gray-500 shadow-md dark:bg-gray-400 md:w-3/5 md:p-8"
      >
        <h1 className="m-2 mb-16 text-center text-3xl font-bold text-primary_purple dark:text-primary_purple sm:text-4xl">
          Create a new account
        </h1>

        <div className="mx-auto w-full space-y-6 md:w-3/4 lg:w-2/3">
          <h2 className="text-lg font-bold text-gray-500 dark:text-gray-300">
            Personal information
          </h2>

          <div className="flex flex-col gap-4">
            {/* Full name */}
            <input
              type="text"
              placeholder="Full name*"
              className={`rounded-md border p-2 outline-none dark:bg-gray-400 dark:text-gray-700 dark:placeholder-slate-700 ${getInputBorderClass(
                "name",
              )}`}
              ref={nameRef}
            />

            {/* Phone Number */}
            <input
              type="text"
              placeholder="Phone Number"
              className={`rounded-md border p-2 outline-none dark:bg-gray-400 dark:text-gray-700 dark:placeholder-slate-700`}
              ref={phoneNumberRef}
            />
          </div>

          <h2 className="pt-6 text-lg font-bold text-gray-500 dark:text-gray-300">
            Privacy information
          </h2>
          <div className="flex flex-col gap-4">
            {/* Email */}
            <input
              type="email"
              placeholder="Email Address*"
              className={`rounded-md border p-2 outline-none dark:bg-gray-400 dark:text-gray-700 dark:placeholder-slate-700 ${getInputBorderClass(
                "email",
              )}`}
              ref={emailRef}
            />

            {/* Password */}
            <input
              type="password"
              placeholder="Password*"
              className={`rounded-md border p-2 outline-none dark:bg-gray-400 dark:text-gray-700 dark:placeholder-slate-700 ${getInputBorderClass(
                "password",
              )}`}
              ref={passwordRef}
            />

            {/* Confirm Password */}
            <input
              type="password"
              placeholder="Confirm Password*"
              className={`rounded-md border p-2 outline-none dark:bg-gray-400 dark:text-gray-700 dark:placeholder-slate-700 ${getInputBorderClass(
                "confirmPassword",
              )}`}
              ref={confirmPasswordRef}
            />
          </div>
        </div>

        {/* Display error message */}
        {error && <p className="mt-4 text-center text-red-500">{error}</p>}

        <h3 className="mt-4 text-center text-sm text-black">
          * is a required field
        </h3>

        <button
          type="submit"
          className="mt-12 w-1/2 self-center rounded-md bg-primary_green p-2 font-semibold text-white hover:brightness-110 sm:w-1/3 lg:w-1/4"
        >
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
