"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

import data from "@/data/spotify.json";

const hourlyData = data.hourly.map((item) => ({
  hour: `${String(item.hour).padStart(2, "0")}:00`,
  plays: item.plays,
}));

export default function ListeningChart() {
  return (
    <div className="w-full">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-white/35">
            Your rhythm
          </p>

          <h3 className="mt-2 text-2xl font-medium tracking-tight">
            When your attention goes somewhere else
          </h3>
        </div>

        <span className="hidden text-xs text-white/25 sm:block">
          24 HOURS
        </span>
      </div>

      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={hourlyData}
            margin={{
              top: 10,
              right: 0,
              left: 0,
              bottom: 0,
            }}
          >
            <XAxis
              dataKey="hour"
              tick={{
                fill: "rgba(255,255,255,0.3)",
                fontSize: 10,
              }}
              tickLine={false}
              axisLine={false}
              interval={2}
            />

            <Tooltip
              cursor={{
                fill: "rgba(255,255,255,0.04)",
              }}
              contentStyle={{
                background: "#111111",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "10px",
                color: "#fff",
                fontSize: "12px",
              }}
              labelStyle={{
                color: "rgba(255,255,255,0.5)",
              }}
              formatter={(value) => [
                Number(value).toLocaleString(),
                "plays",
              ]}
            />

            <Bar
              dataKey="plays"
              fill="rgba(255,255,255,0.72)"
              radius={[3, 3, 0, 0]}
              animationDuration={1000}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}