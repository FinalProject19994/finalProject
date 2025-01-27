const skillsCategories = {
  Mindset: "#a7f9ab",
  "Emotional quotient": "#FFC36D",
  "Professional self": "#D396FF",
  "Thinking development": "#c3ebfa",
  default: "#AAAAAA",
};

const darkSkillsCategories = {
  Mindset: "#C6FBC8",
  "Emotional quotient": "#FFE4AD",
  "Professional self": "#d396ff",
  "Thinking development": "#D9F3FC",
  default: "#AAAAAA",
};

const getColor = (theme, nodeType, skillsCategory) => {
  const categories = theme === "dark" ? darkSkillsCategories : skillsCategories;
  switch (nodeType) {
    case "skill":
      return categories[skillsCategory];
    case "activity":
      return "black";
    case "course":
      return theme === "dark" ? "#CCC" : "#666";
    default:
      return null;
  }
};

export { skillsCategories, darkSkillsCategories, getColor };
