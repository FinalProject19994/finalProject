import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const ForceDirectedGraph = ({ nodes, links }) => {
  const svgRef = useRef();
  const containerRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 400, height: 300 });

  useEffect(() => {
    // Function to update dimensions based on the parent container
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    // Set initial dimensions
    updateDimensions();

    // Observe changes in the size of the parent container
    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(containerRef.current);

    // Cleanup observer on component unmount
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear any existing elements

    // Set dimensions from state
    const { width, height } = dimensions;

    // Create a simulation
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

    // Create links
    const link = svg
      .append("g")
      .selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .attr("stroke-width", 1)
      .attr("stroke", "#999");

    // Create nodes
    const node = svg.append("g").selectAll("g").data(nodes).enter().append("g");

    const nodeCircle = node
      .append("circle")
      .attr("r", 8)
      .attr("fill", (d) =>
        d.type === "skill"
          ? "#69b3a2"
          : d.type === "activity"
            ? "#f7dc6f"
            : "#ff5252",
      )
      .call(
        d3
          .drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended),
      );

    const nodeText = node
      .append("text")
      .attr("x", 12)
      .attr("dy", ".35em")
      .attr("font-size", "12px")
      .text((d) => d.id);

    // Update simulation on each tick
    simulation.nodes(nodes).on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("transform", (d) => `translate(${d.x}, ${d.y})`);
    });

    simulation.force("link").links(links);

    // Dragging functions
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
