"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Page = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.push("/");
  };

  const handleForgotPassword = (event) => {
    event.preventDefault();
    alert("Work in progress...");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 lg:text-xl">
      <div className="mx-4 flex w-full flex-col rounded-md bg-white p-6 text-gray-500 shadow-md md:w-3/5 md:p-8">
        <h1 className="m-8 text-center text-xl font-bold text-primary_purple sm:text-4xl">
          Forgot your password?
        </h1>
        <p className="m-2 ml-1">Please enter your email</p>
        <input
          type="email"
          placeholder="Email Address"
          className="rounded-md border p-2 outline-none"
        />
        <div className="flex justify-center gap-4">
          <button
            onSubmit={handleForgotPassword}
            className="mt-12 w-1/6 rounded-md bg-primary_green p-2 text-white"
          >
            Search
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
