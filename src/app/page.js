"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";

const Page = () => {
  const router = useRouter();

  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const [loginStatus, setLoginStatus] = useState("idle");

  const handleLogIn = async () => {
    setError("");
    setLoginStatus("loading");

    try {
      await signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value,
      );
      setLoginStatus("success");
      router.push("/homepage");
    } catch (err) {
      console.error("Error logging in:", err.message);
      setLoginStatus("error");
      switch (err.code) {
        case "auth/invalid-credential":
          setError("Invalid email or password.");
          break;
        case "auth/user-disabled":
          setError("This account has been disabled.");
          break;
        case "auth/user-not-found":
          setError("User not found");
          break;
        default:
          setError("Login failed :-(");
      }
    }
  };

  const getInputBorderClass = () => {
    if (loginStatus === "error" && error) {
      return "border-red-500 focus:border-red-700";
    }
    return "border-gray-300 focus:border-primary_purple dark:border-gray-500 dark:focus:border-primary_purple_table_light";
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
            className={`rounded-md border p-2 outline-none dark:bg-gray-400 dark:text-gray-700 dark:placeholder-slate-600 ${getInputBorderClass(
              "email",
            )}`}
            ref={emailRef}
          />
          {/* Password */}
          <input
            type="Password"
            placeholder="Password"
            className={`rounded-md border p-2 outline-none dark:bg-gray-400 dark:text-gray-700 dark:placeholder-slate-600 ${getInputBorderClass(
              "password",
            )}`}
            ref={passwordRef}
          />
          <button
            onClick={handleLogIn}
            className="rounded-md bg-primary_purple p-2 font-semibold text-white hover:brightness-110 dark:text-gray-300"
            disabled={loginStatus === "loading"}
          >
            {loginStatus === "loading" ? "Logging in..." : "Log in"}
          </button>
          <Link
            href="/forgotPassword"
            className="text-center text-sm text-primary_purple hover:underline"
          >
            Forgot Password?
          </Link>
          {error && <p className="mt-2 text-center text-red-600">{error}</p>}
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
