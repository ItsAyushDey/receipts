# 🧾 Receipts — Your Life, In Receipts

> A digital archive that turns everyday data into a story.

**Receipts** is an interactive frontend experience built for the WebRush hackathon challenge **"Your Life, In Receipts."**

Instead of presenting personal data as a conventional dashboard or timeline, Receipts treats every record as a small piece of evidence — a song played, a transaction made, or an everyday household expense.

Together, these records reveal patterns in how a life unfolds.

---

## ✦ The Idea

A life doesn't exist in one dataset.

It leaves traces everywhere.

Receipts brings together three different streams of fictional personal data:

- 🎧 **Listening history** — what was played and when
- 💳 **Personal transactions** — where money went
- 🏠 **Household transactions** — everyday spending and routines

The experience lets users move from individual receipts to larger patterns, and finally to connections between seemingly unrelated parts of everyday life.

---

## ✦ What You Can Explore

### 🎵 Listening Patterns

Explore a large listening history through:

- 24-hour listening distribution
- dominant listening periods
- listening moments
- artists and tracks
- repeated listening behavior

The visualization turns raw listening records into a story about **when attention goes somewhere else.**

---

### 💳 Life Beyond Sound

Music is only one trace of a life.

The spending datasets introduce another perspective through:

- transaction counts
- spending categories
- spending amounts
- personal transactions
- household transactions
- category-level patterns

This creates a second record of the same underlying life.

---

### 🔗 Cross-Trace Connections

The most important part of the experience is connecting the datasets.

Instead of treating every dataset independently, Receipts presents them as different records of the same life.

> **"The same days leave different traces."**

The cross-trace section brings together:

- listening behavior
- personal transactions
- household spending

to create a broader picture than any individual dataset can provide.

---

### 🧾 Receipt Explorer

The archive is fully interactive.

Users can:

- search by song
- search by artist
- search by album
- filter by time of day
- include or hide skipped tracks
- inspect individual records

This allows the user to move from the large story back down to the individual evidence behind it.

---

## ✦ Design Philosophy

Receipts deliberately avoids the appearance of a traditional analytics dashboard.

The visual language is inspired by:

- digital archives
- editorial layouts
- physical receipts
- data journals
- minimalist data visualization

Large typography establishes the narrative.

Small metadata labels establish context.

Charts and statistics provide evidence.

The result is intended to feel more like **exploring a personal archive** than reading a spreadsheet.

---

## ✦ Datasets

The project uses three fictionalized data sources.

### Spotify / Listening Dataset

Contains listening records with information including:

- timestamp
- track
- artist
- album
- duration
- listening period
- platform
- skipped status

The processed dataset contains approximately:

- **149,860 listening records**
- **13,839 tracks**
- **7,948 albums**
- **4,113 artists**

---

### India Transactions Dataset

Contains transaction records including:

- transaction timestamp
- merchant
- category
- amount
- location
- customer information
- transaction metadata

Processed records:

- **10,267 transactions**

---

### Daily Household Transactions

Contains everyday household spending information including:

- date
- payment mode
- category
- subcategory
- note
- amount
- income/expense type
- currency

Processed records:

- **2,461 transactions**

---

## ✦ Performance Approach

The original datasets are larger than what should be sent directly to the browser.

Instead of loading raw datasets into the frontend, the project uses a preprocessing step to extract the information required by the experience and generate compact JSON files.

This keeps the deployed frontend:

- fast
- static
- lightweight
- frontend-only

The browser only receives the processed data required for visualization and interaction.

---

## ✦ Tech Stack

- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **Recharts**
- **Lucide React**
- **JSON-based static data**
- **Python / Pandas** for dataset preprocessing

---

## ✦ Project Structure

```text
receipts/
│
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   └── ui/
│       ├── connections-explorer.tsx
│       ├── insight-card.tsx
│       ├── life-connection.tsx
│       ├── life-spending.tsx
│       ├── listening-chart.tsx
│       └── receipts-explorer.tsx
│
├── data/
│   ├── spotify.json
│   └── life-data.json
│
├── scripts/
│   └── prepare-life-data.py
│
├── lib/
│
├── package.json
├── next.config.ts
└── README.md
