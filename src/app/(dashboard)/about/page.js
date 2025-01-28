"use client";
import * as d3 from "d3";
import { useEffect, useRef } from "react";

const Page = () => {
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
    const aspectRatio = 1.2;

    const updateChartSize = () => {
      const containerWidth = container.node().offsetWidth;
      const width = containerWidth * 0.9; // Use 90% of container width
      const height = width / aspectRatio; // Maintain aspect ratio

      const topMargin = height * 0.1;
      const bottomMargin = height * 0.1;

      // Now you can use them in verticalShift calculation
      const verticalShift = -height / 2 - topMargin + 25;

      const radius = width / 6.7;

      container.selectAll("*").remove(); // Clear the previous chart

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

      const svg = container.append("svg");
      svg.attr("viewBox", [
        -width / 2,
        verticalShift,
        width,
        height + topMargin,
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
        .attr("pointer-events", (d) =>
          arcVisible(d.current) ? "auto" : "none",
        )
        .attr("d", (d) => arc(d.current));

      path
        .filter((d) => d.children)
        .style("cursor", "pointer")
        .on("click", clicked);

      const label = svg
        .append("g")
        .attr("pointer-events", "none")
        .attr("text-anchor", "middle")
        .style("user-select", "none")
        .selectAll("text")
        .data(root.descendants().slice(1))
        .join("text")
        .attr("fill-opacity", (d) => +labelVisible(d.current))
        .attr("transform", (d) => labelTransform(d.current))
        .style("font-size", () => (window.innerWidth < 768 ? "4px" : "9px"))
        .text((d) => d.data.name);

      const parent = svg
        .append("circle")
        .datum(root)
        .attr("r", radius)
        .attr("fill", "none")
        .attr("pointer-events", "all")
        .on("click", clicked);

      function clicked(_, p) {
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

        const t = svg.transition().duration(750);

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
          .attr("pointer-events", (d) =>
            arcVisible(d.target) ? "auto" : "none",
          )
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
          return `rotate(${x - 90}) translate(${y},0) rotate(${
            x < 180 ? 0 : 180
          })`;
        } else {
          return `rotate(${x - 90}) translate(${y},0) rotate(${
            x < 180 ? 0 : 180
          })`;
        }
      }
    };

    // Initial chart size
    updateChartSize();

    // Add event listener for window resize
    window.addEventListener("resize", updateChartSize);

    // Clean up on unmount
    return () => {
      container.selectAll("*").remove();
      window.removeEventListener("resize", updateChartSize);
    };
  }, [data]);
  return (
    <div className="mx-4 my-2 flex h-[98%] overflow-auto rounded-lg bg-white p-4 shadow-md dark:bg-gray-500">
      <div className="flex w-[45%] flex-col text-justify">
        <h1 className="mb-6 ml-4 pt-4 text-4xl font-bold text-primary_purple dark:text-primary_purple_table">
          About Core Skills
        </h1>
        <p className="text-md mb-6 text-gray-700 dark:text-gray-300">
          Core Skills Hub is dedicated to transforming how core skills are
          tracked, managed, and cultivated in engineering education. Whether
          you&apos;re a lecturer or student, our platform seamlessly integrates
          into the learning journey, enabling efficient tracking and development
          of essential soft skills. From communication and teamwork to
          problem-solving and leadership, we aim to enhance the holistic
          development of every student.
        </p>

        <section>
          <h2 className="mb-4 text-2xl font-semibold text-primary_purple dark:text-primary_purple_table">
            Why Core Skills Matter
          </h2>
          <p className="text-md mb-6 text-gray-700 dark:text-gray-300">
            In today&apos;s workforce, possessing technical knowledge alone
            isn&apos;t enough. Core skills such as adaptability, collaboration,
            and creativity are critical for success in dynamic and
            interdisciplinary work environments. Core Skills Hub bridges this
            gap, giving educators the tools to ensure that students are prepared
            for real-world challenges.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold text-primary_purple dark:text-primary_purple_table">
            Our Mission
          </h2>
          <p className="text-md mb-6 text-gray-700 dark:text-gray-300">
            We strive to empower educators with a flexible, user-friendly system
            that integrates into their teaching workflow. Our goal is to ensure
            that students graduate with both technical expertise and critical
            soft skills needed for their careers. Core Skills Hub brings
            together advanced data visualization, intuitive design, and a focus
            on long-term skill development to create a unified, impactful
            platform.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold text-primary_purple dark:text-primary_purple_table">
            Join Us in Transforming Education
          </h2>
          <p className="text-md mb-6 text-gray-700 dark:text-gray-300">
            Core Skills Hub envisions a future where education not only imparts
            knowledge but also nurtures the soft skills essential for
            professional success. We are dedicated to reshaping engineering
            education, ensuring that every student’s potential is fully realized
            in the ever-evolving global workforce.
          </p>
        </section>

        <section>
          <h3 className="mb-4 text-2xl font-semibold text-primary_purple dark:text-primary_purple_table">
            Contact Us
          </h3>
          <p className="text-md mb-6 text-gray-700 dark:text-gray-300">
            Interested in learning more? Feel free to reach out to us at&nbsp;
            <a
              href="mailto:finalprojectcoreskills@gmail.com"
              className="text-blue-500 underline dark:text-primary_purple"
            >
              contact@coreskillshub.com
            </a>
            , or explore our platform to discover how Core Skills Hub can
            enhance your teaching and student success.
          </p>
        </section>
      </div>

      <div className="w-[55%] text-center">
        <div ref={chartRef} />
        <span className="select-none text-xs text-gray-500 dark:text-gray-300">
          Click on a category to focus on its skills - Click in the center to
          zoom out
        </span>
      </div>
    </div>
  );
};

export default Page;
