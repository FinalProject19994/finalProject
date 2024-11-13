"use client";
import DataTable from "@/components/data-table";
import Loader from "@/components/ui/Loader";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import SkillsGraph from "./SkillsGraph";

const Page = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetching the skills
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const skillsCollection = collection(db, "skills");
        const querySnapshot = await getDocs(skillsCollection);
        const skillsData = querySnapshot.docs.map((doc) => doc.data());
        setSkills(skillsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching skills:", error);
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  return (
    <div className="flex h-[90dvh] flex-col gap-4 px-4 md:flex-row">
      {/* LEFT */}
      <SkillsGraph />

      {/* RIGHT */}
      {!loading ? (
        <div className="flex flex-col overflow-y-scroll rounded-md bg-white px-2 shadow-md md:w-1/4">
          {/* Scrollable activities list */}
          <DataTable columns={columns} data={skills} />
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
