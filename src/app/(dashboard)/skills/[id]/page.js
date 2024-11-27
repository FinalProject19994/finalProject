"use client";
import Loader from "@/components/ui/Loader";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const router = useRouter();
  const { id } = useParams();

  const [skill, setSkill] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSkill = async () => {
      try {
        const skillDoc = doc(db, "skills", id);
        const skillSnapshot = await getDoc(skillDoc);

        if (skillSnapshot.exists()) {
          setSkill({ id: skillSnapshot.id, ...skillSnapshot.data() });
        } else {
          setError("Skill not found");
        }
      } catch (err) {
        console.error("Error fetching skill:", err);
        setError("Failed to fetch skill. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchSkill();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  const handleGoBack = () => {
    router.push("/skills");
  };

  return (
    <div className="h-full rounded-md bg-white text-center shadow-md">
      <div className="flex justify-end p-2">
        <button
          onClick={handleGoBack}
          className="cursor-pointer rounded-full p-2 hover:bg-gray-200"
        >
          <X />
        </button>
      </div>
      <div className="h-full">
        <h1 className="text-2xl font-semibold">{skill.name}</h1>
        <h2 className="text-lg">{skill.category}</h2>
        <p className="text-justify text-sm">{skill.description}</p>
      </div>
    </div>
  );
};

export default Page;
