import React from "react";
import ForceDirectedGraph from "@/components/ForceDirectedGraph";
import Legend from "@/components/ui/Legend";
import { links, nodes } from "@/lib/data";

const SkillsGraph = () => {
  return (
    <div className="flex gap-4 rounded-md text-3xl md:w-3/4">
      <div className="h-full w-full rounded-md bg-white shadow-md">
        <div className="relative left-2 top-0 z-10 w-min">
          <h2 className="w-max bg-transparent text-lg font-semibold">
            Skills Graph
          </h2>
          <Legend />
        </div>
        <ForceDirectedGraph nodes={nodes} links={links} page="skill" />
      </div>
    </div>
  );
};

export default SkillsGraph;
