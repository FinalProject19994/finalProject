"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const handleLogIn = () => {
    router.push("/homepage");
  };
  return (
    <div className="flex h-screen bg-slate-100 lg:text-xl">
      <div className="flex w-1/2 flex-col items-center justify-center">
        <h1 className="text-center text-7xl font-bold text-primary_purple lg:text-8xl">
          Core skills
        </h1>
        <p className="text-center text-xl font-bold italic text-primary_green lg:text-2xl">
          Discover skills, unleash the potential
        </p>
        <Image src="/logo.png" alt="signup" width={300} height={300} />
      </div>
      <div className="flex w-1/2 items-center justify-center lg:justify-start">
        <div className="flex w-3/4 flex-col gap-4 rounded-md bg-white p-4 shadow-md lg:w-1/2">
          {/* Email */}
          <input
            type="Email"
            placeholder="Email Address"
            className="rounded-md border p-2 outline-none"
          />

          {/* Password */}
          <input
            type="Password"
            placeholder="Password"
            className="rounded-md border p-2 outline-none"
          />
          <button
            onClick={handleLogIn}
            className="rounded-md bg-primary_purple p-2 font-semibold text-white hover:brightness-110"
          >
            Log in
          </button>
          <Link
            href="#"
            className="text-center font-semibold text-primary_purple hover:underline"
          >
            Forgot Password?
          </Link>
          <div className="h-px w-full bg-gray-300"></div>
          <Link
            href="/signup"
            className="w-2/3 self-center rounded-md bg-primary_green p-2 text-center font-semibold text-white hover:brightness-110"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
