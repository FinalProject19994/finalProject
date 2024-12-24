import Image from "next/image";
import Link from "next/link";
import Menu from "../../components/Menu";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex">
      {/* LEFT - MENU */}
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[10%]">
        <Link
          href="/homepage"
          className="flex items-center justify-center lg:justify-start"
        >
          <Image src="/logo.png" priority alt="logo" width={60} height={60} />
          <span className="hidden text-lg text-gray-500 lg:block">
            Core Skills
          </span>
        </Link>
        <Menu />
      </div>

      {/* RIGHT - MAIN SECTION */}
      <div className="w-[86%] bg-[#efeff0] md:w-[92%] lg:w-[84%] xl:w-[90%]">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
