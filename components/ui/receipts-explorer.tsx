"use client"

import { useMemo, useState } from "react"
import { Search, Filter, X } from "lucide-react"

type Receipt = {
  id: string
  timestamp: string
  date: string
  hour: number
  period: string
  track: string
  artist: string
  album: string
  duration: number
  platform: string
  skipped: boolean
  reasonStart: string
  reasonEnd: string
}

type Props = {
  receipts: Receipt[]
}

export default function ReceiptsExplorer({ receipts }: Props) {
  const [search, setSearch] = useState("")
  const [period, setPeriod] = useState("All")
  const [showSkipped, setShowSkipped] = useState(true)

  const filtered = useMemo(() => {
    const query = search.toLowerCase().trim()

    return receipts
      .filter((receipt) => {
        const matchesSearch =
          !query ||
          receipt.track.toLowerCase().includes(query) ||
          receipt.artist.toLowerCase().includes(query) ||
          receipt.album.toLowerCase().includes(query)

        const matchesPeriod =
          period === "All" || receipt.period === period

        const matchesSkipped =
          showSkipped || !receipt.skipped

        return matchesSearch && matchesPeriod && matchesSkipped
      })
      .slice(0, 20)
  }, [receipts, search, period, showSkipped])

  const periods = ["All", "Morning", "Afternoon", "Evening", "Night"]

  return (
    <section className="border-t border-white/10 py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-10">
          <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-white/40">
            The archive
          </p>

          <h2 className="font-serif text-4xl md:text-5xl">
            Every moment leaves a trace.
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/50">
            Search through the receipts and discover the small moments
            that make up the larger story.
          </p>
        </div>

        <div className="mb-6 flex flex-col gap-3 md:flex-row">

          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search a song, artist or album..."
              className="w-full rounded-full border border-white/10 bg-white/[0.03] py-3 pl-11 pr-4 text-sm outline-none transition focus:border-white/30"
            />
          </div>

          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="rounded-full border border-white/10 bg-black px-5 py-3 text-sm text-white/70 outline-none"
          >
            {periods.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <button
            onClick={() => setShowSkipped(!showSkipped)}
            className={`rounded-full border px-5 py-3 text-sm transition ${
              showSkipped
                ? "border-white/20 text-white"
                : "border-white/10 text-white/40"
            }`}
          >
            <Filter size={14} className="mr-2 inline" />
            Skips {showSkipped ? "included" : "hidden"}
          </button>

        </div>

        <div className="mb-4 flex items-center justify-between text-xs text-white/30">
          <span>
            Showing {filtered.length} receipts
          </span>

          {search && (
            <button
              onClick={() => setSearch("")}
              className="flex items-center gap-1 hover:text-white"
            >
              <X size={12} />
              Clear search
            </button>
          )}
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10">

          {filtered.length === 0 ? (
            <div className="p-12 text-center text-sm text-white/40">
              No receipts found.
            </div>
          ) : (
            filtered.map((receipt, index) => (
              <div
                key={`${receipt.id}-${index}`}
                className="grid grid-cols-[90px_1fr_auto] gap-4 border-b border-white/5 px-5 py-4 last:border-0 md:grid-cols-[120px_1fr_180px_100px]"
              >

                <div className="text-xs text-white/30">
                  {receipt.date}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm text-white">
                    {receipt.track}
                  </p>

                  <p className="mt-1 truncate text-xs text-white/40">
                    {receipt.artist} · {receipt.album}
                  </p>
                </div>

                <div className="hidden text-xs text-white/30 md:block">
                  {receipt.period}
                </div>

                <div className="text-right text-xs text-white/30">
                  {receipt.hour}:00
                </div>

              </div>
            ))
          )}

        </div>

      </div>
    </section>
  )
}