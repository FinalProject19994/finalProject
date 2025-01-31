"use client";
import DataTable from "@/components/data-table";
import Loader from "@/components/ui/Loader";
import { db } from "@/lib/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { SearchableTable } from "@/components/SearchableTable";

const TeacherListPage = () => {
  const [lecturers, setLecturers] = useState([]);
  const [loading, setLoading] = useState(true); // Start with true

  useEffect(() => {
    const fetchLecturers = async () => {
      try {
        const lecturersCollection = collection(db, "users");
        const querySnapshot = await getDocs(lecturersCollection);

        const lecturerData = await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            const lecturer = doc.data();

            // Only process if lecturer role
            if (lecturer.role === "Lecturer" || lecturer.role === "Admin") {
              const departments = await Promise.all(
                (lecturer.departments || []).map(async (ref) => {
                  try {
                    const departmentDoc = await getDoc(ref);
                    return departmentDoc.data()?.title;
                  } catch (e) {
                    console.error("Error fetching department:", e);
                    return "Unknown Department";
                  }
                }),
              );

              return {
                ...lecturer,
                id: doc.id,
                departments: departments.join(", "),
              };
            }
            return null;
          }),
        );

        // Filter out null values (non-lecturers)
        setLecturers(lecturerData.filter((lecturer) => lecturer !== null));
      } catch (error) {
        console.error("Error fetching lecturers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLecturers();
  }, []);

  return (
    <div className="mx-4 mt-2 h-[98%] flex-1 rounded-md bg-white p-2 shadow-md dark:bg-gray-500">
      <h1 className="text-3xl font-bold text-gray-600 dark:text-gray-300">
        Lecturers
      </h1>
      {loading ? (
        <Loader />
      ) : (
        <SearchableTable
          columns={columns}
          data={lecturers}
          handleRowSelect={() => {}}
          page="lecturers"
        />
      )}
    </div>
  );
};

export default TeacherListPage;
