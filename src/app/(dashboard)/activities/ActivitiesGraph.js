"use client";
import ForceDirectedGraph from "@/components/ForceDirectedGraph";
import Legend from "@/components/ui/Legend";
import { useContext, useEffect, useState } from "react";
import { fetchGraphData, prepareGraphData } from "@/lib/fetchGraphData";
import { SelectedActivityIdContext } from "@/context/ActivitiesContext";

const ActivitiesGraph = () => {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const { selectedActivityId } = useContext(SelectedActivityIdContext);

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
        selectedNodeId={selectedActivityId}
      />
    </>
  );
};

export default ActivitiesGraph;
