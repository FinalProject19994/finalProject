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

      // Resolve course reference
      let course = null;
      if (activityData.course) {
        const courseDoc = await getDoc(activityData.course);
        if (courseDoc.exists()) {
          course = { id: courseDoc.id, ...courseDoc.data() };
        } else {
          console.warn(
            `Course reference ${activityData.course} not found for activity ${doc.id}`,
          );
        }
      }

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
        course: course, // Add the resolved course here
        skills: resolvedSkills.filter(Boolean), // Remove nulls from unresolved references so unused skills are not included
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
    nodes.push({
      id: course.id,
      name: course.title,
      type: "course",
      semester: course.semester,
      year: course.year,
    });
  });

  // Add skills as nodes
  skills.forEach((skill) => {
    nodes.push({
      id: skill.id,
      name: skill.name,
      type: "skill",
      category: skill.category,
    });
  });

  // Add activities as nodes and links
  activities.forEach((activity) => {
    nodes.push({ id: activity.id, name: activity.title, type: "activity" });

    // Link activity to its course only if the course exists
    if (activity.course && activity.course.id) {
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

  return { nodes, links };
};

export { fetchGraphData, prepareGraphData };
