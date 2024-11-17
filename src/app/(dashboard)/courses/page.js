"use client";
import DataTable from "@/components/data-table";
import ForceDirectedGraph from "@/components/ForceDirectedGraph";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Legend from "@/components/ui/Legend";
import Loader from "@/components/ui/Loader";
import MultipleSelector from "@/components/ui/MultipleSelector";
import { links, nodes } from "@/lib/data";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import Image from "next/image";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetching the courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const coursesCollection = collection(db, "courses");
        const querySnapshot = await getDocs(coursesCollection);
        const coursesData = querySnapshot.docs.map((doc) => doc.data());
        setCourses(coursesData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="flex h-[90dvh] flex-col gap-4 px-4 md:flex-row">
      {/* LEFT - COURSES TABLE */}
      <div className="w-3/5 overflow-y-scroll rounded-md bg-white p-4 shadow-md">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold text-gray-600">Courses</h1>
          <button
            onClick={() => {
              router.push("/courses/new");
            }}
            className="flex gap-2 rounded-md border border-gray-200 p-2 duration-150 hover:bg-gray-100"
          >
            <Plus />
            {/* TODO: Center the text vertically */}
            <span className="text-sm text-gray-700">Create new course</span>
          </button>
        </div>
        {loading ? <Loader /> : <DataTable data={courses} columns={columns} />}
      </div>

      {/* RIGHT - GRAPH */}
      <div className="flex w-2/5 gap-4 rounded-md text-3xl">
        <div className="h-full w-full rounded-md bg-white shadow-md">
          <div className="relative left-2 top-0 z-10">
            <Legend />
          </div>
          <ForceDirectedGraph nodes={nodes} links={links} page="course" />
        </div>
      </div>
    </div>
  );
};

export default Page;
