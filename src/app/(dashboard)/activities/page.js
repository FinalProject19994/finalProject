"use client";
import Modal from "@/components/Modal";
import { SearchableTable } from "@/components/SearchableTable";
import { SelectedActivityIdContext } from "@/context/ActivitiesContext";
import { auth, db } from "@/lib/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { Columns } from "./Columns";

const Page = () => {
  const [userData, setUserData] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const { selectedActivityId, setSelectedActivityId } = useContext(
    SelectedActivityIdContext,
  );
  const [modalType, setModalType] = useState(null); // "create" | "edit" | null
  const [selectedActivity, setSelectedActivity] = useState(null); // To store data for editing
  const router = useRouter();

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

              const courseSnapshot = await getDoc(activity.course);
              const course = courseSnapshot.exists()
                ? courseSnapshot.data()
                : "Unknown Course";

              const resolvedSkills = await Promise.all(
                activity.skills.map(async (skillRef) => {
                  const skillSnapshot = await getDoc(skillRef);
                  return skillSnapshot.exists()
                    ? skillSnapshot.data().name
                    : "Unknown Skill";
                }),
              );

              const resolvedLecturers = await Promise.all(
                activity.lecturers.map(async (lecturerRef) => {
                  const lecturerSnapshot = await getDoc(lecturerRef);
                  if (lecturerSnapshot.exists()) {
                    const lecturerData = lecturerSnapshot.data();
                    return lecturerData && lecturerData.name
                      ? lecturerData.name
                      : "Unknown Lecturer";
                  } else {
                    return "Unknown Lecturer";
                  }
                }),
              );

              return {
                id: doc.id,
                ...activity,
                skills: resolvedSkills,
                course: course,
                lecturers: resolvedLecturers,
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

  const handleRowSelect = (activity) => {
    setSelectedActivityId(
      selectedActivityId === activity.id ? null : activity.id,
    );
    router.push(`/activities/${activity.id}`);
  };

  const handleActivityDelete = async (activityId) => {
    try {
      const activityDocRef = doc(db, "activities", activityId);
      await deleteDoc(activityDocRef);
    } catch (error) {
      console.error("Error deleting activity:", error);
    }
  };

  const handleEditActivity = (activityData) => {
    setSelectedActivity(activityData);
    setModalType("edit"); // Open the modal in edit mode
  };

  const handleCreateActivity = () => {
    setModalType("create"); // Open the modal in create mode
  };

  const closeModal = () => {
    setModalType(null); // Close the modal
    setSelectedActivity(null); // Clear the edit data
  };

  return (
    <div className="flex h-[98vh] w-full flex-col rounded-md bg-white px-2 shadow-md dark:bg-gray-500">
      <div className="flex w-full justify-between gap-4 p-2">
        <h1 className="text-3xl font-bold text-gray-600 dark:text-gray-300">
          Activities
        </h1>
        <button
          onClick={handleCreateActivity}
          className="rounded-md border p-2 hover:bg-primary_purple_table dark:border-white dark:hover:bg-primary_purple"
        >
          Create New Activity
        </button>
      </div>
      <div className="overflow-y-scroll pr-1">
        <SearchableTable
          columns={Columns({
            onActivityDelete: handleActivityDelete,
            onActivityEdit: handleEditActivity,
          })}
          data={activities}
          handleRowSelect={handleRowSelect}
          page="activities"
        />
      </div>

      {/* Modal component */}
      {modalType && (
        <Modal
          table="activity"
          type={modalType}
          data={selectedActivity}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default Page;
