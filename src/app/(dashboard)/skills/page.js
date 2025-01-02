"use client";
import Modal from "@/components/Modal";
import Loader from "@/components/ui/Loader";
import { auth, db } from "@/lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { SearchableTable } from "../../../components/SearchableTable";
import { SelectedNodeIdContext } from "../../../context/SkillsContext";
import { columns } from "./columns";
import { doc, getDoc } from "firebase/firestore";

const Page = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState();

  const { selectedNodeId, setSelectedNodeId } = useContext(
    SelectedNodeIdContext,
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
            setRole(docSnap.data()?.role);
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
    if (selectedNodeId === row.id) {
      setSelectedNodeId(null);
      return;
    }
    setSelectedNodeId(row.id);
  };

  return (
    <div>
      {!loading ? (
        <div className="flex h-[98vh] w-full flex-col rounded-md bg-white px-2 shadow-md">
          <div className="flex w-full justify-between gap-4 p-2">
            <h1 className="text-3xl font-bold text-gray-600">Skills</h1>
            {(role === "Admin" || role === "admin") && (
              <Modal table="skill" type="create" data={[]} />
            )}
          </div>
          <div className="overflow-y-scroll pr-1">
            <SearchableTable
              columns={columns}
              data={skills}
              handleRowSelect={handleRowSelect}
              page="skills"
            />
          </div>
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
