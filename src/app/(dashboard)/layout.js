"use client";
import Image from "next/image";
import Link from "next/link";
import Menu from "../../components/Menu";
import Loader from "@/components/ui/Loader";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SelectedActivityIdProvider } from "@/context/ActivitiesContext"; // Import the provider
import { SelectedCourseIdProvider } from "@/context/CoursesContext";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Revert when in production
      const isDevelopment = process.env.NODE_ENV === "development";
      if (user && (user.emailVerified || isDevelopment)) {
        setUser(user);
        setLoading(false);
      } else {
        router.push("/");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router, user]);

  if (loading || !user) {
    return <Loader />;
  }

  return (
    <SelectedActivityIdProvider>
      <SelectedCourseIdProvider>
        <div className="flex h-screen">
          {/* LEFT - MENU */}
          <div className="w-[14%] dark:bg-gray-700 md:w-[8%] lg:w-[16%] xl:w-[10%]">
            <Link
              href="/homepage"
              className="flex items-center justify-center lg:justify-start"
            >
              <Image
                src="/logo.png"
                priority
                alt="logo"
                width={60}
                height={60}
              />
              <span className="hidden text-lg text-gray-500 dark:text-gray-300 lg:block">
                Core Skills
              </span>
            </Link>
            <Menu />
          </div>

          {/* RIGHT - MAIN SECTION */}
          <div className="w-[86%] bg-[#efeff0] dark:bg-gray-600 md:w-[92%] lg:w-[84%] xl:w-[90%]">
            {children}
          </div>
        </div>
      </SelectedCourseIdProvider>
    </SelectedActivityIdProvider>
  );
}
