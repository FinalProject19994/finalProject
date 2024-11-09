const dataTest = [
  { id: "course1", name: "Computer Science 101", type: "course" },
  { id: "course2", name: "Mechanical Engineering 101", type: "course" },
  { id: "course3", name: "Electrical Engineering 101", type: "course" },
  { id: "course4", name: "Civil Engineering 101", type: "course" },
  {
    id: "activity1",
    name: "Design a User Interface",
    type: "activity",
    skills: ["Design Thinking", "Communication"],
    course: "course1",
  },
  {
    id: "activity2",
    name: "Debug a Program",
    type: "activity",
    skills: ["Problem Solving", "Teamwork"],
    course: "course1",
  },
  {
    id: "activity3",
    name: "Design a Machine",
    type: "activity",
    skills: ["Creativity", "Engineering"],
    course: "course2",
  },
  {
    id: "activity4",
    name: "Build a Prototype",
    type: "activity",
    skills: ["Fabrication", "Time Management"],
    course: "course2",
  },
  {
    id: "activity5",
    name: "Design a Circuit",
    type: "activity",
    skills: ["Problem Solving", "Critical Thinking"],
    course: "course3",
  },
  {
    id: "activity6",
    name: "Build a Robot",
    type: "activity",
    skills: ["Robotics", "Programming"],
    course: "course3",
  },
  {
    id: "activity7",
    name: "Design a Bridge",
    type: "activity",
    skills: ["Problem Solving", "Structural Analysis"],
    course: "course4",
  },
  {
    id: "activity8",
    name: "Plan a Construction",
    type: "activity",
    skills: ["Project Management", "Time Management"],
    course: "course4",
  },
];

// Prepare nodes and links for D3
const nodes = [];
const links = [];

// Process courses and activities
dataTest.forEach((item) => {
  // Add each item as a node
  nodes.push({
    id: item.id,
    name: item.name,
    type: item.type,
  });

  // Add a link from activity to its course
  if (item.type === "activity" && item.course) {
    links.push({ source: item.id, target: item.course });
  }

  // Add links from activity to each skill
  if (item.skills) {
    item.skills.forEach((skill) => {
      // Add skill node if it doesn’t exist
      if (!nodes.some((n) => n.id === skill)) {
        nodes.push({ id: skill, name: skill, type: "skill" });
      }
      // Add link from skill to activity
      links.push({ source: skill, target: item.id });
    });
  }
});

export { nodes, links };
