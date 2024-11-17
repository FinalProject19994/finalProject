"use client";
import DataTable from "@/components/data-table";
import Loader from "@/components/ui/Loader";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { useRouter } from "next/navigation";
import SkillsGraph from "./SkillsGraph";

const Page = () => {
  const router = useRouter();
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
          <div className="flex justify-between pt-2">
            <h1 className="text-3xl font-bold text-gray-600">Skills</h1>
            <button
              onClick={() => {
                router.push("/skills/new");
              }}
              className="flex gap-2 rounded-md border border-gray-200 p-2 duration-150 hover:bg-gray-100"
            >
              <Plus />
              {/* TODO: Center the text vertically */}
              <span className="text-sm text-gray-700">Create new SKill</span>
            </button>
          </div>
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
