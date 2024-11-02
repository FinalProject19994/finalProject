import React, { useEffect, useRef } from "react";
import Sigma from "sigma";
import Graph from "graphology";
import { random } from "graphology-layout";
import data from "@/lib/data";

const SigmaGraph = () => {
  const containerRef = useRef(null);
  const sigmaInstanceRef = useRef(null);

  useEffect(() => {
    const graph = new Graph();

    // Populate the graph using the `data`
    data.forEach((courseData) => {
      const { course, activities } = courseData;

      // Add course node
      graph.addNode(course, {
        label: course,
        size: 15,
        color: "#fff48d",
        originalColor: "#fff48d",
      });

      activities.forEach((activity) => {
        const { title, skills } = activity;
        const activityId = `${course}-${title}`;

        // Add activity node and edge to its course
        if (!graph.hasNode(activityId)) {
          graph.addNode(activityId, {
            label: title,
            size: 10,
            color: "#D396FF",
            originalColor: "#D396FF",
          });
          graph.addEdge(course, activityId, {
            color: "#999",
            originalColor: "#999",
          });
        }

        // Add skill nodes and edges to their activity
        skills.forEach((skill) => {
          if (!graph.hasNode(skill)) {
            graph.addNode(skill, {
              label: skill,
              size: 10,
              color: "#5DE000",
              originalColor: "#5DE000",
            });
          }
          graph.addEdge(activityId, skill, {
            color: "#999",
            originalColor: "#999",
          });
        });
      });
    });

    // Assign random layout for node positions
    random.assign(graph);

    // Initialize Sigma instance
    if (containerRef.current) {
      sigmaInstanceRef.current = new Sigma(graph, containerRef.current, {
        defaultNodeColor: "#999",
        defaultEdgeColor: "#999",
      });

      // Set up hover events
      sigmaInstanceRef.current.on("enterNode", ({ node }) => {
        // Get connected nodes and edges
        const connectedNodes = new Set();
        const connectedEdges = new Set();

        // Add the hovered node
        connectedNodes.add(node);

        // Get neighbors and connecting edges
        graph.forEachNeighbor(node, (neighbor) => {
          connectedNodes.add(neighbor);
        });

        graph.forEachEdge(node, (edge) => {
          connectedEdges.add(edge);
        });

        // Dim all nodes and edges first
        graph.forEachNode((node) => {
          graph.setNodeAttribute(node, "color", "#ddd");
        });

        graph.forEachEdge((edge) => {
          graph.setEdgeAttribute(edge, "color", "#eee");
        });

        // Highlight connected nodes and edges
        connectedNodes.forEach((nodeId) => {
          const originalColor = graph.getNodeAttribute(nodeId, "originalColor");
          graph.setNodeAttribute(nodeId, "color", originalColor);
        });

        connectedEdges.forEach((edgeId) => {
          const originalColor = graph.getEdgeAttribute(edgeId, "originalColor");
          graph.setEdgeAttribute(edgeId, "color", originalColor);
        });
      });

      // Reset on leave
      sigmaInstanceRef.current.on("leaveNode", () => {
        // Reset all nodes and edges to their original colors
        graph.forEachNode((node) => {
          const originalColor = graph.getNodeAttribute(node, "originalColor");
          graph.setNodeAttribute(node, "color", originalColor);
        });

        graph.forEachEdge((edge) => {
          const originalColor = graph.getEdgeAttribute(edge, "originalColor");
          graph.setEdgeAttribute(edge, "color", originalColor);
        });
      });
    }

    // Cleanup on unmount
    return () => {
      sigmaInstanceRef.current?.kill();
    };
  }, []);

  return <div ref={containerRef} className="h-full w-full rounded-md" />;
};

export default SigmaGraph;
