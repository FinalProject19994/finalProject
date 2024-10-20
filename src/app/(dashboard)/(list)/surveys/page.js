import Image from "next/image";
import Table from "@/app/components/Table";
import TableHeader from "@/app/components/TableHeader";

const questionnaires = [
  {
    questionnaireID: "CS101-JS1",
    course: "Computing for Business",
    department: "Computer Science",
    composer: "John Smith",
    skills: ["Communication", "Teamwork"],
    creationDate: "2023-10-01",
  },
  {
    questionnaireID: "MTH205-BJ2",
    course: "Data Mining",
    department: "Mathematics",
    composer: "Bob Johnson",
    skills: ["Problem Solving", "Time Management"],
    creationDate: "2023-10-02",
  },
  {
    questionnaireID: "BIO301-JD3",
    course: "Computational Biology",
    department: "Biology",
    composer: "Jane Doe",
    skills: ["Collaboration", "Adaptability"],
    creationDate: "2023-10-03",
  },
  {
    questionnaireID: "CS202-AB4",
    course: "Computer Networks",
    department: "Computer Science",
    composer: "Alice Brown",
    skills: ["Leadership", "Creativity"],
    creationDate: "2023-10-04",
  },
  {
    questionnaireID: "MTH101-BJ5",
    course: "Mathematics",
    department: "Mathematics",
    composer: "Bob Johnson",
    skills: ["Critical Thinking", "Attention to Detail"],
    creationDate: "2023-10-05",
  },
  {
    questionnaireID: "MTH201-JS6",
    course: "Statistics",
    department: "Mathematics",
    composer: "John Smith",
    skills: ["Data Analysis", "Interpersonal Skills"],
    creationDate: "2023-10-06",
  },
  {
    questionnaireID: "CS301-JD7",
    course: "Computer Vision",
    department: "Computer Science",
    composer: "Jane Doe",
    skills: ["Public Speaking", "Project Management"],
    creationDate: "2023-10-07",
  },
  {
    questionnaireID: "CS306-AB8",
    course: "Operating Systems",
    department: "Computer Science",
    composer: "Alice Brown",
    skills: ["Research", "Organization"],
    creationDate: "2023-10-08",
  },
  {
    questionnaireID: "PHY402-BJ9",
    course: "Astrophysics",
    department: "Physics",
    composer: "Bob Johnson",
    skills: ["Problem Solving", "Time Management"],
    creationDate: "2023-10-09",
  },
  {
    questionnaireID: "CHEM301-JS10",
    course: "Organic Chemistry",
    department: "Chemistry",
    composer: "John Smith",
    skills: ["Critical Thinking", "Attention to Detail"],
    creationDate: "2023-10-10",
  },
  {
    questionnaireID: "PHY401-JD11",
    course: "Quantum Computing",
    department: "Physics",
    composer: "Jane Doe",
    skills: ["Collaboration", "Adaptability"],
    creationDate: "2023-10-11",
  },
  {
    questionnaireID: "CS304-AB12",
    course: "Artificial Intelligence",
    department: "Computer Science",
    composer: "Alice Brown",
    skills: ["Leadership", "Creativity"],
    creationDate: "2023-10-12",
  },
  {
    questionnaireID: "MTH202-BJ13",
    course: "Data Analysis",
    department: "Mathematics",
    composer: "Bob Johnson",
    skills: ["Data Analysis", "Interpersonal Skills"],
    creationDate: "2023-10-13",
  },
  {
    questionnaireID: "CS305-JS14",
    course: "Database Management",
    department: "Computer Science",
    composer: "John Smith",
    skills: ["Communication", "Teamwork"],
    creationDate: "2023-10-14",
  },
  {
    questionnaireID: "CS302-JD15",
    course: "Web Development",
    department: "Computer Science",
    composer: "Jane Doe",
    skills: ["Public Speaking", "Project Management"],
    creationDate: "2023-10-15",
  },
  {
    questionnaireID: "CS303-BJ16",
    course: "Machine Learning",
    department: "Computer Science",
    composer: "Bob Johnson",
    skills: ["Problem Solving", "Time Management"],
    creationDate: "2023-10-16",
  },
  {
    questionnaireID: "PHY403-JS17",
    course: "Computational Physics",
    department: "Physics",
    composer: "John Smith",
    skills: ["Critical Thinking", "Attention to Detail"],
    creationDate: "2023-10-17",
  },
  {
    questionnaireID: "BIO302-JD18",
    course: "Computational Biology",
    department: "Biology",
    composer: "Jane Doe",
    skills: ["Collaboration", "Adaptability"],
    creationDate: "2023-10-18",
  },
  {
    questionnaireID: "CS307-AB19",
    course: "Computer Networks",
    department: "Computer Science",
    composer: "Alice Brown",
    skills: ["Leadership", "Creativity"],
    creationDate: "2023-10-19",
  },
  {
    questionnaireID: "MTH203-BJ20",
    course: "Statistics",
    department: "Mathematics",
    composer: "Bob Johnson",
    skills: ["Data Analysis", "Interpersonal Skills"],
    creationDate: "2023-10-20",
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
    className: "hidden lg:table-cell",
  },
  {
    header: "Department",
    accessor: "department",
    className: "hidden lg:table-cell",
  },
  {
    header: "Skills",
    accessor: "skills",
    className: "hidden md:table-cell",
  },
  {
    header: "Date",
    accessor: "date",
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
        key={questionnaire.questionnaireID}
        className="odd:bg-primary_lightblue hover:bg-slate-200"
      >
        {/* Flex container for data */}
        <td className="p-4">
          <div className="flex items-center">
            {/* Survey Code */}
            <h3 className="font-semibold">{questionnaire.questionnaireID}</h3>

            {/* Creation Date floated to the right */}
            <p className="float-right ml-auto text-xs text-gray-500 md:hidden">
              {questionnaire.creationDate}
            </p>
          </div>

          {/* Hidden elements for smaller screens */}
          <div className="md:hidden">
            <p className="text-xs text-gray-500">
              {questionnaire.course} • {questionnaire.department}
            </p>
            <p className="text-xs text-gray-500">
              {questionnaire.skills.join(", ")}
            </p>
          </div>
        </td>

        {/* Course column */}
        <td className="hidden lg:table-cell">{questionnaire.course}</td>

        {/* Department column */}
        <td className="hidden lg:table-cell">{questionnaire.department}</td>

        {/* Skills column */}
        <td className="hidden md:table-cell">
          {questionnaire.skills.join(", ")}
        </td>

        {/* Creation Date column */}
        <td className="hidden lg:table-cell">{questionnaire.creationDate}</td>

        {/* Edit button */}
        <td className="align-bottom md:align-middle">
          <button className="mb-2 mr-1 mt-auto rounded-full p-2 hover:bg-primary_yellow md:mb-0 md:mt-0">
            <Image
              src="/menuIcons/edit.png"
              alt="Edit"
              width={16}
              height={16}
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
