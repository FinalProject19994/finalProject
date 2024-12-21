"use client";
import { useRef, useEffect, useMemo } from "react";
import * as d3 from "d3";

const ForceDirectedGraph = ({ nodes, links }) => {
  const containerRef = useRef(null);

  const memoizedData = useMemo(() => ({ nodes, links }), [nodes, links]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.offsetWidth;
    const height = container.offsetHeight;

    const svg = d3
      .select(container)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const zoomGroup = svg.append("g").attr("class", "zoom-group");

    const zoom = d3
      .zoom()
      .scaleExtent([0.5, 6])
      .on("zoom", (event) => {
        zoomGroup.attr("transform", event.transform);
      });

    svg.call(zoom);

    const simulation = d3
      .forceSimulation(memoizedData.nodes)
      .force(
        "link",
        d3
          .forceLink(memoizedData.links)
          .id((d) => d.id)
          .distance(50),
      )
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .on("tick", ticked);

    // Color map for types
    const typeColors = {
      course: "#D396FF",
      skill: "#5DE000",
      activity: "#90DCF3",
    };

    // Map of skill categories to colors
    const categoryColors = {
      Mindset: "#a7f9ab",
      "Emotional quotient": "#FFC36D",
      "Professional self": "#D396FF",
      "Thinking development": "#c3ebfa",
      default: "#AAAAAA", // Fallback color
    };

    // Create links
    const link = zoomGroup
      .append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(memoizedData.links)
      .enter()
      .append("line")
      .attr("stroke", "#aaa")
      .attr("stroke-width", 0.75);

    // Create nodes
    const node = zoomGroup
      .append("g")
      .attr("class", "nodes")
      .selectAll("path")
      .data(memoizedData.nodes)
      .enter()
      .append("path")
      .attr("d", (d) => {
        switch (d.type) {
          case "skill":
            return d3.symbol().type(d3.symbolCircle).size(150)();
          case "activity":
            return d3.symbol().type(d3.symbolSquare).size(400)();
          case "course":
            return d3.symbol().type(d3.symbolDiamond2).size(400)();
          default:
            return null;
        }
      })
      .attr("fill", (d) =>
        d.type === "skill"
          ? categoryColors[d.category]
          : d.type === "course"
            ? "black"
            : "#666666",
      )
      .call(
        d3
          .drag()
          .on("start", dragStarted)
          .on("drag", dragged)
          .on("end", dragEnded),
      )
      // Hover effects for nodes
      .on("mouseenter", (event, d) => {
        if (d.fx !== null && d.fy !== null) return;

        // Preserve current position from the force simulation
        d3.select(event.target)
          .transition()
          .duration(100)
          .attr("transform", `translate(${d.x},${d.y}) scale(1.5)`);

        // Dim unconnected nodes
        node
          .filter((n) => n.id !== d.id)
          .transition()
          .duration(100)
          .style("opacity", 0.3);

        // Dim unconnected links
        link
          .filter((l) => l.source.id !== d.id && l.target.id !== d.id)
          .transition()
          .duration(100)
          .style("opacity", 0.3);

        // Highlight connected links and connected nodes
        link
          .filter((l) => l.source.id === d.id || l.target.id === d.id)
          .transition()
          .duration(100)
          .style("opacity", 1)
          .attr("stroke", categoryColors[d.category] || "#aaa");

        node
          .filter((n) => {
            return (
              n.id === d.id ||
              memoizedData.links.some(
                (l) =>
                  (l.source.id === n.id || l.target.id === n.id) &&
                  (l.source.id === d.id || l.target.id === d.id),
              )
            );
          })
          .transition()
          .duration(100)
          .style("opacity", 1)
          .attr("transform", (n) => `translate(${n.x},${n.y}) scale(1.5)`);
      })
      .on("mouseleave", (event, d) => {
        if (d.fx !== null || d.fy !== null) return;

        d3.select(event.target)
          .transition()
          .duration(200)
          .attr("transform", `translate(${d.x},${d.y}) scale(1)`);

        node.transition().duration(200).style("opacity", 1);
        link
          .transition()
          .duration(200)
          .style("opacity", 1)
          .attr("stroke", "#aaa");
      });

    // Add labels
    const labels = zoomGroup
      .append("g")
      .attr("class", "labels")
      .selectAll("text")
      .data(memoizedData.nodes)
      .enter()
      .append("text")
      .text((d) => d.name)
      .attr("x", 12)
      .attr("y", 4)
      .style("font-size", "10px")
      .style("fill", (d) => categoryColors[d.category] || "#333");

    function ticked() {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("transform", (d) => `translate(${d.x},${d.y})`);

      labels.attr("x", (d) => d.x + 12).attr("y", (d) => d.y + 4);
    }

    function dragStarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.03).restart();
      d.fx = d.x;
      d.fy = d.y;

      // Disable hover transitions during drag
      node.interrupt();
      link.interrupt();
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragEnded(event, d) {
      if (!event.active) simulation.alphaTarget(0); // Allow the simulation to settle naturally

      // Smoothly release the node
      d.fx = null;
      d.fy = null;

      // Ensure no transition is triggered during the physics reset
      d3.select(event.target)
        .interrupt() // Cancel any running transitions
        .transition()
        .duration(0); // Set duration to 0 to ensure immediate rendering
    }

    const resizeObserver = new ResizeObserver(() => {
      const newWidth = container.offsetWidth;
      const newHeight = container.offsetHeight;
      svg.attr("width", newWidth).attr("height", newHeight);
      simulation.force("center", d3.forceCenter(newWidth / 2, newHeight / 2));
      simulation.alpha(1).restart();
    });

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      simulation.stop();
      svg.remove();
    };
  }, [memoizedData]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
      }}
    />
  );
};

export default ForceDirectedGraph;
