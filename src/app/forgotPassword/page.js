"use client";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.push("/login");
  };

  const handleForgotPassword = (event) => {
    event.preventDefault();
    alert("Work in progress...");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 lg:text-xl">
      <div className="mx-4 flex w-full flex-col rounded-md bg-white p-6 text-gray-500 shadow-md md:w-3/5 md:p-8">
        <h1 className="m-2 text-center text-3xl font-bold text-primary_purple sm:text-4xl">
          Did you forget your password?😢
        </h1>
        <p className="m-2 ml-1">Please enter your email</p>
        <input
          type="email"
          placeholder="Email Address"
          className="rounded-md border p-2 outline-none"
        />
        <div className="flex justify-center gap-4">
          <button
            onClick={handleGoBack}
            className="mt-8 self-center rounded-md bg-primary_purple p-2 font-semibold text-white hover:brightness-110 sm:w-1/5 lg:w-1/6"
          >
            Cancel
          </button>
          <button
            onSubmit={handleForgotPassword}
            className="mt-8 w-1/2 self-center rounded-md bg-primary_green p-2 font-semibold text-white hover:brightness-110 sm:w-1/3 lg:w-1/4"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
