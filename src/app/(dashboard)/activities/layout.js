"use client";
import ForceDirectedGraph from "@/components/ForceDirectedGraph";
import { links, nodes } from "@/lib/data";
import Legend from "@/components/ui/Legend";

const Page = ({ children }) => {
  return (
    <div className="flex h-[90dvh] flex-col gap-4 overflow-clip px-4 md:flex-row">
      {/* LEFT */}
      <div className="w-1/2">{children}</div>
      {/* <SkillsGraph nodes={skills} links={[]} /> */}

      {/* RIGHT */}
      <div className="flex w-1/2 gap-4 rounded-md bg-white text-3xl shadow-md">
        <div className="relative left-2 top-0 z-10 w-min">
          <h1 className="w-max bg-transparent text-lg font-semibold">
            Activities Graph
          </h1>
          <Legend />
        </div>
        <ForceDirectedGraph nodes={nodes} links={links} page="activity" />
        <div className="h-full rounded-md bg-white shadow-md">
          <div className="relative left-2 top-0 z-10"></div>
        </div>
      </div>
    </div>
  );
};

export default Page;
