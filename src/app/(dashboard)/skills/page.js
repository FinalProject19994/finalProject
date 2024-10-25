import TableHeader from "@/app/components/TableHeader";
import Table from "@/app/components/Table";
import TableSearch from "@/app/components/TableSearch";
import Image from "next/image";

const skills = [
  {
    id: 1,
    skill: "Web Development",
    category: "Development",
  },
  {
    id: 2,
    skill: "Data Analysis",
    category: "Data Science",
  },
  {
    id: 3,
    skill: "Machine Learning",
    category: "Artificial Intelligence",
  },
  {
    id: 4,
    skill: "Public Speaking",
    category: "Communication",
  },
  {
    id: 5,
    skill: "Time Management",
    category: "Productivity",
  },
  {
    id: 6,
    skill: "Teamwork",
    category: "Collaboration",
  },
  {
    id: 7,
    skill: "Problem Solving",
    category: "Logic",
  },
  {
    id: 8,
    skill: "Communication",
    category: "Interpersonal Skills",
  },
  {
    id: 9,
    skill: "Adaptability",
    category: "Personal Skills",
  },
  {
    id: 10,
    skill: "Leadership",
    category: "Management",
  },
  {
    id: 11,
    skill: "Digital Marketing",
    category: "Marketing",
  },
  {
    id: 12,
    skill: "User Experience",
    category: "Design",
  },
  {
    id: 13,
    skill: "Cloud Computing",
    category: "Cloud",
  },
  {
    id: 14,
    skill: "Cybersecurity",
    category: "Security",
  },
  {
    id: 15,
    skill: "Artificial Intelligence",
    category: "Artificial Intelligence",
  },
  {
    id: 16,
    skill: "Data Visualization",
    category: "Data Science",
  },
  {
    id: 17,
    skill: "Computer Vision",
    category: "Artificial Intelligence",
  },
  {
    id: 18,
    skill: "Robotics",
    category: "Artificial Intelligence",
  },
];

const columns = [
  {
    header: "",
    accessor: "",
  },
];

const page = () => {
  const renderRow = (skill) => {
    return (
      <tr
        key={skill.id}
        className="odd:bg-primary_lightblue hover:bg-slate-200"
      >
        <div className="p-4">
          <div className="">{skill.skill}</div>
          <div className="text-xs text-gray-400">{skill.category}</div>
        </div>
      </tr>
    );
  };

  return (
    <div className="flex h-[90dvh] flex-col gap-4 px-4 md:flex-row">
      {/* LEFT */}
      <div className="flex gap-4 rounded-md text-3xl md:w-3/4">
        <div className="h-full w-full rounded-md bg-white shadow-md">
          Nodes and Edges Graph
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex flex-col rounded-md bg-white px-2 shadow-md md:w-1/4">
        {/* HEADER */}
        <div className="m-2 flex items-center justify-center gap-4">
          <h1 className="">All Skills</h1>
          <div className="flex flex-grow items-center gap-2 rounded-full border border-gray-500 bg-white p-2 text-xs text-gray-500 md:flex md:w-auto">
            <Image
              src="/menuIcons/search.png"
              alt="search"
              width={14}
              height={14}
            />
            <input
              type="text"
              placeholder="Search from table..."
              className="bg-transparent outline-none"
            />
          </div>
          <Image
            src="/menuIcons/plus.png"
            className="rounded-full bg-primary_yellow p-2"
            alt="add"
            width={35}
            height={20}
          />
        </div>

        {/* Scrollable activities list */}
        <div className="flex h-[83dvh] flex-col overflow-auto overflow-y-auto pr-2 text-sm">
          {skills.map((skill) => (
            <div
              className="py-3 odd:bg-primary_lightblue hover:bg-slate-200"
              key={skill.id}
            >
              <div className="mx-2 flex flex-col">
                <h1 className="font-semibold text-gray-600">{skill.skill}</h1>
                <span className="text-sm text-gray-400">{skill.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
