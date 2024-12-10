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
      <div className="relative left-2 top-0 z-10 w-min">
        <Legend />
      </div>
      <ForceDirectedGraph
        nodes={graphData.nodes}
        links={graphData.links}
        page="skill"
      />
    </>
  );
};

export default SkillsGraph;
