import { collection, getDocs, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

const fetchGraphData = async () => {
  const [coursesSnapshot, activitiesSnapshot, skillsSnapshot] =
    await Promise.all([
      getDocs(collection(db, "courses")),
      getDocs(collection(db, "activities")),
      getDocs(collection(db, "skills")),
    ]);

  const courses = coursesSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const skills = skillsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const activities = await Promise.all(
    activitiesSnapshot.docs.map(async (doc) => {
      const activityData = doc.data();

      // Resolve skill references
      const resolvedSkills = await Promise.all(
        (activityData.skills || []).map(async (skillRef) => {
          const skillDoc = await getDoc(skillRef);
          return skillDoc.exists()
            ? { id: skillDoc.id, ...skillDoc.data() }
            : null;
        }),
      );

      return {
        id: doc.id,
        ...activityData,
        skills: resolvedSkills.filter(Boolean), // Remove nulls from unresolved references
      };
    }),
  );

  return { courses, activities, skills };
};

const prepareGraphData = ({ courses, activities, skills }) => {
  const nodes = [];
  const links = [];

  // Add courses as nodes
  courses.forEach((course) => {
    nodes.push({ id: course.id, name: course.title, type: "course" });
  });

  // Add skills as nodes
  skills.forEach((skill) => {
    nodes.push({ id: skill.id, name: skill.name, type: "skill" });
  });

  // Add activities as nodes and links
  activities.forEach((activity) => {
    nodes.push({ id: activity.id, name: activity.title, type: "activity" });

    // Link activity to its course
    if (activity.course) {
      links.push({
        source: activity.id,
        target: activity.course.id,
        type: "activity-course",
      });
    }

    // Link activity to its resolved skills
    activity.skills.forEach((skill) => {
      if (nodes.some((node) => node.id === skill.id)) {
        links.push({
          source: activity.id,
          target: skill.id,
          type: "activity-skill",
        });
      }
    });
  });

  skills.forEach((skill) => {
    if (!links.some((link) => link.target === skill.id)) {
      const index = nodes.findIndex((node) => node.id === skill.id);
      if (index > -1) {
        nodes.splice(index, 1);
      }
    }
  });

  return { nodes, links };
};

export { fetchGraphData, prepareGraphData };
