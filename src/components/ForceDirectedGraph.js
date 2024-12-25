"use client";
import * as d3 from "d3";
import { useEffect, useMemo, useRef } from "react";
import skillsCategories from "@/lib/skillsCategories";

const ForceDirectedGraph = ({ nodes, links }) => {
  const containerRef = useRef(null);
  const memoizedData = useMemo(() => ({ nodes, links }), [nodes, links]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.offsetWidth;
    const height = container.offsetHeight;

    // Create SVG element
    const svg = d3
      .select(container)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    // Create a group for zooming
    const zoomGroup = svg.append("g").attr("class", "zoom-group");

    // Define zoom behavior
    const zoom = d3
      .zoom()
      .scaleExtent([0.5, 6])
      .on("zoom", (event) => {
        zoomGroup.attr("transform", event.transform);
      });

    svg.call(zoom);

    // Initialize force simulation
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

    // Create links
    const link = zoomGroup
      .append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(memoizedData.links)
      .enter()
      .append("line")
      .attr("stroke", "#aaa")
      .attr("stroke-width", 0.75)
      .style("opacity", 1)
      .style("transition", "opacity 0.2s");

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
          ? skillsCategories[d.category]
          : d.type === "course"
            ? "black"
            : "#666666",
      )
      .style("opacity", 1)
      .style("transition", "opacity 0.2s")
      .on("mouseover", handleMouseOver)
      .on("mouseout", handleMouseOut)
      .call(
        d3
          .drag()
          .on("start", dragStarted)
          .on("drag", dragged)
          .on("end", dragEnded),
      );

    // Create labels
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
      .style("fill", (d) => skillsCategories[d.category] || "#333")
      .style("opacity", 1)
      .style("transition", "opacity 0.2s");

    // Handle mouse over event
    function handleMouseOver(event, d) {
      const connectedNodeIds = new Set();
      const connectedLinks = memoizedData.links.filter((link) => {
        if (link.source.id === d.id) {
          connectedNodeIds.add(link.target.id);
          return true;
        }
        if (link.target.id === d.id) {
          connectedNodeIds.add(link.source.id);
          return true;
        }
        return false;
      });

      // Highlight connected nodes
      node
        .style("opacity", (node) =>
          node.id === d.id || connectedNodeIds.has(node.id) ? 1 : 0.4,
        )
        .style("cursor", "pointer");

      // Highlight connected links
      link
        .style("opacity", (link) => (connectedLinks.includes(link) ? 1 : 0.4))
        .style("stroke", (link) =>
          connectedLinks.includes(link)
            ? skillsCategories[link.target.category]
            : "#aaa",
        )
        .style("stroke-width", (link) =>
          connectedLinks.includes(link) ? 2 : 0.75,
        );

      // Highlight labels
      labels
        .style("opacity", (label) =>
          label.id === d.id || connectedNodeIds.has(label.id) ? 1 : 0,
        )
        .style("font-size", "14px");
    }

    // Handle mouse out event
    function handleMouseOut() {
      node.style("opacity", 1);
      link
        .style("opacity", 1)
        .style("stroke", "#aaa") // Reset to default color
        .style("stroke-width", 0.75); // Reset to default thickness
      labels.style("opacity", 1).style("font-size", "12px");
    }

    // Update positions on each tick
    function ticked() {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("transform", (d) => `translate(${d.x},${d.y})`);

      labels.attr("x", (d) => d.x + 12).attr("y", (d) => d.y + 4);
    }

    // Handle drag start event
    function dragStarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.03).restart();
      d.fx = d.x;
      d.fy = d.y;
      node.interrupt();
      link.interrupt();
    }

    // Handle drag event
    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    // Handle drag end event
    function dragEnded(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
      d3.select(event.target).interrupt().transition().duration(0);
    }

    // Observe container size changes
    const resizeObserver = new ResizeObserver(() => {
      const newWidth = container.offsetWidth;
      const newHeight = container.offsetHeight;
      svg.attr("width", newWidth).attr("height", newHeight);
      simulation.force("center", d3.forceCenter(newWidth / 2, newHeight / 2));
      simulation.alpha(1).restart();
    });

    resizeObserver.observe(container);

    // Cleanup on unmount
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
