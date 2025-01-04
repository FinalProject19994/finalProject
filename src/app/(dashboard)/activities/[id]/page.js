"use client";
import { Badge } from "@/components/ui/badge";
import Loader from "@/components/ui/Loader";
import { db } from "@/lib/firebase";
import skillsCategories from "@/lib/skillsCategories";
import { doc, getDoc } from "firebase/firestore";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = ({ params }) => {
  const router = useRouter();

  const [activity, setActivity] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const activityDoc = doc(db, "activities", params.id);
        const activitySnapshot = await getDoc(activityDoc);

        if (activitySnapshot.exists()) {
          const data = activitySnapshot.data();

          // Resolve course reference
          const courseSnapshot = await getDoc(data.course);
          const course = courseSnapshot.exists()
            ? { id: courseSnapshot.id, ...courseSnapshot.data() }
            : null;

          // Resolve skills references
          const skills = await Promise.all(
            data.skills.map(async (skillRef) => {
              const skillSnapshot = await getDoc(skillRef);
              return skillSnapshot.exists()
                ? { id: skillSnapshot.id, ...skillSnapshot.data() }
                : null;
            }),
          );

          // Resolve lecturers references
          const lecturers = await Promise.all(
            data.lecturers.map(async (lecturerRef) => {
              const lecturerSnapshot = await getDoc(lecturerRef);
              return lecturerSnapshot.exists()
                ? { id: lecturerSnapshot.id, ...lecturerSnapshot.data() }
                : null;
            }),
          );

          setActivity({
            ...data,
            course,
            skills: skills.filter(Boolean), // Filter out null values
            lecturers: lecturers.filter(Boolean), // Filter out null values
          });
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
  }, [params.id]);

  // if (loading) {
  //   return (
  //     <div className="flex h-screen items-center justify-center">
  //       <Loader />
  //     </div>
  //   );
  // }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  const handleGoBack = () => {
    router.push("/activities");
  };

  return (
    <div className="h-full space-y-4 rounded-md bg-white p-4 px-6 shadow-md">
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
        <h5 className="text-center text-xs">{activity.date}</h5>
        <h3 className="mb-2 text-sm font-semibold text-muted-foreground">
          Course
        </h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">{activity.course?.title}</Badge>
        </div>
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold text-muted-foreground">
          Skills
        </h3>
        <div className="flex flex-wrap gap-2">
          {activity.skills?.map((skill, index) => (
            <Badge
              key={index}
              style={{
                backgroundColor: skillsCategories[skill.category],
                cursor: "pointer",
              }}
              onClick={() => router.push(`/skills/${skill.id}`)}
            >
              {skill.name}
            </Badge>
          ))}
        </div>
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold text-muted-foreground">
          Lecturers
        </h3>
        <div className="flex flex-wrap gap-2">
          {activity.lecturers?.map((lecturer, index) => (
            <Badge key={index} variant="outline">
              {lecturer.name}
            </Badge>
          ))}
        </div>
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
        <h3 className="my-2 text-sm font-semibold text-muted-foreground">
          Images
        </h3>
        {/* {activity.images.length > 0 ? (
          activity.images.map((image) => (
            <img key={image} src={image} className="h-auto w-full" />
          ))
        ) : (
          <p className="text-sm text-muted-foreground">No images available</p>
        )} */}
      </div>
    </div>
  );
};

export default Page;
