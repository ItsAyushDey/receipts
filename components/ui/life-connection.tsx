"use client"

import data from "@/data/spotify.json"
import lifeData from "@/data/life-data.json"

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-IN").format(value)
}

function money(value: number) {
  return `₹${new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(value)}`
}

export default function LifeConnection() {
  const spotifyPeak = [...data.periods].sort(
    (a, b) => b.plays - a.plays
  )[0]

  const india = lifeData.india
  const household = lifeData.household

  const indiaTopCategory = [...india.categories].sort(
    (a, b) => b.amount - a.amount
  )[0]

  const householdTopCategory = [...household.categories].sort(
    (a, b) => b.amount - a.amount
  )[0]

  return (
    <section className="border-t border-white/10 py-24">
      <div className="mx-auto max-w-7xl px-6">

        {/* HEADER */}
        <div className="mb-12 grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end">
          <div>
            <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-white/40">
              One life · three trails
            </p>

            <h2 className="max-w-3xl font-serif text-4xl leading-tight md:text-6xl">
              The same days leave different traces.
            </h2>
          </div>

          <p className="max-w-md text-sm leading-7 text-white/40 md:justify-self-end">
            Listening, personal transactions and household spending are
            different records of the same underlying life. Put together,
            they reveal a richer story than any one dataset can.
          </p>
        </div>

        {/* THREE DATASETS */}
        <div className="grid gap-4 md:grid-cols-3">

          {/* SOUND */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
            <p className="text-[10px] uppercase tracking-[0.25em] text-white/30">
              Sound
            </p>

            <h3 className="mt-3 text-xl font-medium">
              Listening patterns
            </h3>

            <div className="mt-8">
              <p className="text-xs text-white/30">
                Dominant period
              </p>

              <p className="mt-2 font-serif text-3xl">
                {spotifyPeak.name}
              </p>

              <p className="mt-3 text-xs leading-5 text-white/35">
                {formatNumber(spotifyPeak.plays)} recorded listening
                moments fall into this part of the day.
              </p>
            </div>
          </div>

          {/* PERSONAL TRANSACTIONS */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
            <p className="text-[10px] uppercase tracking-[0.25em] text-white/30">
              Personal transactions
            </p>

            <h3 className="mt-3 text-xl font-medium">
              Where money went
            </h3>

            <div className="mt-8">
              <p className="text-xs text-white/30">
                Largest category
              </p>

              <p className="mt-2 font-serif text-2xl">
                {indiaTopCategory.name}
              </p>

              <p className="mt-3 text-sm text-white/60">
                {money(indiaTopCategory.amount)}
              </p>

              <p className="mt-1 text-xs text-white/30">
                {formatNumber(indiaTopCategory.count)} transactions
              </p>
            </div>
          </div>

          {/* HOUSEHOLD */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
            <p className="text-[10px] uppercase tracking-[0.25em] text-white/30">
              Household
            </p>

            <h3 className="mt-3 text-xl font-medium">
              Everyday life
            </h3>

            <div className="mt-8">
              <p className="text-xs text-white/30">
                Largest category
              </p>

              <p className="mt-2 font-serif text-2xl">
                {householdTopCategory.name}
              </p>

              <p className="mt-3 text-sm text-white/60">
                {money(householdTopCategory.amount)}
              </p>

              <p className="mt-1 text-xs text-white/30">
                {formatNumber(householdTopCategory.count)} transactions
              </p>
            </div>
          </div>

        </div>

        {/* CROSS TRACE */}
        <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
          <p className="text-[10px] uppercase tracking-[0.25em] text-white/30">
            Cross-trace · 04
          </p>

          <p className="mt-4 max-w-3xl font-serif text-2xl leading-relaxed md:text-3xl">
            Your life is not one timeline. It is several records happening
            at once — what you listen to, what you spend, and what happens
            around you.
          </p>

          <div className="mt-6 flex flex-wrap gap-3 text-xs text-white/35">

            <span className="rounded-full border border-white/10 px-4 py-2">
              {formatNumber(data.stats.totalRecords)} listening moments
            </span>

            <span className="rounded-full border border-white/10 px-4 py-2">
              {formatNumber(india.stats.transactions)} personal transactions
            </span>

            <span className="rounded-full border border-white/10 px-4 py-2">
              {formatNumber(household.stats.transactions)} household transactions
            </span>

          </div>
        </div>

      </div>
    </section>
  )
}