"use client";
import DataTable from "@/components/data-table";
import Loader from "@/components/ui/Loader";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { columns } from "./columns";

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
        const lecturerData = querySnapshot.docs.map((doc) => doc.data());
        setLecturers(lecturerData);
        console.log(lecturerData);
      } catch (error) {
        console.error("Error fetching lecturers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLecturers();
  }, []);

  return (
    <div className="m-4 mt-0 h-[90dvh] flex-1 overflow-y-scroll rounded-md bg-white p-4 shadow-md">
      {loading ? <Loader /> : <DataTable columns={columns} data={lecturers} />}
    </div>
  );
};

export default TeacherListPage;
