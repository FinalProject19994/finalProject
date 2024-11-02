const transformData = (data) => {
  const nodes = [];
  const links = [];
  const courseMap = new Map();
  const activityMap = new Map();
  const skillSet = new Set();

  // Create nodes and links from the data
  data.forEach((course, courseIndex) => {
    // Add course node
    const courseNode = { id: `Course ${courseIndex + 1}: ${course.course}` };
    nodes.push(courseNode);
    courseMap.set(course.course, courseNode);

    course.activities.forEach((activity, activityIndex) => {
      // Add activity node
      const activityNode = {
        id: `Activity ${activityIndex + 1}: ${activity.title}`,
      };
      nodes.push(activityNode);
      activityMap.set(activity.title, activityNode);

      // Link course to activity
      links.push({ source: courseNode.id, target: activityNode.id });

      // Add skill nodes and links
      activity.skills.forEach((skill) => {
        const skillNode = { id: `Skill: ${skill}` };
        if (!skillSet.has(skillNode.id)) {
          nodes.push(skillNode);
          skillSet.add(skillNode.id);
        }
        // Link activity to skill
        links.push({ source: activityNode.id, target: skillNode.id });
      });
    });
  });

  return { nodes, links };
};

const data = [
  {
    course: "Computer Science 101",
    activities: [
      {
        title: "Design a User Interface",
        skills: ["Design Thinking", "Communication"],
      },
      {
        title: "Debug a Program",
        skills: ["Problem Solving", "Teamwork"],
      },
    ],
  },
  {
    course: "Mechanical Engineering 101",
    activities: [
      {
        title: "Design a Machine",
        skills: ["Creativity", "Engineering"],
      },
      {
        title: "Build a Prototype",
        skills: ["Fabrication", "Time Management"],
      },
    ],
  },
  {
    course: "Electrical Engineering 101",
    activities: [
      {
        title: "Design a Circuit",
        skills: ["Problem Solving", "Critical Thinking"],
      },
      {
        title: "Build a Robot",
        skills: ["Robotics", "Programming"],
      },
    ],
  },
  {
    course: "Civil Engineering 101",
    activities: [
      {
        title: "Design a Bridge",
        skills: ["Problem Solving", "Structural Analysis"],
      },
      {
        title: "Plan a Construction",
        skills: ["Project Management", "Time Management"],
      },
    ],
  },
];

const { nodes, links } = transformData(data);
export { nodes, links };
