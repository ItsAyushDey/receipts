"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Clock3, Link2, Moon, Music2 } from "lucide-react";

import data from "@/data/spotify.json";

type Receipt = {
  id: string;
  timestamp: string;
  date: string;
  hour: number;
  period: string;
  track: string;
  artist: string;
  album: string;
  duration: number;
  platform: string;
  skipped: boolean;
  reasonStart: string;
  reasonEnd: string;
};

type Connection = {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  detail: string;
  filter: (receipt: Receipt) => boolean;
};

const receipts = data.receipts as Receipt[];

function formatHour(hour: number) {
  if (hour === 0) return "12 AM";
  if (hour === 12) return "12 PM";
  if (hour > 12) return `${hour - 12} PM`;
  return `${hour} AM`;
}

export default function ConnectionsExplorer() {
  const [selected, setSelected] = useState(0);

  const connections = useMemo<Connection[]>(() => {
    // 1. Strongest artist + period relationship
    const artistPeriod = new Map<string, number>();

    for (const receipt of receipts) {
      if (receipt.skipped) continue;

      const key = `${receipt.artist}|||${receipt.period}`;
      artistPeriod.set(key, (artistPeriod.get(key) || 0) + 1);
    }

    let strongestArtist = "";
    let strongestPeriod = "";
    let strongestCount = 0;

    for (const [key, count] of artistPeriod) {
      if (count > strongestCount) {
        const [artist, period] = key.split("|||");
        strongestArtist = artist;
        strongestPeriod = period;
        strongestCount = count;
      }
    }

    // 2. Strongest hour
    const hourCounts = new Map<number, number>();

    for (const receipt of receipts) {
      if (receipt.skipped) continue;

      hourCounts.set(
        receipt.hour,
        (hourCounts.get(receipt.hour) || 0) + 1
      );
    }

    let peakHour = 0;
    let peakCount = 0;

    for (const [hour, count] of hourCounts) {
      if (count > peakCount) {
        peakHour = hour;
        peakCount = count;
      }
    }

    // 3. Most repeated artist
    const artistCounts = new Map<string, number>();

    for (const receipt of receipts) {
      if (receipt.skipped) continue;

      artistCounts.set(
        receipt.artist,
        (artistCounts.get(receipt.artist) || 0) + 1
      );
    }

    let repeatedArtist = "";
    let repeatedCount = 0;

    for (const [artist, count] of artistCounts) {
      if (count > repeatedCount) {
        repeatedArtist = artist;
        repeatedCount = count;
      }
    }

    return [
      {
        title: `${strongestArtist} × ${strongestPeriod}`,
        subtitle: "Artist meets a part of your day",
        icon: <Link2 className="h-4 w-4" />,
        detail: `${strongestArtist} appears ${strongestCount.toLocaleString()} times during your ${strongestPeriod.toLowerCase()} listening.`,
        filter: (r) =>
          !r.skipped &&
          r.artist === strongestArtist &&
          r.period === strongestPeriod,
      },
      {
        title: `${formatHour(peakHour)} × your listening`,
        subtitle: "Your most active hour",
        icon: <Clock3 className="h-4 w-4" />,
        detail: `${formatHour(peakHour)} is your strongest listening hour, with ${peakCount.toLocaleString()} recorded plays.`,
        filter: (r) => !r.skipped && r.hour === peakHour,
      },
      {
        title: `${repeatedArtist} × repetition`,
        subtitle: "The artist that keeps returning",
        icon: <Music2 className="h-4 w-4" />,
        detail: `${repeatedArtist} appears ${repeatedCount.toLocaleString()} times across your listening history.`,
        filter: (r) => !r.skipped && r.artist === repeatedArtist,
      },
    ];
  }, []);

  const activeConnection = connections[selected];

  const matchingReceipts = useMemo(() => {
    return receipts
      .filter(activeConnection.filter)
      .slice(0, 8);
  }, [activeConnection]);

  return (
    <div>
      <div className="mb-10">
        <p className="text-xs uppercase tracking-[0.25em] text-white/35">
          Connections
        </p>

        <h2 className="mt-3 max-w-2xl text-3xl font-medium tracking-[-0.03em] sm:text-4xl">
          The dots were never random.
        </h2>

        <p className="mt-4 max-w-xl text-sm leading-6 text-white/40">
          Your receipts become more interesting when different parts of your
          digital life overlap. Choose a connection to explore the evidence
          behind it.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {connections.map((connection, index) => (
          <button
            key={connection.title}
              onClick={() => setSelected(index)}
                aria-pressed={selected === index}
            className={`group rounded-xl border p-5 text-left transition-all ${
              selected === index
                ? "border-white/30 bg-white/[0.07]"
                : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
            }`}
          >
            <div className="mb-8 flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/50">
                {connection.icon}
              </div>

              <ArrowRight
                className={`h-4 w-4 transition-transform ${
                  selected === index
                    ? "translate-x-1 text-white"
                    : "text-white/20"
                }`}
              />
            </div>

            <p className="text-xs uppercase tracking-[0.15em] text-white/30">
              Pattern {String(index + 1).padStart(2, "0")}
            </p>

            <h3 className="mt-2 text-lg font-medium text-white">
              {connection.title}
            </h3>

            <p className="mt-2 text-xs text-white/35">
              {connection.subtitle}
            </p>
          </button>
        ))}
      </div>

      <div className="mt-4 overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]">
        <div className="border-b border-white/10 p-6 sm:p-8">
          <p className="text-xs uppercase tracking-[0.2em] text-white/30">
            What we found
          </p>

          <p className="mt-3 max-w-2xl text-base leading-7 text-white/65">
            {activeConnection.detail}
          </p>
        </div>

        <div>
          <div className="border-b border-white/10 px-6 py-4 text-[10px] uppercase tracking-[0.2em] text-white/25 sm:px-8">
            Evidence · first {matchingReceipts.length} matching receipts
          </div>

          {matchingReceipts.map((receipt, index) => (
            <div
              key={`${receipt.id}-${index}`}
              className="grid gap-2 border-b border-white/5 px-6 py-4 last:border-0 sm:grid-cols-[100px_1fr_1fr] sm:px-8"
            >
              <span className="text-xs text-white/30">
                {receipt.date}
              </span>

              <div>
                <p className="text-sm text-white/75">
                  {receipt.track}
                </p>

                <p className="mt-1 text-xs text-white/30">
                  {receipt.artist}
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs text-white/25 sm:justify-end">
                <Moon className="h-3 w-3" />
                {formatHour(receipt.hour)} · {receipt.period}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}