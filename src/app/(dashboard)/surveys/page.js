"use client";
import DataTable from "@/components/data-table";
import Modal from "@/components/Modal";
import Loader from "@/components/ui/Loader";
import { db } from "@/lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { columns } from "./columns";

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

const Questionnaires = () => {
  const router = useRouter();

  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetching surveys with Firestore real-time listener
  useEffect(() => {
    const surveysCollection = collection(db, "surveys");

    const unsubscribe = onSnapshot(
      surveysCollection,
      (snapshot) => {
        const surveysData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSurveys(surveysData);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching surveys:", error);
        setLoading(false);
      },
    );
    return () => unsubscribe();
  }, []);

  return (
    <div className="m-4 mt-0 h-[90dvh] flex-1 overflow-y-scroll rounded-md bg-white p-4 shadow-md">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold text-gray-600">Surveys</h1>
        <Modal table="survey" type="create" data={[]} />
      </div>
      {loading ? (
        <Loader />
      ) : (
        // <SearchableTable
        //   data={surveys}
        //   columns={columns}
        //   handleRowSelect={() => {}}
        //   page="surveys"
        // />
        <DataTable
          data={questionnaires}
          // data={surveys}
          columns={columns}
          handleRowSelect={(survey) => {
            router.push(`/surveys/${survey.id}`);
          }}
        />
      )}
    </div>
  );
};

export default Questionnaires;
