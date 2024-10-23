import { Pie, PieChart, LabelList } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A pie chart with a custom label";

const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
];

const chartConfig = {
  qiymat: {
    label: "Qiymat",
  },
};

export function MyPieChart({ chartData }) {
  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[350px] w-full"
    >
      <PieChart>
        <ChartTooltip
          content={<ChartTooltipContent nameKey="qiymat" hideLabel />}
        />
        <Pie
          fill="hsl(var(--chart-1))"
          data={chartData}
          dataKey="value"
          fontSize={20}
          labelLine={true}
          label={({ payload, ...props }) => {
            return (
              <text
                cx={props.cx}
                cy={props.cy}
                x={props.x}
                y={props.y}
                textAnchor={props.textAnchor}
                dominantBaseline={props.dominantBaseline}
                fill="hsla(var(--foreground))"
              >
                {`${payload.value}`}
              </text>
            );
          }}
          nameKey="value "
        >
          <LabelList
            dataKey="key"
            className="fill-background"
            stroke="none"
            fontSize={14}
            formatter={(value) => value}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
