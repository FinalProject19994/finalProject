"use client";
import ForceDirectedGraph from "@/components/ForceDirectedGraph";
import Legend from "@/components/ui/Legend";
import { useContext, useEffect, useState } from "react";
import { fetchGraphData, prepareGraphData } from "@/lib/fetchGraphData";
import { SelectedNodeIdContext } from "./SelectedNodeIdContext";

const SkillsGraph = () => {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const { selectedNodeId } = useContext(SelectedNodeIdContext);

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
        selectedNodeId={selectedNodeId}
      />
    </>
  );
};

export default SkillsGraph;
