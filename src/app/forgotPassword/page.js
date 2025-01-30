"use client";
import { auth } from "@/lib/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

const Page = () => {
  const router = useRouter();
  const emailRef = useRef(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGoBack = () => {
    router.push("/");
  };

  const handleForgotPassword = async (event) => {
    event.preventDefault();
    setError("");
    setSuccessMessage("");
    setLoading(true);

    const email = emailRef.current.value;

    if (!email) {
      setError("Please enter your email address.");
      setLoading(false);
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccessMessage(
        "Password reset email sent successfully! Please check your inbox.",
      );
    } catch (firebaseError) {
      console.error("Error sending password reset email:", firebaseError);
      setError(
        "Failed to send password reset email. Please ensure your email is correct.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center dark:bg-gray-500 lg:text-xl">
      <div className="mx-4 flex w-full flex-col rounded-md bg-white p-6 text-gray-500 shadow-md md:w-3/5 md:p-8">
        <h1 className="m-8 text-center text-xl font-bold text-primary_purple sm:text-4xl">
          Forgot your password?
        </h1>
        <p className="m-2 ml-1">Please enter your email</p>
        <input
          type="email"
          placeholder="Email Address"
          className="rounded-md border p-2 outline-none dark:bg-gray-300"
          ref={emailRef}
        />
        {error && <p className="mt-2 text-red-500">{error}</p>}{" "}
        {/* Display error message */}
        {successMessage && (
          <p className="mt-2 text-green-500">{successMessage}</p>
        )}{" "}
        {/* Display success message */}
        <div className="flex justify-center gap-4">
          <button
            onClick={handleForgotPassword}
            className="mt-12 w-1/6 rounded-md bg-primary_green p-2 text-white disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Searching..." : "Search"}
            {/* Show "Searching..." when loading */}
          </button>
        </div>
        <div className="mt-3 flex items-center justify-center text-base">
          <p>Return to</p>
          <Link
            onClick={handleGoBack}
            href={"/"}
            className="ml-1 flex cursor-pointer items-center justify-center text-primary_purple hover:underline"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
