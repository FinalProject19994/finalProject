"use client";
import { db } from "@/lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { columns } from "@/app/(dashboard)/activities/columns";
import ActivityDialog from "@/components/ActivityDialog";
import DataTable from "@/components/data-table";
import Modal from "@/components/Modal";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const activities = [
  {
    id: 1,
    title: "Effective Communication Workshop",
    skills: ["Communication", "Teamwork"],
    course: "Computer Science",
    department: "Humanities",
    description:
      "Improve your communication skills through interactive sessions",
    date: "2023-10-25",
  },
  {
    id: 2,
    title: "Time Management and Prioritization",
    skills: ["Time Management", "Organization"],
    course: "Mathematics",
    department: "Mathematics",
    description: "Learn how to manage your time effectively",
    date: "2023-11-01",
  },
  {
    id: 3,
    title: "Design Thinking",
    skills: ["Creativity", "Problem Solving"],
    course: "Biology",
    department: "Design",
    description:
      "Learn how to approach problems with a design thinking mindset",
    date: "2023-11-08",
  },
  {
    id: 4,
    title: "Active Listening",
    skills: ["Communication", "Interpersonal Skills"],
    course: "Physics",
    department: "Humanities",
    description: "Improve your listening skills through interactive exercises",
    date: "2023-11-15",
  },
  {
    id: 5,
    title: "Conflict Resolution",
    skills: ["Conflict Resolution", "Teamwork"],
    course: "Chemistry",
    department: "Humanities",
    description: "Learn how to resolve conflicts effectively",
    date: "2023-11-22",
  },
  {
    id: 6,
    title: "Delegation and Empowerment",
    skills: ["Leadership", "Delegation"],
    course: "Computer Science",
    department: "Business",
    description: "Learn how to delegate tasks effectively",
    date: "2023-11-29",
  },
  {
    id: 7,
    title: "Emotional Intelligence",
    skills: ["Empathy", "Self-Regulation"],
    course: "Psychology",
    department: "Humanities",
    description: "Enhance your emotional intelligence and interpersonal skills",
    date: "2023-12-06",
  },
  {
    id: 8,
    title: "Project Management Basics",
    skills: ["Project Management", "Planning"],
    course: "Business",
    department: "Business",
    description: "Learn the fundamentals of managing projects effectively",
    date: "2023-12-13",
  },
  {
    id: 9,
    title: "Public Speaking Mastery",
    skills: ["Public Speaking", "Confidence"],
    course: "Communications",
    department: "Humanities",
    description: "Develop your public speaking skills with practical exercises",
    date: "2023-12-20",
  },
  {
    id: 10,
    title: "Critical Thinking Workshop",
    skills: ["Critical Thinking", "Analysis"],
    course: "Philosophy",
    department: "Humanities",
    description: "Enhance your critical thinking and analytical skills",
    date: "2023-12-27",
  },
  {
    id: 11,
    title: "Introduction to Data Analysis",
    skills: ["Data Analysis", "Statistics"],
    course: "Mathematics",
    department: "Mathematics",
    description: "Learn the basics of data analysis and visualization",
    date: "2023-12-28",
  },
  {
    id: 12,
    title: "Digital Marketing Essentials",
    skills: ["Marketing", "Digital Literacy"],
    course: "Business",
    department: "Business",
    description: "Learn the fundamentals of digital marketing and advertising",
    date: "2023-12-29",
  },
  {
    id: 13,
    title: "Introduction to Artificial Intelligence",
    skills: ["Artificial Intelligence", "Machine Learning"],
    course: "Computer Science",
    department: "Engineering",
    description:
      "Learn the basics of artificial intelligence and its applications",
    date: "2023-12-30",
  },
  {
    id: 14,
    title: "Introduction to Web Development",
    skills: ["Web Development", "Programming"],
    course: "Computer Science",
    department: "Engineering",
    description:
      "Learn the basics of web development and build a simple website",
    date: "2023-12-31",
  },
  {
    id: 15,
    title: "Introduction to Cybersecurity",
    skills: ["Cybersecurity", "Networking"],
    course: "Computer Science",
    department: "Engineering",
    description: "Learn the basics of cybersecurity and its importance",
    date: "2024-01-01",
  },
  {
    id: 16,
    title: "Introduction to Data Science",
    skills: ["Data Science", "Machine Learning"],
    course: "Mathematics",
    department: "Engineering",
    description: "Learn the basics of data science and its applications",
    date: "2024-01-02",
  },
  {
    id: 17,
    title: "Introduction to Networking",
    skills: ["Networking", "Cloud Computing"],
    course: "Computer Science",
    department: "Engineering",
    description: "Learn the basics of networking and cloud computing",
    date: "2024-01-03",
  },
  {
    id: 18,
    title: "Introduction to Computer Vision",
    skills: ["Computer Vision", "Artificial Intelligence"],
    course: "Computer Science",
    department: "Engineering",
    description: "Learn the basics of computer vision and its applications",
    date: "2024-01-04",
  },
  {
    id: 19,
    title: "Introduction to Natural Language Processing",
    skills: ["Natural Language Processing", "Artificial Intelligence"],
    course: "Computer Science",
    department: "Engineering",
    description:
      "Learn the basics of natural language processing and its applications",
    date: "2024-01-05",
  },
  {
    id: 20,
    title: "Introduction to Robotics",
    skills: ["Robotics", "Artificial Intelligence"],
    course: "Computer Science",
    department: "Engineering",
    description: "Learn the basics of robotics and its applications",
    date: "2024-01-06",
  },
];

const Page = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const activitiesCollection = collection(db, "activities");

    const unsubscribe = onSnapshot(
      activitiesCollection,
      (snapshot) => {
        const activitiesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setActivities(activitiesData);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching activities:", error);
        setLoading(false);
      },
    );
    return () => unsubscribe();
  }, []);

  const router = useRouter();
  return (
    <div className="flex h-[90dvh] flex-col gap-4 md:flex-row">
      {/* LEFT - ACTIVITIES TABLE */}
      <div className="overflow-y-scroll rounded-md bg-white p-2 shadow-md">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold text-gray-600">Activities</h1>
          <Modal table="activity" type="create" data={[]} />
        </div>
        <DataTable
          data={activities}
          columns={columns}
          dialog={<ActivityDialog />}
          handleRowSelect={(activity) => {
            router.push(`/activities/${activity.id}`);
          }}
        />
      </div>

      {/* RIGHT - GRAPH */}
    </div>
  );
};

export default Page;
