"use client";
import ForceDirectedGraph from "@/components/ForceDirectedGraph";
import Legend from "@/components/ui/Legend";
import { useContext, useEffect, useState } from "react";
import { fetchGraphData, prepareGraphData } from "@/lib/fetchGraphData";
import { SelectedSkillIdContext } from "@/context/SkillsContext";

const SkillsGraph = () => {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const { selectedSkillId } = useContext(SelectedSkillIdContext);

  useEffect(() => {
    const fetchData = async () => {
      const rawData = await fetchGraphData();
      const processedData = prepareGraphData(rawData);
      setGraphData(processedData);
    };

    fetchData();
  }, []);

  return (
    <>
      <Legend header="Skills Graph" />
      <ForceDirectedGraph
        nodes={graphData.nodes}
        links={graphData.links}
        page="skill"
        selectedNodeId={selectedSkillId}
      />
    </>
  );
};

export default SkillsGraph;
