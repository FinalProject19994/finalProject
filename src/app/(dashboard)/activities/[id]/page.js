"use client";
import { Badge } from "@/components/ui/badge";
import { SelectedActivityIdContext } from "@/context/ActivitiesContext";
import { db } from "@/lib/firebase";
import { darkSkillsCategories, skillsCategories } from "@/lib/skillsCategories";
import { doc, getDoc } from "firebase/firestore";
import { X } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const Page = ({ params }) => {
  const { theme } = useTheme();
  const router = useRouter();
  const { setSelectedActivityId } = useContext(SelectedActivityIdContext);

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
            skills: skills.filter(Boolean),
            lecturers: lecturers.filter(Boolean),
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

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  const handleGoBack = () => {
    setSelectedActivityId(null);
    router.push("/activities");
  };

  return (
    <div className="h-full space-y-4 rounded-md bg-white p-4 px-6 shadow-md dark:bg-gray-500">
      <div className="flex justify-end">
        <button
          onClick={handleGoBack}
          className="cursor-pointer rounded-full p-2 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-600"
        >
          <X />
        </button>
      </div>
      <div>
        <h1 className="mb-2 text-center text-2xl font-semibold">
          {activity.title}
        </h1>
        <h5 className="text-center text-xs">
          {activity.course?.semester[0].toUpperCase() +
            activity.course?.semester.slice(1)}{" "}
          - {activity.date}
        </h5>
        <h3 className="mb-2 text-sm font-semibold text-muted-foreground dark:text-gray-50">
          Course
        </h3>
        <div className="flex flex-wrap gap-2">
          <Badge
            className="cursor-pointer"
            onClick={() => {
              setSelectedActivityId(null);
              router.push(
                `/activities?search=${encodeURIComponent(activity.course?.title)}`,
              );
            }}
            variant="outline"
          >
            {activity.course?.title}
          </Badge>
        </div>
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold text-muted-foreground dark:text-gray-50">
          Skills
        </h3>
        <div className="flex flex-wrap gap-2">
          {activity.skills?.map((skill) => (
            <Badge
              key={skill.id}
              style={{
                backgroundColor:
                  theme === "dark"
                    ? darkSkillsCategories[skill.category]
                    : skillsCategories[skill.category],
                cursor: "pointer",
              }}
              onClick={() => {
                setSelectedActivityId(null);
                router.push(
                  `/activities?search=${encodeURIComponent(skill.name)}`,
                );
              }}
            >
              {skill.name}
            </Badge>
          ))}
        </div>
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold text-muted-foreground dark:text-gray-50">
          Lecturers
        </h3>
        <div className="flex flex-wrap gap-2">
          {activity.lecturers?.map((lecturer) => (
            <Badge
              className="cursor-pointer"
              onClick={() => {
                setSelectedActivityId(null);
                router.push(
                  `/activities?search=${encodeURIComponent(lecturer.name)}`,
                );
              }}
              key={lecturer.id}
              variant="outline"
            >
              {lecturer.name}
            </Badge>
          ))}
        </div>
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold text-muted-foreground dark:text-gray-50">
          Week Number
        </h3>
        <p>{activity.weekNumber}</p>
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold text-muted-foreground dark:text-gray-50">
          Description
        </h3>
        <p className="text-sm">{activity.description}</p>
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold text-muted-foreground dark:text-gray-50">
          Reflection
        </h3>
        <p className="text-sm">{activity.reflection}</p>
        {/*<h3 className="my-2 text-sm font-semibold text-muted-foreground dark:text-gray-300">
          Images
        </h3>
        {activity.images.length > 0 ? (
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
