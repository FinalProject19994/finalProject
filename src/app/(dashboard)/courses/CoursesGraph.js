"use client";
import ForceDirectedGraph from "@/components/ForceDirectedGraph";
import Legend from "@/components/ui/Legend";
import { useContext, useEffect, useState } from "react";
import { fetchGraphData, prepareGraphData } from "@/lib/fetchGraphData";
import { SelectedCourseIdContext } from "../../../context/CoursesContext";

const CoursesGraph = () => {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const { selectedCourseId } = useContext(SelectedCourseIdContext);

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
      <Legend header="Courses Graph" />
      <ForceDirectedGraph
        nodes={graphData.nodes}
        links={graphData.links}
        page="course"
        selectedNodeId={selectedCourseId}
      />
    </>
  );
};

export default CoursesGraph;
