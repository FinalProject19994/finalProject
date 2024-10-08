import Image from "next/image";
import Link from "next/link";
import Menu from "../components/Menu";
import Navbar from "../components/Navbar";

import { Oswald } from "next/font/google";

const oswald = Oswald({ subsets: ["latin"] });

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen">
      {/* LEFT */}
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%]">
        <Link
          href="/"
          className="flex items-center justify-center gap-1 lg:justify-start"
        >
          <Image src="/logo.png" priority alt="logo" width={90} height={90} />
          {/* TODO: Change the font to Oswald */}
          <span className="font-oswald hidden text-gray-500 lg:block">
            Core Skills Hub
          </span>
        </Link>
        <Menu />
      </div>
      {/* RIGHT */}
      <div className="w-[86%] overflow-scroll bg-[#F7F8FA] md:w-[92%] lg:w-[84%] xl:w-[86%]">
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
