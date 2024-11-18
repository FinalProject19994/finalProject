"use client";
import DataTable from "@/components/data-table";
import Loader from "@/components/ui/Loader";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Plus } from "lucide-react";
import { Children, useEffect, useState } from "react";
import { columns } from "./columns";
import { useRouter } from "next/navigation";
import SkillsGraph from "./SkillsGraph";

const Page = () => {
  const router = useRouter();
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedSkill, setSelectedSkill] = useState(null);

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
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const handleRowSelect = (skill) => {
    setSelectedSkill(skill);
    // router.push(`/skills/${skill.name}`);
    alert("Selected skill: " + skill.name + " " + skill.category);
  };

  return (
    <div>
      {!loading ? (
        <div className="flex h-[90dvh] flex-col rounded-md bg-white p-2 shadow-md">
          <div className="flex justify-between">
            <h1 className="text-3xl font-bold text-gray-600">Skills</h1>
            <button
              onClick={() => {
                router.push("/skills/new");
              }}
              className="flex gap-2 rounded-md border border-gray-200 p-2 duration-150 hover:bg-gray-100"
            >
              <Plus />
              <span className="text-sm text-gray-700">Create new SKill</span>
            </button>
          </div>
          <div className="overflow-y-scroll pr-2">
            {/* Scrollable activities list */}
            <DataTable
              columns={columns}
              data={skills}
              handleRowSelect={handleRowSelect}
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
