"use client";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

const chartConfig = {
  Activities: {
    label: "Activities",
    color: "#5DE000",
  },
  Skills: {
    label: "Skills",
    color: "#FFE4AD",
  },
};

const chartData = [
  { month: "January", Activities: 186, Skills: 80 },
  { month: "February", Activities: 305, Skills: 200 },
  { month: "March", Activities: 237, Skills: 120 },
  { month: "April", Activities: 73, mSkills: 190 },
  { month: "May", Activities: 209, Skills: 130 },
  { month: "June", Activities: 214, Skills: 140 },
  { month: "July", Activities: 186, Skills: 80 },
  { month: "August", Activities: 305, Skills: 200 },
  { month: "September", Activities: 237, Skills: 120 },
  { month: "October", Activities: 73, mSkills: 190 },
  { month: "November", Activities: 209, Skills: 130 },
  { month: "December", Activities: 214, Skills: 140 },
];

export default function Chart() {
  return (
    <ChartContainer
      config={chartConfig}
      className="h-[90%] min-h-[200px] w-full"
    >
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={5}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} verticalAlign="top" />
        <Bar dataKey="Activities" fill="#d396ff" radius={4} />
        <Bar dataKey="Skills" fill="#FFE4AD" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
