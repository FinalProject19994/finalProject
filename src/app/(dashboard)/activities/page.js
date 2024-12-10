"use client";
import { db } from "@/lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { columns } from "@/app/(dashboard)/activities/columns";
import ActivityDialog from "@/components/ActivityDialog";
import DataTable from "@/components/data-table";
import Modal from "@/components/Modal";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getDoc } from "firebase/firestore";

const Page = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

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
                skills: resolvedSkills, // Replace Firestore references with resolved skill names
                course: courseName, // Replace Firestore reference with resolved course name
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
  return (
    <div className="flex h-[90dvh] w-full flex-col rounded-md bg-white shadow-md">
      <div className="flex w-full justify-between gap-4 p-4">
        <h1 className="text-3xl font-bold text-gray-600">Activities</h1>
        <Modal table="activity" type="create" data={[]} />
      </div>
      <div className="px-4">
        <DataTable
          data={activities}
          columns={columns}
          dialog={<ActivityDialog />}
          handleRowSelect={(activity) => {
            router.push(`/activities/${activity.id}`);
          }}
          page="activities"
        />
      </div>
    </div>
  );
};

export default Page;
