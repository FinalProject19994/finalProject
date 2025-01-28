"use client";
import Modal from "@/components/Modal";
import { Badge } from "@/components/ui/badge";
import FavoriteHeart from "@/components/ui/FavoriteHeart";
import ThumbsUpButton from "@/components/ui/ThumbsUpButton";
import { SelectedActivityIdContext } from "@/context/ActivitiesContext";
import { auth, db } from "@/lib/firebase";
import { darkSkillsCategories, skillsCategories } from "@/lib/skillsCategories";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { Trash2, X } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const Page = ({ params }) => {
  const { theme } = useTheme();
  const router = useRouter();
  const { selectedActivityId, setSelectedActivityId } = useContext(
    SelectedActivityIdContext,
  );

  const [modalType, setModalType] = useState(null);
  const [activity, setActivity] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [isAuthorizedToDelete, setIsAuthorizedToDelete] = useState(false);
  const [isAuthorizedToEdit, setIsAuthorizedToEdit] = useState(false);

  useEffect(() => {
    const fetchActivityAndUserRole = async () => {
      setLoading(true);
      try {
        const activityDocRef = doc(db, "activities", params.id);

        const activitySnapshot = await getDoc(activityDocRef);

        if (activitySnapshot.exists()) {
          const data = activitySnapshot.data();

          // Authorization Check - START
          const currentUserId = auth.currentUser?.uid;
          let role = null;
          let activityLecturerIds = Array.isArray(data.lecturers)
            ? data.lecturers.map((lecturer) => lecturer.id)
            : [];

          if (currentUserId) {
            const userDocRef = doc(db, "users", currentUserId);
            const userDocSnap = await getDoc(userDocRef);
            if (userDocSnap.exists()) {
              role = userDocSnap.data().role.toLowerCase();
              setUserRole(role); // Set user role state
            }
          }

          const deleteAuth =
            role === "admin" || activityLecturerIds.includes(currentUserId);
          const editAuth =
            role === "admin" || activityLecturerIds.includes(currentUserId); // <-- DECLARE editAuth *BEFORE* using it

          setIsAuthorizedToDelete(deleteAuth);
          setIsAuthorizedToEdit(editAuth); // <-- Line 92 - Now referencing editAuth *after* declaration
          // Authorization Check - END

          // Resolve course, skills, lecturers (as before) - Add logs for each resolve step
          const courseSnapshot = await getDoc(data.course);

          const course = courseSnapshot.exists()
            ? { id: courseSnapshot.id, ...courseSnapshot.data() }
            : null;

          const skills = await Promise.all(
            data.skills.map(async (skillRef) => {
              const skillSnapshot = await getDoc(skillRef);

              return skillSnapshot.exists()
                ? { id: skillSnapshot.id, ...skillSnapshot.data() }
                : null;
            }),
          );

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
          console.warn(
            "fetchActivityAndUserRole - Activity not found (activitySnapshot doesn't exist)",
          ); // Warn if activity not found
        }
      } catch (err) {
        console.error(
          "fetchActivityAndUserRole - Error fetching activity:",
          err,
        ); // Log full error details
        setError("Failed to fetch activity. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchActivityAndUserRole();
  }, [params.id]);

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  const closeModal = () => {
    setModalType(null);
    setSelectedActivityId(null);
  };

  const handleGoBack = () => {
    setSelectedActivityId(null);
    router.push("/activities");
  };

  const handleEditActivity = () => {
    console.log("handleEditActivity function called!");
    setModalType("edit");
    setSelectedActivityId(activity);
  };

  const handleActivityDelete = async () => {
    try {
      const activityDocRef = doc(db, "activities", params.id);
      await deleteDoc(activityDocRef);
      setSelectedActivityId(null);
      router.push("/activities");
    } catch (error) {
      console.error("Error deleting activity:", error);
    }
  };

  return (
    <div className="flex h-[102%] flex-col space-y-4 rounded-md bg-white p-4 px-6 shadow-md dark:bg-gray-500">
      <div className="flex justify-end">
        <button
          onClick={handleGoBack}
          className="cursor-pointer rounded-full p-2 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-600"
        >
          <X />
        </button>
      </div>
      <div className="flex-grow">
        <h1 className="mb-2 text-center text-3xl font-bold text-gray-800 dark:text-white">
          {activity.title}
        </h1>
        <h5 className="text-center text-sm text-gray-600 dark:text-gray-200">
          {activity.course?.semester[0].toUpperCase() +
            activity.course?.semester.slice(1)}{" "}
          - {activity.date}
        </h5>

        {/* Misc. buttons */}
        <div className="mt-4 flex justify-center space-x-4">
          <ThumbsUpButton activityId={params.id} />
          <FavoriteHeart activityId={params.id} />
        </div>

        <div className="mt-6 space-y-6">
          <div>
            <h3 className="mb-2 text-lg font-semibold text-gray-700 dark:text-gray-50">
              Course
            </h3>
            <div className="flex flex-wrap gap-2">
              <Badge
                className="cursor-pointer bg-gray-300"
                onClick={() => {
                  setSelectedActivityId(null);
                  router.push(
                    `/activities?search=${encodeURIComponent(activity.course?.title)}`,
                  );
                }}
              >
                {activity.course?.title}
              </Badge>
            </div>
          </div>
          <div>
            <h3 className="mb-2 text-lg font-semibold text-gray-700 dark:text-gray-50">
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
            <h3 className="mb-2 text-lg font-semibold text-gray-700 dark:text-gray-50">
              Lecturers
            </h3>
            <div className="flex flex-wrap gap-2">
              {activity.lecturers?.map((lecturer) => (
                <Badge
                  className="cursor-pointer bg-gray-300"
                  onClick={() => {
                    setSelectedActivityId(null);
                    router.push(
                      `/activities?search=${encodeURIComponent(lecturer.name)}`,
                    );
                  }}
                  key={lecturer.id}
                >
                  {lecturer.name}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-2 text-lg font-semibold text-gray-700 dark:text-gray-50">
              Week Number
            </h3>
            <p className="text-gray-600 dark:text-white">
              {activity.weekNumber}
            </p>
          </div>
          <div>
            <h3 className="mb-2 text-lg font-semibold text-gray-700 dark:text-gray-50">
              Description
            </h3>
            <p className="text-gray-600 dark:text-white">
              {activity.description}
            </p>
          </div>
          <div>
            <h3 className="mb-2 text-lg font-semibold text-gray-700 dark:text-gray-50">
              Reflection
            </h3>
            <p className="text-gray-600 dark:text-white">
              {activity.reflection}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-auto flex justify-center space-x-4 pt-4">
        {/* {isAuthorizedToEdit && (
          <button
            onClick={handleEditActivity}
            className="flex items-center justify-center rounded-md border border-gray-200 p-2 text-gray-700 transition-colors hover:bg-primary_purple_table dark:text-white dark:hover:bg-primary_purple"
          >
            <PencilIcon size={20} className="mr-2" />
            Edit Activity
          </button>
        )} */}
        {isAuthorizedToDelete && (
          <button
            className="flex items-center justify-center rounded-md border border-gray-200 p-2 text-gray-700 transition-colors hover:bg-primary_purple_table dark:text-white dark:hover:bg-primary_purple"
            onClick={handleActivityDelete}
          >
            <Trash2 size={20} className="mr-2" />
            Delete Activity
          </button>
        )}
      </div>
      {console.log(
        "Before Modal Render - modalType:",
        modalType,
        "selectedActivity:",
        selectedActivityId,
      )}
      {modalType && (
        <Modal
          table="activity"
          type={modalType}
          data={selectedActivityId}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default Page;
