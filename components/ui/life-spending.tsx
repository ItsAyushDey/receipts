"use client"

import { useMemo, useState } from "react"
import {
  ArrowUpRight,
  CreditCard,
  Home,
  Receipt,
  ShieldAlert,
  Wallet,
} from "lucide-react"
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import data from "@/data/life-data.json"

const lifeData = data as any

type Source = "india" | "household"

const money = (value: number) =>
  `₹${value.toLocaleString("en-IN", {
    maximumFractionDigits: 0,
  })}`

export default function LifeSpending() {
  const [source, setSource] = useState<Source>("india")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const current: any = lifeData[source]

  const categories = useMemo(() => {
    return [...current.categories]
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 6)
  }, [current])

  const receipts: any[] = useMemo(() => {
    if (!selectedCategory) return current.receipts.slice(0, 6)

    return current.receipts
      .filter((receipt: any) => receipt.category === selectedCategory)
      .slice(0, 6)
  }, [current, selectedCategory])

  const chartData: any[] = current.monthly.slice(-12).map((item: any) => ({
    month: item.month.slice(2),
    amount: Math.round(item.amount),
  }))

  return (
    <section className="border-t border-white/10 py-24">
      <div className="mx-auto max-w-7xl px-6">

        {/* INTRO */}
        <div className="mb-12 grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end">
          <div>
            <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-white/40">
              Receipt 02 · Personal spending
            </p>

            <h2 className="max-w-3xl font-serif text-4xl leading-tight md:text-6xl">
              Money leaves a different kind of trace.
            </h2>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/45">
              Purchases, transfers and everyday decisions turn the same life into another kind of record.
            </p>
          </div>

          <div className="text-sm leading-6 text-white/30 md:text-right">
            Two transaction histories.
            <br />
            Thousands of small decisions.
          </div>
        </div>

        {/* SOURCE SWITCHER */}
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            onClick={() => {
              setSource("india")
              setSelectedCategory(null)
            }}
            className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs transition ${
              source === "india"
                ? "border-white/30 bg-white text-black"
                : "border-white/10 bg-white/[0.03] text-white/50 hover:bg-white/[0.06]"
            }`}
          >
            <CreditCard className="h-3.5 w-3.5" />
            India transactions
          </button>

          <button
            onClick={() => {
              setSource("household")
              setSelectedCategory(null)
            }}
            className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs transition ${
              source === "household"
                ? "border-white/30 bg-white text-black"
                : "border-white/10 bg-white/[0.03] text-white/50 hover:bg-white/[0.06]"
            }`}
          >
            <Home className="h-3.5 w-3.5" />
            Household transactions
          </button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-white/10 bg-white/10 md:grid-cols-4">
          <div className="bg-black p-6">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/30">
              Transactions
            </p>
            <p className="mt-3 text-2xl font-medium">
              {current.stats.transactions.toLocaleString()}
            </p>
          </div>

          <div className="bg-black p-6">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/30">
              Total spent
            </p>
            <p className="mt-3 text-2xl font-medium">
              {money(current.stats.totalSpent)}
            </p>
          </div>

          <div className="bg-black p-6">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/30">
              Average
            </p>
            <p className="mt-3 text-2xl font-medium">
              {money(
                source === "india"
                  ? current.stats.averageTransaction
                  : current.stats.averageExpense
              )}
            </p>
          </div>

          <div className="bg-black p-6">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/30">
              {source === "india" ? "Fraud flags" : "Categories"}
            </p>
            <p className="mt-3 text-2xl font-medium">
              {source === "india"
                ? current.stats.fraudFlags.toLocaleString()
                : current.stats.categories}
            </p>
          </div>
        </div>

        {/* PATTERN + CHART */}
        <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_1.6fr]">

          {/* CATEGORY PATTERN */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/30">
                  RECEIPT EVIDENCE
                </p>
                <h3 className="mt-2 text-xl">Where the money went</h3>
              </div>

              <Wallet className="h-5 w-5 text-white/20" />
            </div>

            <div className="space-y-2">
              {categories.map((category) => {
                const active = selectedCategory === category.name

                return (
                  <button
                    key={category.name}
                    onClick={() =>
                      setSelectedCategory(
                        active ? null : category.name
                      )
                    }
                    className={`w-full rounded-xl border p-4 text-left transition ${
                      active
                        ? "border-white/30 bg-white/[0.08]"
                        : "border-white/5 hover:border-white/15 hover:bg-white/[0.04]"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm text-white/80">
                          {category.name}
                        </p>
                        <p className="mt-1 text-xs text-white/30">
                          {category.count.toLocaleString()} transactions
                        </p>
                      </div>

                      <p className="text-sm text-white/60">
                        {money(category.amount)}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>

            <p className="mt-5 text-xs leading-5 text-white/25">
              Click a category to trace it back to individual receipts.
            </p>
          </div>

          {/* MONTHLY CHART */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <div className="mb-6">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/30">
                Timeline
              </p>
              <h3 className="mt-2 text-xl">How spending moved</h3>
            </div>

            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis
                    dataKey="month"
                    tick={{ fill: "rgba(255,255,255,.3)", fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "rgba(255,255,255,.3)", fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) =>
                      value >= 1000
                        ? `₹${Math.round(value / 1000)}k`
                        : `₹${value}`
                    }
                  />
                  <Tooltip
                    contentStyle={{
                      background: "#111",
                      border: "1px solid rgba(255,255,255,.12)",
                      borderRadius: "10px",
                      color: "#fff",
                    }}
                    formatter={(value) => [money(Number(value)), "Spent"]}
                  />
                  <Bar
                    dataKey="amount"
                    fill="rgba(255,255,255,.65)"
                    radius={[3, 3, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* RECEIPT EVIDENCE */}
        <div className="mt-4 overflow-hidden rounded-2xl border border-white/10">

          <div className="flex flex-col gap-3 border-b border-white/10 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/30">
                Receipt evidence
              </p>

              <h3 className="mt-2 text-xl">
                {selectedCategory
                  ? `${selectedCategory} receipts`
                  : "Recent transactions"}
              </h3>
            </div>

            {selectedCategory && (
              <button
                onClick={() => setSelectedCategory(null)}
                className="text-xs text-white/35 hover:text-white"
              >
                Clear filter
              </button>
            )}
          </div>

          {receipts.length === 0 ? (
            <div className="p-10 text-center text-sm text-white/30">
              No representative receipts match this category.
            </div>
          ) : (
            receipts.map((receipt, index) => (
              <div
                key={`${receipt.date}-${receipt.time}-${index}`}
                className="grid gap-3 border-b border-white/5 px-6 py-5 last:border-0 md:grid-cols-[120px_1fr_auto]"
              >
                <div>
                  <p className="text-xs text-white/40">
                    {receipt.date}
                  </p>
                  <p className="mt-1 text-[10px] text-white/20">
                    {receipt.time}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-white/75">
                    {receipt.merchant
                      ? receipt.merchant.replace(/^fraud_/i, "")
                        : receipt.note || receipt.subcategory}
                  </p>

                  <p className="mt-1 text-xs text-white/30">
                    {receipt.category}
                    {"location" in receipt && receipt.location
                      ? ` · ${receipt.location}`
                      : ""}
                  </p>
                </div>

                <div className="flex items-center gap-3 md:justify-end">
                  {"fraud" in receipt && receipt.fraud && (
                    <span className="flex items-center gap-1 rounded-full border border-white/10 px-2 py-1 text-[9px] uppercase tracking-wider text-white/40">
                      <ShieldAlert className="h-3 w-3" />
                      Flag
                    </span>
                  )}

                  <span className="text-sm text-white/70">
                    {money(receipt.amount)}
                  </span>

                  <ArrowUpRight className="h-3.5 w-3.5 text-white/20" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* SMALL STORY FOOTER */}
        <div className="mt-8 flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <Receipt className="mt-1 h-5 w-5 shrink-0 text-white/30" />

          <div>
            <p className="text-sm text-white/65">
              A transaction is tiny on its own.
            </p>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/30">
              Stack thousands of them together and they stop looking like
              numbers. They start looking like habits, routines, places,
              priorities and ordinary days.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}