import Image from "next/image";
import Link from "next/link";
import Menu from "../components/Menu";
import Navbar from "../components/Navbar";

// TODO: Fix the font
// import { Oswald } from "next/font/google";

// const oswald = Oswald({ subsets: ["latin"] });

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen">
      {/* LEFT */}
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[10%]">
        <Link
          href="/"
          className="flex items-center justify-center lg:justify-start"
        >
          <Image src="/logo.png" priority alt="logo" width={60} height={60} />
          <span
            className="hidden text-start font-oswald text-lg text-gray-500 lg:block"
            style={{ marginLeft: "auto", marginRight: "auto" }}
          >
            Core Skills
          </span>
        </Link>
        <Menu />
      </div>
      {/* RIGHT */}
      <div className="w-[86%] overflow-auto bg-[#F7F8FA] md:w-[92%] lg:w-[84%] xl:w-[90%]">
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
