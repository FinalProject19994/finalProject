import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const ForceDirectedGraph = ({ nodes, links, page }) => {
  const svgRef = useRef();
  const containerRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const { width, height } = dimensions;

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink()
          .id((d) => d.id)
          .distance(50),
      )
      .force("charge", d3.forceManyBody().strength(-20))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg
      .append("g")
      .selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .attr("stroke-width", 1)
      .attr("stroke", "#999");

    const node = svg.append("g").selectAll("g").data(nodes).enter().append("g");

    const nodeCircle = node
      .append("circle")
      .attr("r", (d) => {
        switch (page) {
          case "skill":
            return d.type === "skill" ? 12 : d.type === "course" ? 10 : 8;
          case "activity":
            return d.type === "activity" ? 12 : d.type === "course" ? 10 : 8;
          case "course":
            return d.type === "course" ? 12 : d.type === "activity" ? 10 : 8;
          default:
            return d.type === "skill" ? 10 : d.type === "course" ? 8 : 6;
        }
      })
      .attr("fill", (d) =>
        d.type === "skill"
          ? "#5de000"
          : d.type === "activity"
            ? "#f7dc6f"
            : d.type === "course"
              ? "#d396ff"
              : "#ccc",
      )
      .call(
        d3
          .drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended),
      )
      .on("mouseover", highlight)
      .on("mouseout", resetHighlight);

    const nodeText = node
      .append("text")
      .attr("x", 12)
      .attr("dy", ".35em")
      .attr("font-size", "12px")
      .attr("fill", (d) =>
        d.type === "skill"
          ? "#5de000"
          : d.type === "activity"
            ? "#f7dc6f"
            : d.type === "course"
              ? "#d396ff"
              : "#ccc",
      )
      .text((d) => d.name);

    simulation.nodes(nodes).on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("transform", (d) => `translate(${d.x}, ${d.y})`);
    });

    simulation.force("link").links(links);

    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    function highlight(event, d) {
      nodeCircle
        .attr("fill", (o) =>
          o === d ||
          links.some(
            (l) =>
              (l.source === d && l.target === o) ||
              (l.target === d && l.source === o),
          )
            ? o.type === "skill"
              ? "#5de000"
              : o.type === "activity"
                ? "#f7dc6f"
                : o.type === "course"
                  ? "#d396ff"
                  : "gray"
            : "gray",
        )
        .attr("r", (o) =>
          o === d ||
          links.some(
            (l) =>
              (l.source === d && l.target === o) ||
              (l.target === d && l.source === o),
          )
            ? o.type === "course"
              ? 14 // Larger radius for highlighted course nodes
              : o.type === "skill"
                ? 12 // Larger radius for highlighted skill nodes
                : o.type === "activity"
                  ? 10 // Larger radius for highlighted activity nodes
                  : 6
            : o.type === "course"
              ? 10 // Default radius
              : o.type === "skill"
                ? 8
                : o.type === "activity"
                  ? 6
                  : 4,
        )
        .attr("opacity", (o) =>
          o === d ||
          links.some(
            (l) =>
              (l.source === d && l.target === o) ||
              (l.target === d && l.source === o),
          )
            ? 1
            : 0.5,
        );

      link
        .attr("stroke", (l) =>
          l.source === d || l.target === d
            ? d.type === "skill"
              ? "#5de000"
              : d.type === "activity"
                ? "#f7dc6f"
                : d.type === "course"
                  ? "#d396ff"
                  : "#999"
            : "gray",
        )
        .attr("opacity", (l) => (l.source === d || l.target === d ? 1 : 0.5));
    }

    function resetHighlight() {
      nodeCircle
        .attr("fill", (d) =>
          d.type === "skill"
            ? "#5de000"
            : d.type === "activity"
              ? "#f7dc6f"
              : d.type === "course"
                ? "#d396ff"
                : "#ccc",
        )
        .attr(
          "r",
          (d) =>
            d.type === "course"
              ? 10 // Default radius for course nodes
              : d.type === "skill"
                ? 8 // Default radius for skill nodes
                : d.type === "activity"
                  ? 6 // Default radius for activity nodes
                  : 4, // Default radius for other nodes
        )
        .attr("opacity", 1);

      link.attr("stroke", "#999").attr("opacity", 1);
    }
  }, [nodes, links, dimensions]);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
      ></svg>
    </div>
  );
};

export default ForceDirectedGraph;
