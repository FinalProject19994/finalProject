"use client";
import ForceDirectedGraph from "@/components/ForceDirectedGraph";
import Legend from "@/components/ui/Legend";
import { useContext, useEffect, useState } from "react";
import { fetchGraphData, prepareGraphData } from "@/lib/fetchGraphData";
import { SelectedCourseIdContext } from "../../../context/CoursesContext";

const CoursesGraph = ({ updateTrigger }) => {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const { selectedCourseId } = useContext(SelectedCourseIdContext);

  const refetchGraphData = async () => {
    const rawData = await fetchGraphData();
    const processedData = prepareGraphData(rawData);
    setGraphData(processedData);
  };

  useEffect(() => {
    const fetchData = async () => {
      const rawData = await fetchGraphData();
      const processedData = prepareGraphData(rawData);
      setGraphData(processedData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    refetchGraphData();
  }, [updateTrigger]);

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
