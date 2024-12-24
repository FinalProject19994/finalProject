"use client";
import DataTable from "@/components/data-table";
import ForceDirectedGraph from "@/components/ForceDirectedGraph";
import Modal from "@/components/Modal";
import Legend from "@/components/ui/Legend";
import Loader from "@/components/ui/Loader";
import { db } from "@/lib/firebase";
import { collection, getDoc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { fetchGraphData, prepareGraphData } from "@/lib/fetchGraphData";
import { SearchableTable } from "@/components/SearchableTable";
import ActivityDialog from "@/components/ActivityDialog";

// TODO: change the lecturer ID to lecturer name
const Page = () => {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });

  useEffect(() => {
    const fetchData = async () => {
      const rawData = await fetchGraphData();
      const processedData = prepareGraphData(rawData);
      setGraphData(processedData);
    };

    fetchData();
  }, []);

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetching the courses
  useEffect(() => {
    const coursesCollection = collection(db, "courses");

    const unsubscribe = onSnapshot(
      coursesCollection,
      async (snapshot) => {
        const coursesData = await Promise.all(
          snapshot.docs.map(async (doc) => {
            const data = doc.data();

            // Resolve department references
            const departments = await Promise.all(
              data.departments.map(async (ref) => {
                const departmentDoc = await getDoc(ref); // Use getDoc to fetch the document
                return departmentDoc.data()?.title || "Unknown Department";
              }),
            );

            // Resolve lecturer references
            const lecturers = await Promise.all(
              data.lecturers.map(async (ref) => {
                const lecturerDoc = await getDoc(ref); // Use getDoc to fetch the document
                return lecturerDoc.data()?.name || "Unknown Lecturer";
              }),
            );

            return {
              id: doc.id,
              ...data,
              departments,
              lecturers,
            };
          }),
        );

        setCourses(coursesData);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching courses:", error);
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex h-[90dvh] flex-col gap-4 px-4 sm:flex-col md:flex-row">
      {/* LEFT - COURSES TABLE */}
      <div className="rounded-md bg-white p-4 shadow-md md:w-3/5">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold text-gray-600">Courses</h1>
          <Modal table="course" type="create" data={courses} />
        </div>
        {loading ? (
          <Loader />
        ) : (
          <SearchableTable
            data={courses}
            columns={columns}
            dialog={<ActivityDialog />}
            handleRowSelect={() => {}}
            page="activities"
          />
        )}
      </div>

      {/* RIGHT - GRAPH */}
      <div className="flex h-full rounded-md bg-white shadow-md sm:w-full md:w-2/5">
        <Legend header="Courses Graph" />
        <ForceDirectedGraph
          nodes={graphData.nodes}
          links={graphData.links}
          page="course"
        />
      </div>
    </div>
  );
};

export default Page;
