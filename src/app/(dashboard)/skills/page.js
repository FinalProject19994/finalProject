"use client";
import Modal from "@/components/Modal";
import { SearchableTable } from "@/components/SearchableTable";
import Loader from "@/components/ui/Loader";
import { SelectedSkillIdContext } from "@/context/SkillsContext";
import { auth, db } from "@/lib/firebase";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { Columns } from "./columns";

const Page = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);

  const { selectedSkillId, setSelectedSkillId } = useContext(
    SelectedSkillIdContext,
  );

  // Fetching skills with Firestore real-time listener
  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(userDocRef);

          if (docSnap.exists()) {
            setRole(docSnap.data().role.toLowerCase());
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    const unsubscribe = onSnapshot(
      collection(db, "skills"),
      (snapshot) => {
        const skillsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSkills(skillsData);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching skills:", error);
        setLoading(false);
      },
    );

    fetchUserData();
    return () => unsubscribe();
  }, []);

  const handleRowSelect = (row) => {
    setSelectedSkillId(selectedSkillId === row.id ? null : row.id);
  };

  const handleSkillDelete = async (skillId) => {
    try {
      const skillDocRef = doc(db, "skills", skillId);
      await deleteDoc(skillDocRef);
    } catch (error) {
      console.error("Error deleting skill:", error);
    }
  };

  const handleCreateSkill = () => {
    setModalType("create");
  };

  const handleEditSkill = (skillData) => {
    setSelectedSkill(skillData);
    setModalType("edit");
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedSkill(null);
  };

  return (
    <div>
      {!loading ? (
        <div className="flex h-[98vh] w-full flex-col rounded-md bg-white px-2 shadow-md dark:bg-gray-500">
          <div className="flex w-full justify-between gap-4 p-2">
            <h1 className="text-3xl font-bold text-gray-600 dark:text-gray-300">
              Skills
            </h1>
            {role === "admin" && (
              <button
                onClick={() => setModalType("create")}
                className="rounded-md border p-2 hover:bg-primary_purple_table dark:border-white dark:hover:bg-primary_purple"
              >
                Create New Skill
              </button>
            )}
          </div>
          <div className="overflow-y-scroll pr-1">
            <SearchableTable
              columns={Columns({
                // Call Columns as a function
                onSkillDelete: handleSkillDelete,
                onSkillEdit: handleEditSkill,
              })}
              data={skills}
              handleRowSelect={handleRowSelect}
              page="skills"
            />
          </div>
          {/* Modal component */}
          {modalType && (
            <Modal
              table="skill"
              type={modalType}
              data={selectedSkill}
              closeModal={closeModal}
            />
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Page;
