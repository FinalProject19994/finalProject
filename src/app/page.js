"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";

const Page = () => {
  const router = useRouter();

  const emailRef = useRef();
  const passwordRef = useRef();

  // TODO: add login errors
  // TODO: add login validation
  const handleLogIn = () => {
    signInWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value,
    )
      .then(() => router.push("/homepage"))
      .catch((error) => {
        console.error("Error logging in:", error.message);
      });
  };
  return (
    <div className="flex h-screen bg-slate-100 dark:bg-gray-800 lg:text-xl">
      <div className="flex w-1/2 flex-col items-center justify-center">
        <h1 className="text-center text-7xl font-bold text-primary_purple dark:text-primary_purple_table lg:text-8xl">
          Core skills
        </h1>
        <p className="text-primary_ text-center text-xl font-bold italic text-gray-500 dark:text-gray-300 lg:text-2xl">
          Discover skills, unleash the potential
        </p>
        <Image src="/logo.png" alt="signup" width={400} height={400} />
      </div>

      <div className="flex w-1/2 items-center justify-center lg:justify-start">
        <div className="flex w-3/4 flex-col gap-4 rounded-md bg-white p-4 shadow-md dark:bg-gray-400 lg:w-1/2">
          {/* Email */}
          <input
            type="Email"
            placeholder="Email Address"
            className="rounded-md border p-2 outline-none dark:bg-gray-400 dark:text-gray-700 dark:placeholder-slate-700"
            ref={emailRef}
          />
          {/* Password */}
          <input
            type="Password"
            placeholder="Password"
            className="rounded-md border p-2 outline-none dark:bg-gray-400 dark:text-gray-700 dark:placeholder-slate-700"
            ref={passwordRef}
          />
          <button
            onClick={handleLogIn}
            className="rounded-md bg-primary_purple p-2 font-semibold text-white hover:brightness-110 dark:text-gray-300"
          >
            Log in
          </button>
          <Link
            href="/forgotPassword"
            className="text-center text-sm text-primary_purple hover:underline"
          >
            Forgot Password?
          </Link>
          <div className="h-px w-full bg-gray-300 dark:bg-gray-700" />
          <div className="flex justify-center">
            <p className="text-[16px] text-gray-500">
              Don&apos;t have an account?
            </p>
            <span className="text-[19px]">
              <Link
                className="ml-1 text-primary_purple hover:underline"
                href="/signup"
              >
                Sign up
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
