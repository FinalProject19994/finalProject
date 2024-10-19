import Image from "next/image";
import Table from "@/app/components/Table";
import TableHeader from "@/app/components/TableHeader";

const questionnaires = [
  {
    questionnaireID: 1,
    course: "Computing for Business",
    department: "Computer Science",
    composer: "John Smith",
    skills: ["Communication", "Teamwork"],
  },
  {
    questionnaireID: 2,
    course: "Data Mining",
    department: "Mathematics",
    composer: "Bob Johnson",
    skills: ["Problem Solving", "Time Management"],
  },
  {
    questionnaireID: 3,
    course: "Computational Biology",
    department: "Biology",
    composer: "Jane Doe",
    skills: ["Collaboration", "Adaptability"],
  },
  {
    questionnaireID: 4,
    course: "Computer Networks",
    department: "Computer Science",
    composer: "Alice Brown",
    skills: ["Leadership", "Creativity"],
  },
  {
    questionnaireID: 5,
    course: "Mathematics",
    department: "Mathematics",
    composer: "Bob Johnson",
    skills: ["Critical Thinking", "Attention to Detail"],
  },
  {
    questionnaireID: 6,
    course: "Statistics",
    department: "Mathematics",
    composer: "John Smith",
    skills: ["Data Analysis", "Interpersonal Skills"],
  },
  {
    questionnaireID: 7,
    course: "Computer Vision",
    department: "Computer Science",
    composer: "Jane Doe",
    skills: ["Public Speaking", "Project Management"],
  },
  {
    questionnaireID: 8,
    course: "Operating Systems",
    department: "Computer Science",
    composer: "Alice Brown",
    skills: ["Research", "Organization"],
  },
  {
    questionnaireID: 9,
    course: "Astrophysics",
    department: "Physics",
    composer: "Bob Johnson",
    skills: ["Problem Solving", "Time Management"],
  },
  {
    questionnaireID: 10,
    course: "Organic Chemistry",
    department: "Chemistry",
    composer: "John Smith",
    skills: ["Critical Thinking", "Attention to Detail"],
  },
  {
    questionnaireID: 11,
    course: "Quantum Computing",
    department: "Physics",
    composer: "Jane Doe",
    skills: ["Collaboration", "Adaptability"],
  },
  {
    questionnaireID: 12,
    course: "Artificial Intelligence",
    department: "Computer Science",
    composer: "Alice Brown",
    skills: ["Leadership", "Creativity"],
  },
  {
    questionnaireID: 13,
    course: "Data Analysis",
    department: "Mathematics",
    composer: "Bob Johnson",
    skills: ["Data Analysis", "Interpersonal Skills"],
  },
  {
    questionnaireID: 14,
    course: "Database Management",
    department: "Computer Science",
    composer: "John Smith",
    skills: ["Communication", "Teamwork"],
  },
  {
    questionnaireID: 15,
    course: "Web Development",
    department: "Computer Science",
    composer: "Jane Doe",
    skills: ["Public Speaking", "Project Management"],
  },
  {
    questionnaireID: 16,
    course: "Machine Learning",
    department: "Computer Science",
    composer: "Bob Johnson",
    skills: ["Problem Solving", "Time Management"],
  },
  {
    questionnaireID: 17,
    course: "Computational Physics",
    department: "Physics",
    composer: "John Smith",
    skills: ["Critical Thinking", "Attention to Detail"],
  },
  {
    questionnaireID: 18,
    course: "Computational Biology",
    department: "Biology",
    composer: "Jane Doe",
    skills: ["Collaboration", "Adaptability"],
  },
  {
    questionnaireID: 19,
    course: "Computer Networks",
    department: "Computer Science",
    composer: "Alice Brown",
    skills: ["Leadership", "Creativity"],
  },
  {
    questionnaireID: 20,
    course: "Statistics",
    department: "Mathematics",
    composer: "Bob Johnson",
    skills: ["Data Analysis", "Interpersonal Skills"],
  },
];

const columns = [
  {
    header: "Code",
    accessor: "code",
    className: "hidden md:table-cell",
  },
  {
    header: "Course",
    accessor: "course",
    className: "hidden md:table-cell",
  },
  {
    header: "Department",
    accessor: "department",
    className: "hidden md:table-cell",
  },
  {
    header: "Skills",
    accessor: "skills",
    className: "hidden md:table-cell",
  },
  {
    header: "Composer",
    accessor: "composer",
    className: "hidden md:table-cell",
  },
  {
    header: "",
    accessor: "Edit",
    className: "hidden md:table-cell",
  },
];

const Questionnaires = () => {
  const renderRow = (questionnaire) => {
    return (
      <tr
        key={questionnaire.id}
        className="text-sm odd:bg-primary_lightblue hover:bg-slate-200"
      >
        {/* Flex container for data and button */}
        <td className="flex w-full items-center justify-between p-4">
          {questionnaire.questionnaireID}
          {/* Data content on the left */}
          <div className="flex flex-col gap-2 md:flex-row md:items-center">
            {/* <h3 className="font-semibold">{questionnaire.course}</h3> */}
            <p className="text-xs text-gray-500 md:hidden">
              {questionnaire.department} {questionnaire.skills}
            </p>
          </div>
        </td>

        <td className="hidden lg:table-cell">{questionnaire.course}</td>
        <td className="hidden md:table-cell">{questionnaire.department}</td>
        <td className="hidden md:table-cell">
          {questionnaire.skills.join(", ")}
        </td>
        <td className="hidden md:table-cell">{questionnaire.composer}</td>

        {/* Edit button */}
        <td className="align-bottom md:align-middle">
          <button className="mb-2 mr-1 mt-auto rounded-full p-3 hover:bg-primary_yellow md:mb-0 md:mt-0">
            <Image
              src="/menuIcons/edit.png"
              alt={"Edit"}
              width={20}
              height={20}
            />
          </button>
        </td>
      </tr>
    );
  };

  return (
    <div className="m-4 mt-0 h-[90dvh] flex-1 rounded-md bg-white p-4">
      <TableHeader title={"Surveys"} />

      <div className="h-[80dvh] overflow-auto rounded-lg">
        <Table columns={columns} renderRow={renderRow} data={questionnaires} />
        {/* <Pagination /> */}
      </div>
    </div>
  );
};

export default Questionnaires;
