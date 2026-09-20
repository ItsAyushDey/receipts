import {
  Clock3,
  Disc3,
  Headphones,
  Library,
  Music2,
  Radio,
  Sparkles,
  Users,
} from "lucide-react"

import data from "@/data/spotify.json"
import InsightCard from "@/components/ui/insight-card"
import ListeningChart from "@/components/ui/listening-chart"
import ReceiptsExplorer from "@/components/ui/receipts-explorer"
import LifeSpending from "@/components/ui/life-spending"
import LifeConnection from "@/components/ui/life-connection"

const formatNumber = (value: number) =>
  new Intl.NumberFormat("en-IN").format(value)

const stats = [
  {
    label: "Listening time",
    value: `${data.stats.totalHours.toLocaleString()}h`,
    icon: Clock3,
  },
  {
    label: "Listening moments",
    value: formatNumber(data.stats.totalRecords),
    icon: Headphones,
  },
  {
    label: "Artists discovered",
    value: formatNumber(data.stats.uniqueArtists),
    icon: Users,
  },
  {
    label: "Tracks played",
    value: formatNumber(data.stats.uniqueTracks),
    icon: Music2,
  },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-[#080808] text-white">

      {/* =========================================================
          NAVIGATION
      ========================================================= */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5">
            <Radio className="h-4 w-4" />
          </div>

          <span className="text-sm font-semibold tracking-[0.2em]">
            RECEIPTS
          </span>
        </div>

        <div className="hidden items-center gap-8 text-sm text-white/45 md:flex">
          <a
            className="text-white transition hover:text-white"
            href="#overview"
          >
            Overview
          </a>

          <a
            className="transition hover:text-white"
            href="#insights"
          >
            Insights
          </a>

          <a
            className="transition hover:text-white"
            href="#receipts"
          >
            Receipts
          </a>
        </div>

        <div className="text-xs uppercase tracking-[0.2em] text-white/35">
          A digital life archive
        </div>
      </nav>


      {/* =========================================================
          HERO
      ========================================================= */}
      <section
        id="overview"
        className="mx-auto max-w-7xl px-6 pb-20 pt-16 lg:px-10 lg:pb-28 lg:pt-24"
      >
        <div className="max-w-5xl">

          <div className="mb-7 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.25em] text-white/40">
            <span className="h-px w-8 bg-white/30" />
            Digital Life Archive
          </div>

          <h1 className="max-w-5xl text-6xl font-medium leading-[0.92] tracking-[-0.06em] sm:text-7xl lg:text-[110px]">
            Your life,
            <br />
            <span className="text-white/35">in receipts.</span>
          </h1>

          <p className="mt-8 max-w-xl text-base leading-7 text-white/50 sm:text-lg">
            A digital archive built from the small records we leave behind.
            Songs listened to. Things purchased. Everyday transactions.
            <br />
            <span className="text-white/75">
              One life. Three trails.
            </span>
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#insights"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-white/85"
            >
              <Sparkles className="h-4 w-4" />
              Enter the archive
            </a>

            <a
              href="#receipts"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white/75 transition hover:border-white/30 hover:bg-white/5"
            >
              Read the records
            </a>
          </div>

        </div>
      </section>


      {/* =========================================================
          CORE STATS
      ========================================================= */}
      <section className="border-y border-white/10">
        <div className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">

          {stats.map((stat, index) => {
            const Icon = stat.icon

            return (
              <div
                key={stat.label}
                className={`group px-6 py-8 lg:px-10 lg:py-10 ${
                  index < stats.length - 1
                    ? "border-r border-white/10"
                    : ""
                }`}
              >
                <Icon className="mb-8 h-5 w-5 text-white/30 transition group-hover:text-white" />

                <p className="text-3xl font-medium tracking-tight sm:text-4xl">
                  {stat.value}
                </p>

                <p className="mt-2 text-xs uppercase tracking-[0.18em] text-white/35">
                  {stat.label}
                </p>
              </div>
            )
          })}

        </div>
      </section>


      {/* =========================================================
          THE ARCHIVE
      ========================================================= */}
      <section
        id="insights"
        className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32"
      >
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">

          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.25em] text-white/35">
              The archive
            </p>

            <h2 className="text-4xl font-medium tracking-[-0.04em] sm:text-5xl">
              A thousand songs can say more than a thousand words.
            </h2>
          </div>

          <div className="space-y-6 text-lg leading-8 text-white/45">

            <p>
              Every play is a tiny receipt. A timestamp. A track. An artist.
              Sometimes a skip. Sometimes a song repeated until it becomes
              part of a routine.
            </p>

            <p>
              But music is only one trace. Spending records and household
              transactions tell different parts of the same story.
            </p>

            <div className="flex flex-wrap gap-3 pt-3">

              <div className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-white/50">
                {formatNumber(data.stats.uniqueAlbums)} albums
              </div>

              <div className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-white/50">
                {formatNumber(data.stats.skipped)} skips
              </div>

              <div className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-white/50">
                24 hours tracked
              </div>

            </div>
          </div>

        </div>
      </section>


      {/* =========================================================
          LISTENING PATTERN
      ========================================================= */}
      <section className="border-t border-white/10">

        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">

          <div className="mb-10 grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end">

            <div>
              <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-white/35">
                Listening pattern
              </p>

              <h2 className="max-w-3xl font-serif text-4xl leading-[0.95] md:text-6xl">
                When your attention goes somewhere else.
              </h2>
            </div>

            <p className="max-w-md text-sm leading-7 text-white/40 md:justify-self-end">
              Your listening history is not just a list of songs. It shows
              when you returned, disappeared, stayed up late, and built
              routines without noticing.
            </p>

          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 lg:p-12">

            <ListeningChart />

            <div className="mt-12">
              <InsightCard />
            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          LIFE BEYOND SOUND
      ========================================================= */}
      <section className="border-t border-white/10">

        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">

          <div className="mb-10 grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end">

            <div>
              <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-white/35">
                Life beyond sound
              </p>

              <h2 className="max-w-3xl font-serif text-4xl leading-[0.95] md:text-6xl">
                What the other receipts reveal.
              </h2>
            </div>

            <p className="max-w-md text-sm leading-7 text-white/40 md:justify-self-end">
              Music captures attention. Transactions capture choices.
              Household records capture everything happening around them.
            </p>

          </div>

          <LifeSpending />

        </div>

      </section>


      {/* =========================================================
          CROSS TRACE
      ========================================================= */}
      <section className="border-t border-white/10">

        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">

          <LifeConnection />

        </div>

      </section>


      {/* =========================================================
          SOUNDTRACK
      ========================================================= */}
      <section
        id="soundtrack"
        className="border-t border-white/10 bg-white/[0.015]"
      >

        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">

          <div className="mb-12 flex items-end justify-between gap-6">

            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.25em] text-white/35">
                What kept returning
              </p>

              <h2 className="text-4xl font-medium tracking-[-0.04em] sm:text-5xl">
                Your soundtrack.
              </h2>
            </div>

            <Disc3 className="hidden h-6 w-6 text-white/20 sm:block" />

          </div>


          <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-5">

            {data.topArtists.slice(0, 10).map((artist, index) => (

              <div
                key={artist.name}
                className="group bg-[#0b0b0b] p-6 transition hover:bg-[#111111]"
              >

                <div className="mb-12 flex items-center justify-between">

                  <span className="text-xs text-white/25">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <Library className="h-4 w-4 text-white/20 transition group-hover:text-white/50" />

                </div>

                <p className="truncate text-lg font-medium">
                  {artist.name}
                </p>

                <p className="mt-1 text-xs text-white/35">
                  {formatNumber(artist.plays)} plays
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* =========================================================
          RECEIPT EXPLORER
      ========================================================= */}
      <section id="receipts">

        <ReceiptsExplorer receipts={data.receipts} />

      </section>


      {/* =========================================================
          FOOTER
      ========================================================= */}
      <footer className="border-t border-white/10">

        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-10 text-xs text-white/25 sm:flex-row sm:items-center sm:justify-between lg:px-10">

          <span>
            RECEIPTS / A DIGITAL LIFE ARCHIVE
          </span>

          <span>
            Built from {formatNumber(data.stats.totalRecords)} listening moments
          </span>

        </div>

      </footer>

    </main>
  )
}