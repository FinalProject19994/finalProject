import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { CircleHelp } from "lucide-react";
import { useRouter } from "next/navigation";

const GraphInfo = () => {
  const router = useRouter();

  const handleGoHelp = () => {
    router.push("/help");
  };

  return (
    <HoverCard openDelay={50} closeDelay={300}>
      <HoverCardTrigger asChild>
        <CircleHelp className="h-5 w-5 cursor-pointer text-gray-500 hover:text-gray-700 dark:text-gray-200 dark:hover:text-gray-200" />
      </HoverCardTrigger>
      <HoverCardContent className="w-[30rem] dark:bg-gray-500 dark:text-white">
        <div className="flex justify-between space-x-4">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">Graph Information</h4>
            <p className="text-sm">
              This <b>graph</b> visualizes connections between courses,
              activities, and skills.
            </p>
            <p className="text-sm">
              Use the mouse wheel to <b>zoom</b>, drag nodes to <b>move</b>, and
              hover to <b>explore connections</b>. <b>Click</b> a node to
              navigate to the relevant page.
            </p>
            <div className="flex items-center pt-2">
              <button
                onClick={handleGoHelp}
                className="rounded-sm bg-primary_purple px-2 py-1 text-sm font-semibold text-white dark:bg-primary_purple_table dark:text-gray-600"
              >
                Learn more<span className="ml-1 text-xs">{`>`}</span>
              </button>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default GraphInfo;
