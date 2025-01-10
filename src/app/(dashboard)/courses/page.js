"use client";
import Modal from "@/components/Modal";
import { SearchableTable } from "@/components/SearchableTable";
import Loader from "@/components/ui/Loader";
import { fetchGraphData, prepareGraphData } from "@/lib/fetchGraphData";
import { db } from "@/lib/firebase";
import { collection, getDoc, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { SelectedCourseIdContext } from "../../../context/CoursesContext";
import { columns } from "./columns";

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

  const { selectedCourseId, setSelectedCourseId } = useContext(
    SelectedCourseIdContext,
  );
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
                const departmentDoc = await getDoc(ref);
                return departmentDoc.data()?.title || "Unknown Department";
              }),
            );

            // Resolve lecturer references
            const lecturers = await Promise.all(
              data.lecturers.map(async (ref) => {
                const lecturerDoc = await getDoc(ref);
                return lecturerDoc.data()?.name || "Unknown Lecturer";
              }),
            );

            return {
              id: doc.id,
              ...data,
              departments: departments.join(", "),
              lecturers: lecturers.join(", "),
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

  const handleRowSelect = (course) => {
    if (selectedCourseId === course.id) {
      setSelectedCourseId(null);
      return;
    }
    setSelectedCourseId(course.id);
  };

  return (
    <div className="flex h-[98vh] w-full flex-col rounded-md bg-white px-2 shadow-md dark:bg-gray-500">
      <div className="flex w-full justify-between gap-4 p-2">
        <h1 className="text-3xl font-bold text-gray-600 dark:text-gray-300">
          Courses
        </h1>
        <Modal table="course" type="create" data={courses} />
      </div>
      {loading ? (
        <Loader />
      ) : (
        <SearchableTable
          data={courses}
          columns={columns}
          handleRowSelect={handleRowSelect}
          page="activities"
        />
      )}
    </div>
  );
};

export default Page;
