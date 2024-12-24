"use client";
import ForceDirectedGraph from "@/components/ForceDirectedGraph";
import Legend from "@/components/ui/Legend";
import { useEffect, useState } from "react";
import { fetchGraphData, prepareGraphData } from "@/lib/fetchGraphData";

const SkillsGraph = () => {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });

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
      <Legend header="Activities Graph" />
      <ForceDirectedGraph
        nodes={graphData.nodes}
        links={graphData.links}
        page="activity"
      />
    </>
  );
};

export default SkillsGraph;
