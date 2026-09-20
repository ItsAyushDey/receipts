import { Moon, Sun, TrendingUp } from "lucide-react";

import data from "@/data/spotify.json";

function getPeakHour() {
  return data.hourly.reduce((peak, current) => {
    return current.plays > peak.plays ? current : peak;
  });
}

function getDominantPeriod() {
  return data.periods.reduce((peak, current) => {
    return current.plays > peak.plays ? current : peak;
  });
}

function formatHour(hour: number) {
  if (hour === 0) return "12 AM";
  if (hour === 12) return "12 PM";
  if (hour > 12) return `${hour - 12} PM`;
  return `${hour} AM`;
}

export default function InsightCard() {
  const peakHour = getPeakHour();
  const dominantPeriod = getDominantPeriod();

  const total = data.stats.totalRecords;

  const periodPercentage = Math.round(
    (dominantPeriod.plays / total) * 100
  );

  return (
    <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-2">
      {/* Peak hour */}
      <div className="bg-[#0b0b0b] p-7 sm:p-9">
        <div className="mb-10 flex items-center justify-between">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10">
            <TrendingUp className="h-4 w-4 text-white/50" />
          </div>

          <span className="text-[10px] uppercase tracking-[0.2em] text-white/25">
            Pattern 01
          </span>
        </div>

        <p className="text-xs uppercase tracking-[0.2em] text-white/35">
          Peak listening hour
        </p>

        <h3 className="mt-3 text-4xl font-medium tracking-[-0.04em]">
          {formatHour(peakHour.hour)}
        </h3>

        <p className="mt-3 max-w-sm text-sm leading-6 text-white/40">
          This is when your listening activity reaches its highest point.
          {` `}
          <span className="text-white/65">
            {peakHour.plays.toLocaleString()} plays
          </span>{" "}
          were recorded during this hour.
        </p>
      </div>

      {/* Dominant period */}
      <div className="bg-[#0b0b0b] p-7 sm:p-9">
        <div className="mb-10 flex items-center justify-between">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10">
            {dominantPeriod.name === "Night" ? (
              <Moon className="h-4 w-4 text-white/50" />
            ) : (
              <Sun className="h-4 w-4 text-white/50" />
            )}
          </div>

          <span className="text-[10px] uppercase tracking-[0.2em] text-white/25">
            Pattern 02
          </span>
        </div>

        <p className="text-xs uppercase tracking-[0.2em] text-white/35">
          Your dominant period
        </p>

        <h3 className="mt-3 text-4xl font-medium tracking-[-0.04em]">
          {dominantPeriod.name}
        </h3>

        <p className="mt-3 max-w-sm text-sm leading-6 text-white/40">
          {dominantPeriod.name} accounts for approximately{" "}
          <span className="text-white/65">
            {periodPercentage}%
          </span>{" "}
          of all your listening activity.
        </p>
      </div>
    </div>
  );
}