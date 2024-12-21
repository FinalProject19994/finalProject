"use client";
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const SunburstChart = () => {
  const chartRef = useRef(null);

  const data = {
    name: "root",
    children: [
      {
        name: "Mindset",
        color: "#a7f9ab",
        children: [
          { name: "Development of skills", value: 25, color: "#a7f9ab" },
          {
            name: "Coping with success and failure",
            value: 25,
            color: "#a7f9ab",
          },
          { name: "Moving from comfort zone", value: 25, color: "#a7f9ab" },
          { name: "Effort investing in learning", value: 25, color: "#a7f9ab" },
        ],
      },
      {
        name: "Thinking development",
        color: "#c3ebfa",
        children: [
          { name: "Creative thinking", value: 25, color: "#c3ebfa" },
          { name: "Analytical thinking", value: 25, color: "#c3ebfa" },
          { name: "Evaluative-critical thinking", value: 25, color: "#c3ebfa" },
          { name: "System thinking", value: 25, color: "#c3ebfa" },
        ],
      },
      {
        name: "Emotional quotient",
        color: "#FFC36D",
        children: [
          { name: "Awareness of emotions", value: 25, color: "#FFC36D" },
          { name: "Familiarity and acceptance", value: 25, color: "#FFC36D" },
          { name: "Self regulation of emotions", value: 25, color: "#FFC36D" },
          { name: "Relationship building", value: 25, color: "#FFC36D" },
          { name: "Collaboration in the team", value: 25, color: "#FFC36D" },
          { name: "Empathy", value: 25, color: "#FFC36D" },
          {
            name: "Uncertainty and stress handling",
            value: 25,
            color: "#FFC36D",
          },
        ],
      },
      {
        name: "Professional self",
        color: "#D396FF",
        children: [
          { name: "Meaning", value: 25, color: "#D396FF" },
          { name: "Positive framing", value: 25, color: "#D396FF" },
          { name: "Social relationship", value: 25, color: "#D396FF" },
          { name: "Wellbeing", value: 25, color: "#D396FF" },
        ],
      },
    ],
  };

  useEffect(() => {
    const container = d3.select(chartRef.current);
    const width = container.node().offsetWidth;
    const height = window.innerHeight * 0.75;
    const radius = width / 8;

    const hierarchy = d3
      .hierarchy(data)
      .sum((d) => d.value)
      .sort((a, b) => b.value - a.value);
    const root = d3.partition().size([2 * Math.PI, hierarchy.height + 1])(
      hierarchy,
    );
    root.each((d) => (d.current = d));

    const arc = d3
      .arc()
      .startAngle((d) => d.x0)
      .endAngle((d) => d.x1)
      .padAngle((d) => Math.min((d.x1 - d.x0) / 2, 0.005))
      .padRadius(radius * 1.5)
      .innerRadius((d) => d.y0 * radius)
      .outerRadius((d) => Math.max(d.y0 * radius, d.y1 * radius - 1));

    const svg = d3
      .create("svg")
      .attr("viewBox", [
        -width / 2,
        -height / 2 - 45,
        width,
        window.innerHeight * 0.85,
      ]);

    const path = svg
      .append("g")
      .selectAll("path")
      .data(root.descendants().slice(1))
      .join("path")
      .attr("fill", (d) => d.data.color || "#ccc")
      .attr("fill-opacity", (d) =>
        arcVisible(d.current) ? (d.children ? 1 : 1) : 0,
      )
      .attr("pointer-events", (d) => (arcVisible(d.current) ? "auto" : "none"))
      .attr("d", (d) => arc(d.current));

    path
      .filter((d) => d.children)
      .style("cursor", "pointer")
      .on("click", clicked);

    // TODO: Create a line break in the label to fit it inside the circle

    const label = svg
      .append("g")
      .attr("pointer-events", "none")
      .attr("text-anchor", "middle")
      .style("user-select", "none")
      .selectAll("text")
      .data(root.descendants().slice(1))
      .join("text")
      .attr("dy", "0.35em")
      .attr("fill-opacity", (d) => +labelVisible(d.current))
      .attr("transform", (d) => labelTransform(d.current))
      .style("font-size", (d) => (window.innerWidth < 768 ? "4px" : "12px"))
      .text((d) => d.data.name);

    const parent = svg
      .append("circle") //Inner circle
      .datum(root)
      .attr("r", radius)
      .attr("fill", "none")
      .attr("pointer-events", "all")
      .on("click", clicked);

    function clicked(event, p) {
      parent.datum(p.parent || root);
      root.each(
        (d) =>
          (d.target = {
            x0:
              Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) *
              2 *
              Math.PI,
            x1:
              Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) *
              2 *
              Math.PI,
            y0: Math.max(0, d.y0 - p.depth),
            y1: Math.max(0, d.y1 - p.depth),
          }),
      );

      const t = svg.transition().duration(500);
      path
        .transition(t)
        .tween("data", (d) => {
          const i = d3.interpolate(d.current, d.target);
          return (t) => (d.current = i(t));
        })
        .filter(function (d) {
          return +this.getAttribute("fill-opacity") || arcVisible(d.target);
        })
        .attr("fill-opacity", (d) =>
          arcVisible(d.target) ? (d.children ? 1 : 1) : 0,
        )
        .attr("pointer-events", (d) => (arcVisible(d.target) ? "auto" : "none"))
        .attrTween("d", (d) => () => arc(d.current));

      label
        .filter(function (d) {
          return +this.getAttribute("fill-opacity") || labelVisible(d.target);
        })
        .transition(t)
        .attr("fill-opacity", (d) => +labelVisible(d.target))
        .attrTween("transform", (d) => () => labelTransform(d.current));
    }

    function arcVisible(d) {
      return d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0;
    }

    function labelVisible(d) {
      return d.y1 <= 3 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03;
    }

    function labelTransform(d) {
      const x = ((d.x0 + d.x1) / 2) * (180 / Math.PI);
      const y = ((d.y0 + d.y1) / 2) * radius;

      if (d.depth === 1) {
        return `rotate(${x - 90 + 15}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
      } else {
        return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
      }
    }

    container.node().appendChild(svg.node());

    // Clean up on unmount
    return () => {
      container.selectAll("*").remove();
    };
  }, [data]);

  return (
    <div className="mx-4 rounded-md bg-white shadow-md">
      <div className="mx-14 flex items-center justify-between">
        <div className="flex w-2/5 flex-col">
          <h1 className="py-2 text-4xl font-semibold italic text-primary_purple">
            Core skills Sunburst
          </h1>
          <p className="text-lg text-gray-700">
            Core skills are essential competencies that empower individuals to
            navigate various personal and professional challenges effectively.
            In the context of a sunburst diagram, these skills are visually
            represented as interconnected segments radiating from a central
            point. This illustrates how foundational abilities—such as
            communication, critical thinking, and problem-solving—branch out
            into specialized skills. This visual structure emphasizes the
            hierarchical relationship between core skills and their sub-skills,
            highlighting the importance of developing a robust foundation to
            support more advanced competencies.
          </p>
        </div>
        <div ref={chartRef} className="h-[88dvh] w-3/5 max-w-[1000px] p-2" />
      </div>
    </div>
  );
};

export default SunburstChart;
