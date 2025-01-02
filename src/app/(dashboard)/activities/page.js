"use client";
import { columns } from "@/app/(dashboard)/activities/columns";
import Modal from "@/components/Modal";
import { SearchableTable } from "@/components/SearchableTable";
import { db } from "@/lib/firebase";
import { collection, getDoc, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { SelectedActivityIdContext } from "./SelectedActivityIdContext";

const Page = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const { selectedActivityId, setSelectedActivityId } = useContext(
    SelectedActivityIdContext,
  );

  useEffect(() => {
    const fetchSkillsAndActivities = async () => {
      const unsubscribeSkills = onSnapshot(
        collection(db, "skills"),
        (snapshot) => {
          // Populate skillMap with skill ID-to-name mapping
          const skillMap = snapshot.docs.reduce((map, doc) => {
            const data = doc.data();
            map[doc.id] = data.name;
            return map;
          }, {});
        },
        (error) => console.error("Error fetching skills:", error),
      );

      const unsubscribeActivities = onSnapshot(
        collection(db, "activities"),
        async (snapshot) => {
          const activitiesData = await Promise.all(
            snapshot.docs.map(async (doc) => {
              const activity = doc.data();

              // Resolve skill names from Firestore references
              const resolvedSkills = await Promise.all(
                activity.skills.map(async (skillRef) => {
                  // Resolve the reference to a document
                  const skillSnapshot = await getDoc(skillRef);
                  return skillSnapshot.exists()
                    ? skillSnapshot.data().name
                    : "Unknown Skill";
                }),
              );

              // Resolve course name from Firestore reference
              const courseSnapshot = await getDoc(activity.course);
              const courseName = courseSnapshot.exists()
                ? courseSnapshot.data().title
                : "Unknown Course";

              return {
                id: doc.id,
                ...activity,
                skills: resolvedSkills,
                course: courseName,
              };
            }),
          );

          setActivities(activitiesData);
          setLoading(false);
        },
        (error) => console.error("Error fetching activities:", error),
      );

      return () => {
        unsubscribeSkills();
        unsubscribeActivities();
      };
    };

    fetchSkillsAndActivities();
  }, []);

  const router = useRouter();

  const handleRowSelect = (activity) => {
    if (selectedActivityId === activity.id) {
      setSelectedActivityId(null);
      router.push(`/activities/${activity.id}`);
      return;
    }
    setSelectedActivityId(activity.id);
    router.push(`/activities/${activity.id}`);
  };

  return (
    <div className="flex h-[98vh] w-full flex-col rounded-md bg-white px-2 shadow-md">
      <div className="flex w-full justify-between gap-4 p-2">
        <h1 className="text-3xl font-bold text-gray-600">Activities</h1>
        <Modal table="activity" type="create" data={[]} />
      </div>
      <div className="overflow-y-scroll pr-1">
        <SearchableTable
          columns={columns}
          data={activities}
          handleRowSelect={handleRowSelect}
          page="activities"
        />
      </div>
    </div>
  );
};

export default Page;
