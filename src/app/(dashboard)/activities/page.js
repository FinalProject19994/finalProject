import TableHeader from "@/app/components/TableHeader";
import Table from "@/app/components/Table";

const activities = [
  {
    id: 1,
    title: "Effective Communication Workshop",
    skills: ["Communication", "Teamwork"],
    course: "Computer Science",
    description:
      "Improve your communication skills through interactive sessions",
    date: "2023-10-25",
  },
  {
    id: 2,
    title: "Time Management and Prioritization",
    skills: ["Time Management", "Organization"],
    course: "Mathematics",
    description: "Learn how to manage your time effectively",
    date: "2023-11-01",
  },
  {
    id: 3,
    title: "Design Thinking",
    skills: ["Creativity", "Problem Solving"],
    course: "Biology",
    description:
      "Learn how to approach problems with a design thinking mindset",
    date: "2023-11-08",
  },
  {
    id: 4,
    title: "Active Listening",
    skills: ["Communication", "Interpersonal Skills"],
    course: "Physics",
    description: "Improve your listening skills through interactive exercises",
    date: "2023-11-15",
  },
  {
    id: 5,
    title: "Conflict Resolution",
    skills: ["Conflict Resolution", "Teamwork"],
    course: "Chemistry",
    description: "Learn how to resolve conflicts effectively",
    date: "2023-11-22",
  },
  {
    id: 6,
    title: "Delegation and Empowerment",
    skills: ["Leadership", "Delegation"],
    course: "Computer Science",
    description: "Learn how to delegate tasks effectively",
    date: "2023-11-29",
  },
  {
    id: 7,
    title: "Emotional Intelligence",
    skills: ["Empathy", "Self-Regulation"],
    course: "Psychology",
    description: "Enhance your emotional intelligence and interpersonal skills",
    date: "2023-12-06",
  },
  {
    id: 8,
    title: "Project Management Basics",
    skills: ["Project Management", "Planning"],
    course: "Business",
    description: "Learn the fundamentals of managing projects effectively",
    date: "2023-12-13",
  },
  {
    id: 9,
    title: "Public Speaking Mastery",
    skills: ["Public Speaking", "Confidence"],
    course: "Communications",
    description: "Develop your public speaking skills with practical exercises",
    date: "2023-12-20",
  },
  {
    id: 10,
    title: "Critical Thinking Workshop",
    skills: ["Critical Thinking", "Analysis"],
    course: "Philosophy",
    description: "Enhance your critical thinking and analytical skills",
    date: "2023-12-27",
  },
  {
    id: 11,
    title: "Introduction to Data Analysis",
    skills: ["Data Analysis", "Statistics"],
    course: "Mathematics",
    description: "Learn the basics of data analysis and visualization",
    date: "2023-12-28",
  },
  {
    id: 12,
    title: "Digital Marketing Essentials",
    skills: ["Marketing", "Digital Literacy"],
    course: "Business",
    description: "Learn the fundamentals of digital marketing and advertising",
    date: "2023-12-29",
  },
  {
    id: 13,
    title: "Introduction to Artificial Intelligence",
    skills: ["Artificial Intelligence", "Machine Learning"],
    course: "Computer Science",
    description:
      "Learn the basics of artificial intelligence and its applications",
    date: "2023-12-30",
  },
  {
    id: 14,
    title: "Introduction to Web Development",
    skills: ["Web Development", "Programming"],
    course: "Computer Science",
    description:
      "Learn the basics of web development and build a simple website",
    date: "2023-12-31",
  },
  {
    id: 15,
    title: "Introduction to Cybersecurity",
    skills: ["Cybersecurity", "Networking"],
    course: "Computer Science",
    description: "Learn the basics of cybersecurity and its importance",
    date: "2024-01-01",
  },
  {
    id: 16,
    title: "Introduction to Data Science",
    skills: ["Data Science", "Machine Learning"],
    course: "Mathematics",
    description: "Learn the basics of data science and its applications",
    date: "2024-01-02",
  },
  {
    id: 17,
    title: "Introduction to Networking",
    skills: ["Networking", "Cloud Computing"],
    course: "Computer Science",
    description: "Learn the basics of networking and cloud computing",
    date: "2024-01-03",
  },
  {
    id: 18,
    title: "Introduction to Computer Vision",
    skills: ["Computer Vision", "Artificial Intelligence"],
    course: "Computer Science",
    description: "Learn the basics of computer vision and its applications",
    date: "2024-01-04",
  },
  {
    id: 19,
    title: "Introduction to Natural Language Processing",
    skills: ["Natural Language Processing", "Artificial Intelligence"],
    course: "Computer Science",
    description:
      "Learn the basics of natural language processing and its applications",
    date: "2024-01-05",
  },
  {
    id: 20,
    title: "Introduction to Robotics",
    skills: ["Robotics", "Artificial Intelligence"],
    course: "Computer Science",
    description: "Learn the basics of robotics and its applications",
    date: "2024-01-06",
  },
];

const columns = [
  {
    header: "Title",
    accessor: "title",
  },
  //   {
  //     header: "Description",
  //     accessor: "description",
  //   },
  {
    header: "Skills",
    accessor: "skills",
  },
  {
    header: "Course",
    accessor: "course",
  },
  {
    header: "Date",
    accessor: "date",
  },
];

const page = () => {
  const renderRow = (activities) => {
    return (
      <tr className="odd:bg-primary_lightblue hover:bg-slate-200">
        <td className="text-sm odd:bg-primary_lightblue hover:bg-slate-200">
          {activities.title}
        </td>
        {/* <td>{activities.description}</td> */}
        <td>{activities.skills.join(", ")}</td>
        <td>{activities.course}</td>
        <td className="text-xs">{activities.date}</td>
      </tr>
    );
  };

  return (
    <div className="flex h-[90dvh] flex-col gap-4 px-4 md:flex-row">
      {/* LEFT - ACTIVITIES TABLE */}
      <div className="flex w-2/3 flex-col rounded-md bg-white p-4 shadow-md">
        <div>
          <TableHeader title="activities" isAdmin={false} />
          <div className="h-[80dvh] overflow-auto rounded-lg">
            <Table columns={columns} renderRow={renderRow} data={activities} />
          </div>
        </div>
      </div>

      {/* RIGHT - GRAPH */}
      <div className="flex w-1/3 gap-4 rounded-md text-3xl">
        <div className="h-full w-full rounded-md bg-white shadow-md">
          Nodes and Edges Graph
        </div>
      </div>
    </div>
  );
};

export default page;