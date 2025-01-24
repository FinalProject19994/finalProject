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
import { useContext, useEffect, useState } from "react";
import { SelectedCourseIdContext } from "../../../context/CoursesContext";
import { columns } from "./columns";

const Page = () => {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [modalType, setModalType] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const { selectedCourseId, setSelectedCourseId } = useContext(
    SelectedCourseIdContext,
  );

  const handleCreateCourse = () => {
    setModalType("create");
  };

  const handleCourseDelete = async (courseId) => {
    try {
      const courseDocRef = doc(db, "courses", courseId);
      await deleteDoc(courseDocRef);
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

  // Fetching the courses
  useEffect(() => {
    const coursesCollection = collection(db, "courses");

    const unsubscribe = onSnapshot(
      coursesCollection,
      async (snapshot) => {
        const coursesData = await Promise.all(
          snapshot.docs.map(async (doc) => {
            const data = doc.data();

            // --- FORCE Resolve department references to objects with ID and title ---
            const resolvedDepartments = await Promise.all(
              (data.departments || []).map(async (ref) => {
                try {
                  // Add try-catch for error handling in individual department fetch
                  const departmentDoc = await getDoc(ref);
                  if (departmentDoc.exists()) {
                    return {
                      id: departmentDoc.id, // Get department ID from departmentDoc.id
                      title: departmentDoc.data().title, // Get department title from departmentDoc.data().title
                    };
                  } else {
                    console.warn("Department document not found:", ref.path); // Warn if department doc is missing
                    return null; // Or handle missing department as needed
                  }
                } catch (error) {
                  console.error("Error fetching department:", ref.path, error); // Log error for individual department fetch
                  return null; // Or handle error as needed
                }
              }),
            );

            // --- FORCE Resolve lecturer references to objects with ID and name ---
            const resolvedLecturers = await Promise.all(
              (data.lecturers || []).map(async (ref) => {
                try {
                  // Add try-catch for error handling in individual lecturer fetch
                  const lecturerDoc = await getDoc(ref);
                  if (lecturerDoc.exists()) {
                    return {
                      id: lecturerDoc.id, // Get lecturer ID from lecturerDoc.id
                      name: lecturerDoc.data().name, // Get lecturer name from lecturerDoc.data().name
                    };
                  } else {
                    console.warn("Lecturer document not found:", ref.path); // Warn if lecturer doc is missing
                    return null; // Handle missing lecturer as needed
                  }
                } catch (error) {
                  console.error("Error fetching lecturer:", ref.path, error); // Log error for individual lecturer fetch
                  return null; // Handle error as needed
                }
              }),
            );

            return {
              id: doc.id,
              ...data,
              departments: resolvedDepartments.filter(Boolean), // Filter out nulls
              lecturers: resolvedLecturers.filter(Boolean), // Filter out nulls
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
      {loading ? (
        <Loader />
      ) : (
        <SearchableTable
          data={courses}
          columns={columns({
            onCourseDelete: handleCourseDelete,
            onCourseEdit: handleEditCourse,
          })}
          handleRowSelect={handleRowSelect}
          page="courses"
        />
      )}
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
