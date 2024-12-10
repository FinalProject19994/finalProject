"use client";
import DataTable from "@/components/data-table";
import Modal from "@/components/Modal";
import Loader from "@/components/ui/Loader";
import { db } from "@/lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { columns } from "./columns";

const Page = () => {
  const router = useRouter();
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetching skills with Firestore real-time listener
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "skills"),
      (snapshot) => {
        const skillsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSkills(skillsData);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching skills:", error);
        setLoading(false);
      },
    );
    return () => unsubscribe();
  }, []);

  return (
    <div>
      {!loading ? (
        <div className="flex h-[90dvh] flex-col rounded-md bg-white p-2 shadow-md">
          <div className="flex justify-between">
            <h1 className="text-3xl font-bold text-gray-600">Skills</h1>
            {/* {user.role === "admin" && (
              <Modal table="skill" type="create" data={[]} />
              )} */}
            <Modal table="skill" type="create" data={[]} />
          </div>
          <div className="overflow-y-scroll pr-2">
            <DataTable
              columns={columns}
              data={skills}
              handleRowSelect={() => {}} // An empty function so the table won't throw an error
              page="skills"
            />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Page;
