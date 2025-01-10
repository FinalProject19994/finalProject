"use client";
import { Columns } from "./Columns";
import Modal from "@/components/Modal";
import { SearchableTable } from "@/components/SearchableTable";
import { auth, db } from "@/lib/firebase";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { SelectedActivityIdContext } from "@/context/ActivitiesContext";

const Page = () => {
  const [userData, setUserData] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const { selectedActivityId, setSelectedActivityId } = useContext(
    SelectedActivityIdContext,
  );

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(userDocRef);

          if (docSnap.exists()) {
            setUserData(docSnap.data());
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

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

          fetchUserData();
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
    <div className="flex h-[98vh] w-full flex-col rounded-md bg-white px-2 shadow-md dark:bg-gray-500">
      <div className="flex w-full justify-between gap-4 p-2">
        <h1 className="text-3xl font-bold text-gray-600 dark:text-gray-300">
          Activities
        </h1>
        <Modal table="activity" type="create" data={[]} />
      </div>
      <div className="overflow-y-scroll pr-1">
        <SearchableTable
          columns={Columns()}
          data={activities}
          handleRowSelect={handleRowSelect}
          page="activities"
        />
      </div>
    </div>
  );
};

export default Page;
