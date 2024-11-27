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

  const [activity, setActivity] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const activityDoc = doc(db, "activities", id);
        const activitySnapshot = await getDoc(activityDoc);

        if (activitySnapshot.exists()) {
          setActivity({ id: activitySnapshot.id, ...activitySnapshot.data() });
        } else {
          setError("activity not found");
        }
      } catch (err) {
        console.error("Error fetching activity:", err);
        setError("Failed to fetch activity. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  const handleGoBack = () => {
    router.push("/activities");
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
        <h1 className="text-2xl font-semibold">{activity.name}</h1>
        <h2 className="text-lg">{activity.category}</h2>
        <p className="text-justify text-sm">{activity.description}</p>
      </div>
    </div>
  );
};

export default Page;
