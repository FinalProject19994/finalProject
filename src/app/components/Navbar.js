import Image from "next/image";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between p-4">
      {/* Search Bar */}
      <div className="hidden items-center gap-2 rounded-full border border-gray-500 bg-white p-2 text-xs text-gray-500 md:flex">
        <Image
          src="/menuIcons/search.png"
          alt="search"
          width={14}
          height={14}
        />
        <input
          type="text"
          placeholder="Search..."
          className="hidden pr-2 outline-none md:flex"
        />
      </div>

      {/* Avatar and user */}
      <div className="flex items-center justify-end gap-4">
        <div className="flex flex-col text-gray-500">
          <span className="text-black">Joy Simha Oz</span>
          <span className="text-right text-xs leading-3">Admin</span>
        </div>
        <Image
          src="/menuIcons/dog.png"
          width={40}
          height={40}
          alt="profile picture"
          className="rounded-full hover:brightness-90"
        />
      </div>
    </div>
  );
};

export default Navbar;
