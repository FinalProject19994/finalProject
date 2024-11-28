"use client";
import Loader from "@/components/ui/Loader";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Badge } from "@/components/ui/badge";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

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
          console.log(activitySnapshot.data());
        } else {
          setError("Activity not found");
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
    <div className="h-full space-y-4 rounded-md bg-white p-4 shadow-md">
      <div className="flex justify-end">
        <button
          onClick={handleGoBack}
          className="cursor-pointer rounded-full p-2 hover:bg-gray-200"
        >
          <X />
        </button>
      </div>
      <div>
        <h1 className="mb-2 text-center text-2xl font-semibold">
          {activity.title}
        </h1>
        <h3 className="mb-2 text-sm font-semibold text-muted-foreground">
          Courses
        </h3>
        <div className="flex flex-wrap gap-2">
          {activity.courses.map((course) => (
            <Badge key={course} variant="secondary">
              {course}
            </Badge>
          ))}
        </div>
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold text-muted-foreground">
          Skills
        </h3>
        <div className="flex flex-wrap gap-2">
          {activity.skills.map((skill) => (
            <Badge key={skill}>{skill}</Badge>
          ))}
        </div>
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold text-muted-foreground">
          Lecturers
        </h3>
        <p>{activity.lecturers.join(", ")}</p>
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold text-muted-foreground">
          Week Number
        </h3>
        <p>{activity.weekNumber}</p>
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold text-muted-foreground">
          Description
        </h3>
        <p className="text-sm">{activity.description}</p>
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold text-muted-foreground">
          Reflection
        </h3>
        <p className="text-sm">{activity.reflection}</p>
      </div>
    </div>
  );
};

export default Page;
