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
      .force("charge", d3.forceManyBody().strength(-20))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .on("tick", ticked);

    // Color map for types
    const typeColors = {
      course: "#D396FF",
      skill: "#5DE000",
      activity: "#90DCF3",
    };

    const linkColors = {
      course: "#8dd3c7",
      skill: "#fccde5",
      activity: "#bebada",
    };

    // Create links
    const link = zoomGroup
      .append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(memoizedData.links)
      .enter()
      .append("line")
      .attr("stroke", (d) => linkColors[d.type] || "#aaa")
      .attr("stroke-width", 0.75);

    // Create nodes
    const node = zoomGroup
      .append("g")
      .attr("class", "nodes")
      .selectAll("circle")
      .data(memoizedData.nodes)
      .enter()
      .append("circle")
      .attr("r", (d) => {
        switch (d.type) {
          case "course":
            return 12;
          case "activity":
            return 10;
          case "skill":
            return 8;
          default:
            return 8; // Default size
        }
      })
      .attr("fill", (d) => typeColors[d.type] || "#ccc")
      .call(
        d3
          .drag()
          .on("start", dragStarted)
          .on("drag", dragged)
          .on("end", dragEnded),
      )
      // Hover effects for nodes
      .on("mouseenter", (event, d) => {
        const nodeColor = typeColors[d.type] || "#ccc";

        // Highlight hovered node
        d3.select(event.target)
          .transition()
          .duration(100)
          .attr("r", 15) // Increase size
          .style("opacity", 1); // Fully opaque

        // Dim unconnected nodes
        node
          .filter((n) => n.id !== d.id)
          .transition()
          .duration(100)
          .style("opacity", 0.3); // Slightly transparent

        // Dim unconnected links
        link
          .filter((l) => l.source.id !== d.id && l.target.id !== d.id)
          .transition()
          .duration(100)
          .style("opacity", 0.3); // Slightly transparent

        // Highlight connected links and change color to match node
        link
          .filter((l) => l.source.id === d.id || l.target.id === d.id)
          .transition()
          .duration(100)
          .style("opacity", 1) // Fully opaque
          .attr("stroke", nodeColor); // Match node color

        // Highlight connected nodes
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
          .style("opacity", 1) // Fully opaque
          .attr("r", 15); // Increase size of connected nodes
      })
      .on("mouseleave", (event, d) => {
        const originalColor = typeColors[d.type] || "#ccc";

        // Reset hovered node
        d3.select(event.target)
          .transition()
          .duration(200)
          .attr("r", (d) => {
            switch (d.type) {
              case "course":
                return 12;
              case "activity":
                return 10;
              case "skill":
                return 8;
              default:
                return 8; // Default size
            }
          }) // Reset size dynamically
          .attr("fill", originalColor) // Revert color
          .style("opacity", 1); // Fully opaque

        // Reset all nodes
        node
          .transition()
          .duration(200)
          .attr("fill", (d) => typeColors[d.type] || "#ccc") // Revert color
          .attr("r", (d) => {
            switch (d.type) {
              case "course":
                return 12;
              case "activity":
                return 10;
              case "skill":
                return 8;
              default:
                return 8; // Default size
            }
          }) // Reset size dynamically
          .style("opacity", 1); // Fully opaque

        // Reset all links
        link
          .transition()
          .duration(200)
          .attr("stroke", (d) => linkColors[d.type] || "#aaa") // Revert color
          .style("opacity", 1); // Fully opaque
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
      .style("fill", (d) => typeColors[d.type] || "#333");

    function ticked() {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);

      labels.attr("x", (d) => d.x + 12).attr("y", (d) => d.y + 4);
    }

    function dragStarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.03).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragEnded(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
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
