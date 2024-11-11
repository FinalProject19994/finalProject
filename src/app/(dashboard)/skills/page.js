"use client";
import DataTable from "@/components/data-table";
import ForceDirectedGraph from "@/components/ForceDirectedGraph";
import Legend from "@/components/ui/Legend";
import { links, nodes } from "@/lib/data";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { columns } from "./columns";

const Page = () => {
  const [skills, setSkills] = useState([]);

  // Fetching the skills
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const skillsCollection = collection(db, "skills");
        const querySnapshot = await getDocs(skillsCollection);
        const skillsData = querySnapshot.docs.map((doc) => doc.data());
        setSkills(skillsData);
        console.log(skillsData);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    fetchSkills();
  }, []);

  return (
    <div className="flex h-[90dvh] flex-col gap-4 px-4 md:flex-row">
      {/* LEFT */}
      <div className="flex gap-4 rounded-md text-3xl md:w-3/4">
        <div className="h-full w-full rounded-md bg-white shadow-md">
          <div className="relative left-2 top-0 z-10">
            <Legend />
          </div>
          <ForceDirectedGraph nodes={nodes} links={links} page="skill" />
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex flex-col overflow-y-scroll rounded-md bg-white px-2 shadow-md md:w-1/4">
        {/* Scrollable activities list */}
        <DataTable columns={columns} data={skills} />
      </div>
    </div>
  );
};

export default Page;
