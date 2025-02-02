"use client";
import Modal from "@/components/Modal";
import { SearchableTable } from "@/components/SearchableTable";
import Loader from "@/components/ui/Loader";
import { fetchGraphData, prepareGraphData } from "@/lib/fetchGraphData";
import { db } from "@/lib/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { SelectedCourseIdContext } from "../../../context/CoursesContext";
import { columns } from "./columns";

const Page = () => {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [modalType, setModalType] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [updateTrigger, setUpdateTrigger] = useState(0);
  const router = useRouter();

  const handleCreateCourse = () => {
    setModalType("create");
  };

  const handleCourseDelete = async (courseId) => {
    try {
      const courseDocRef = doc(db, "courses", courseId);
      await deleteDoc(courseDocRef);
      setUpdateTrigger((prev) => prev + 1);
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const handleEditCourse = (courseData) => {
    setSelectedCourse(courseData);
    setModalType("edit");
  };

  const closeModal = () => {
    setModalType(null); // Close the modal
    setSelectedCourse(null); // Clear the edit data
  };

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
              (data.departments || []).map(async (ref) => {
                const departmentDoc = await getDoc(ref);
                // Ensure the department document exists and has a title
                if (departmentDoc.exists() && departmentDoc.data().title) {
                  return {
                    id: departmentDoc.id,
                    title: departmentDoc.data().title,
                  };
                } else {
                  // console.warn(`Department not found or invalid: ${ref.path}`);
                  return { id: null, title: "Unknown Department" };
                }
              }),
            );

            // Resolve lecturer references
            const lecturers = await Promise.all(
              (data.lecturers || []).map(async (ref) => {
                const lecturerDoc = await getDoc(ref);
                return lecturerDoc.exists()
                  ? { id: lecturerDoc.id, name: lecturerDoc.data().name }
                  : { id: null, name: "Unknown Lecturer" };
              }),
            );

            return {
              id: doc.id,
              ...data,
              departments: departments.filter(Boolean), // Ensure only valid objects are included
              lecturers: lecturers.filter(Boolean), // Ensure only valid objects are included
              semester: data.semester + " - " + data.year,
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
        <button
          onClick={handleCreateCourse}
          className="rounded-md border p-2 hover:bg-primary_purple_table dark:border-white dark:hover:bg-primary_purple"
        >
          Create New Course
        </button>
      </div>
      <SearchableTable
        data={courses}
        columns={columns({
          onCourseDelete: handleCourseDelete,
          onCourseEdit: handleEditCourse,
        })}
        handleRowSelect={handleRowSelect}
        page="courses"
      />
      {/* Modal component */}
      {modalType && (
        <Modal
          table="course"
          type={modalType}
          data={selectedCourse}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default Page;
