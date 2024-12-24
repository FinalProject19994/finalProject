"use client";
import DataTable from "@/components/data-table";
import Loader from "@/components/ui/Loader";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { SearchableTable } from "@/components/SearchableTable";

const TeacherListPage = () => {
  const [lecturers, setLecturers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetching the lecturers
  useEffect(() => {
    setLoading(true);
    const fetchLecturers = async () => {
      try {
        const lecturersCollection = collection(db, "users");
        const querySnapshot = await getDocs(lecturersCollection);

        const lecturerData = await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            const lecturer = doc.data();

            const departments = await Promise.all(
              (lecturer.departments || []).map(async (ref) => {
                const departmentDoc = await getDoc(ref);
                return departmentDoc.data()?.title || "Unknown Department";
              }),
            );

            return {
              ...lecturer,
              id: doc.id,
              departments,
            };
          }),
        );

        setLecturers(lecturerData);
      } catch (error) {
        console.error("Error fetching lecturers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLecturers();
  }, []);

  return (
    <div className="mx-4 mt-2 h-[98%] flex-1 rounded-md bg-white p-2 shadow-md">
      <h1 className="text-3xl font-bold text-gray-600">Lecturers</h1>
      {loading ? (
        <Loader />
      ) : (
        // <DataTable
        //   columns={columns}
        //   data={lecturers}
        //   handleRowSelect={() => {}} // An empty function so the table won't throw an error
        // />
        <SearchableTable
          columns={columns}
          data={lecturers}
          handleRowSelect={() => {}}
        />
      )}
    </div>
  );
};

export default TeacherListPage;
