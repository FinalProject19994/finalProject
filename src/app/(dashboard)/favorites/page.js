"use client";
import { SearchableTable } from "@/components/SearchableTable";
import Loader from "@/components/ui/Loader";
import { SelectedActivityIdContext } from "@/context/ActivitiesContext";
import { auth, db } from "@/lib/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { columns } from "./columns";
import { useRouter } from "next/navigation";

const FavoritesPage = () => {
  const router = useRouter();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null); // Fetch user data if needed
  const { selectedActivityId, setSelectedActivityId } = useContext(
    SelectedActivityIdContext,
  );

  useEffect(() => {
    const fetchFavoritedActivities = async () => {
      setLoading(true);
      const user = auth.currentUser;
      if (!user) {
        setLoading(false);
        return;
      }
      const userId = user.uid;

      try {
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          setUserData(userDocSnap.data()); // Fetch user data if needed
        }

        // Query activities where 'favoritedBy' array contains the current user's UID
        const activitiesQuery = query(
          collection(db, "activities"),
          where("favoritedBy", "array-contains", user.uid), // Query for favorited activities
        );

        const querySnapshot = await getDocs(activitiesQuery);
        const favoritedActivitiesData = await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            const activity = doc.data();

            const courseSnapshot = await getDoc(activity.course);
            const courseDetails = courseSnapshot.exists()
              ? { id: courseSnapshot.id, title: courseSnapshot.data().title }
              : { id: null, title: "Unknown Course" };

            const resolvedSkills = await Promise.all(
              activity.skills.map(async (skillRef) => {
                const skillSnapshot = await getDoc(skillRef);
                return skillSnapshot.exists()
                  ? { id: skillSnapshot.id, name: skillSnapshot.data().name }
                  : null;
              }),
            );

            const resolvedLecturers = await Promise.all(
              activity.lecturers.map(async (lecturerRef) => {
                const lecturerSnapshot = await getDoc(lecturerRef);
                if (lecturerSnapshot.exists()) {
                  const lecturerData = lecturerSnapshot.data();
                  return lecturerSnapshot.exists()
                    ? { id: lecturerSnapshot.id, name: lecturerData.name }
                    : null;
                } else {
                  return null;
                }
              }),
            );

            return {
              id: doc.id,
              ...activity,
              skills: resolvedSkills.filter(Boolean),
              course: courseDetails,
              lecturers: resolvedLecturers.filter(Boolean),
            };
          }),
        );

        setActivities(favoritedActivitiesData);
      } catch (error) {
        console.error("Error fetching favorited activities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoritedActivities();
  }, []);

  const handleRowSelect = (activity) => {
    setSelectedActivityId(
      selectedActivityId === activity.id ? null : activity.id,
    );
    router.push(`/activities?search=${encodeURIComponent(activity?.title)}`);
  };

  return (
    <div className="mx-4 mt-2 h-[98%] flex-1 rounded-md bg-white p-2 shadow-md dark:bg-gray-500">
      <h1 className="text-3xl font-bold text-gray-600 dark:text-gray-300">
        My Favorite Activities
      </h1>
      {loading ? (
        <Loader />
      ) : (
        <SearchableTable
          columns={columns}
          data={activities}
          handleRowSelect={handleRowSelect}
          page="favorites"
        />
      )}
    </div>
  );
};

export default FavoritesPage;
