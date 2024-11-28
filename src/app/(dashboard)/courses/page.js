"use client";
import DataTable from "@/components/data-table";
import ForceDirectedGraph from "@/components/ForceDirectedGraph";
import Modal from "@/components/Modal";
import Legend from "@/components/ui/Legend";
import Loader from "@/components/ui/Loader";
import { links, nodes } from "@/lib/data";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { columns } from "./columns";

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
        console.table(coursesData);
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
          <Modal table="course" type="create" data={courses} />
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
