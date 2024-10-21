"use client";
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const data = {
  name: "root",
  children: [
    {
      name: "Mindset",
      children: [
        { name: "Development of skills", value: 25 },
        { name: "Coping with success and failure", value: 25 },
        { name: "Moving from comfort zone", value: 25 },
        { name: "Effort investing in learning", value: 25 },
      ],
    },
    {
      name: "Thinking development",
      children: [
        { name: "Creative thinking", value: 25 },
        { name: "Analytical thinking", value: 25 },
        { name: "Evaluative-critical thinking", value: 25 },
        { name: "System thinking", value: 25 },
      ],
    },
    {
      name: "Emotional quotient",
      children: [
        { name: "Awareness of emotions", value: 25 },
        { name: "Familiarity and acceptance", value: 25 },
        { name: "Self regulation of emotions", value: 25 },
        { name: "Relationship building", value: 25 },
        { name: "Collaboration in the team", value: 25 },
        { name: "Empathy", value: 25 },
        { name: "Uncertainty and stress handling", value: 25 },
      ],
    },
    {
      name: "Professional self",
      children: [
        { name: "Meaning", value: 25 },
        { name: "Positive framing", value: 25 },
        { name: "Social relationship", value: 25 },
        { name: "Wellbeing", value: 25 },
      ],
    },
  ],
};

const Page = () => {
  const svgRef = useRef();
  let duration = 750;
  let i = 0;

  useEffect(() => {
    d3.select(svgRef.current).selectAll("*").remove();

    const width = Math.min(window.innerWidth * 0.9, 800); // Maximum width
    const height = Math.min(window.innerHeight * 0.9, 600); // Maximum height

    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", `0 0 ${width} ${height}`) // Set viewBox
      .append("g") // Append a group for the tree
      .attr("transform", `translate(40,0)`); // Center the graph horizontally with some padding

    const root = d3.hierarchy(data);
    root.x0 = height / 2; // Center vertically
    root.y0 = 0;

    const treeLayout = d3.tree().size([height, width - 160]);

    // Collapse all children except the root
    root.children.forEach(collapse);

    function collapse(d) {
      if (d.children) {
        d._children = d.children;
        d._children.forEach(collapse);
        d.children = null;
      }
    }

    update(root);

    function update(source) {
      const treeData = treeLayout(root);
      const nodes = treeData.descendants();
      const links = treeData.descendants().slice(1);

      nodes.forEach((d) => {
        d.y = d.depth * 180; // Set the horizontal distance between nodes
      });

      const node = svg
        .selectAll("g.node")
        .data(nodes, (d) => d.id || (d.id = ++i));

      const nodeEnter = node
        .enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", (d) => `translate(${source.y0},${source.x0})`)
        .on("click", (event, d) => {
          d.children = d.children ? null : d._children;
          update(d);
        });

      nodeEnter
        .append("circle")
        .attr("r", 5)
        .style("fill", (d) => (d._children ? "#555" : "#999"))
        .transition()
        .duration(duration)
        .attr("r", 10);

      nodeEnter
        .append("text")
        .attr("dy", ".35em")
        .attr("x", (d) => (d.children || d._children ? -13 : 13))
        .attr("text-anchor", (d) =>
          d.children || d._children ? "end" : "start",
        )
        .text((d) => d.data.name);

      const nodeUpdate = nodeEnter.merge(node);

      nodeUpdate
        .transition()
        .duration(duration)
        .attr("transform", (d) => `translate(${d.y},${d.x})`);

      nodeUpdate
        .select("circle")
        .attr("r", 5)
        .style("fill", (d) => (d._children ? "#555" : "#999"));

      const nodeExit = node
        .exit()
        .transition()
        .duration(duration)
        .attr("transform", (d) => `translate(${source.y},${source.x})`)
        .remove();

      nodeExit.select("circle").attr("r", 1e-6);
      nodeExit.select("text").style("fill-opacity", 1e-6);

      const link = svg.selectAll("path.link").data(links, (d) => d.id);

      const linkEnter = link
        .enter()
        .insert("path", "g")
        .attr("class", "link")
        .attr("d", (d) => {
          const o = { x: source.x0, y: source.y0 };
          return diagonal(o, o);
        });

      const linkUpdate = linkEnter.merge(link);

      linkUpdate
        .transition()
        .duration(duration)
        .attr("d", (d) => diagonal(d, d.parent));

      const linkExit = link
        .exit()
        .transition()
        .duration(duration)
        .attr("d", (d) => {
          const o = { x: source.x, y: source.y };
          return diagonal(o, o);
        })
        .remove();

      nodes.forEach((d) => {
        d.x0 = d.x;
        d.y0 = d.y;
      });

      function diagonal(s, d) {
        return `M${s.y},${s.x}C${(s.y + d.y) / 2},${s.x} ${(s.y + d.y) / 2},${
          d.x
        } ${d.y},${d.x}`;
      }
    }
  }, []);

  return (
    <div className="h-full px-4 py-2">
      <div className="rounded-lg bg-white p-8 shadow-lg">
        <svg ref={svgRef}></svg>
      </div>
    </div>
  );
};

export default Page;
