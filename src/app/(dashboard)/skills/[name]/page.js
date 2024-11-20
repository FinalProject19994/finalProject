"use client";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const { name } = useParams();

  const [skill, setSkill] = useState({});
  const [loading, setLoading] = useState(true);

  const handleGoBack = () => {
    router.push("/skills");
  };

  useEffect(() => {
    const fetchSkill = async () => {
      try {
        const skillsCollection = collection(db, "skills");
        const q = query(skillsCollection, where("name", "==", name));
        const querySnapshot = await getDocs(q);
        const skillData = querySnapshot.docs.map((doc) => doc.data())[0];
        setSkill(skillData);
        console.log(skillData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching skill:", error);
        setLoading(false);
      }
    };

    fetchSkill();
  }, [name]);

  return (
    <div className="h-full rounded-md bg-white text-center shadow-md">
      <div className="flex justify-end p-2">
        <button onClick={handleGoBack}>
          <X />
        </button>
      </div>
      <h1 className="text-2xl font-semibold">{skill.name}</h1>
      <h2 className="">{skill.category}</h2>
      <p className="text-justify text-sm">{skill.description}</p>
    </div>
  );
};

export default Page;
