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

const Page = () => {
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
      {/* ADD ACTIVITY MODAL */}
      <Dialog>
        <DialogTrigger className="flex h-8 w-8 items-center justify-center rounded-full hover:border hover:border-gray-500">
          <Image src="/menuIcons/plus.png" alt="add" width={14} height={14} />
        </DialogTrigger>
        <DialogContent className="text-sm">
          <DialogHeader>
            <DialogTitle className="text-center">ADD COURSE</DialogTitle>
          </DialogHeader>
          <input
            type="text"
            placeholder="Enter a title..."
            className="rounded-md border p-2 text-gray-700 outline-none"
          />
          <MultipleSelector
            // TODO: add skills from the database and remove the local array
            options={[
              { id: 1, label: "Communication" },
              { id: 2, label: "Teamwork" },
              { id: 3, label: "Problem Solving" },
              { id: 4, label: "Leadership" },
              { id: 5, label: "Creativity" },
              { id: 6, label: "Adaptability" },
              { id: 7, label: "Critical Thinking" },
              { id: 8, label: "Interpersonal Skills" },
            ]}
            // TODO: add Lecturers from the database
          />
          <input
            type="number"
            placeholder="Week number..."
            max={13}
            min={1}
            className="w-1/2 rounded-md border p-2 text-gray-700 outline-none"
          />
          <textarea
            placeholder="Enter description..."
            className="rounded-md border p-2 text-gray-700 outline-none"
          />
          <textarea
            placeholder="Enter reflection..."
            className="rounded-md border p-2 text-gray-700 outline-none"
          />
          <input
            type="file"
            accept="image/*"
            className="rounded-md border border-gray-200 text-sm text-gray-700 file:mr-2 file:border-0 file:bg-gray-300 file:px-2 file:py-3 file:text-gray-700 focus:z-10"
          />
          {/* <Link
              href="/surveys"
              className="text-primary_purple hover:underline"
            >
              Surveys
            </Link> */}
          <button className="w-full rounded-md bg-primary_purple p-2 text-white">
            Add
          </button>
        </DialogContent>
      </Dialog>

      {/* LEFT - COURSES TABLE */}
      <div className="w-3/5 overflow-y-scroll rounded-md bg-white p-4 shadow-md">
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
