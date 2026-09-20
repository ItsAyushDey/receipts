import pandas as pd
import json
from pathlib import Path

HOME = Path.home()
DOWNLOADS = HOME / "Downloads"
OUT = Path("data/life-data.json")

# -----------------------------
# LOAD DATA
# -----------------------------

india = pd.read_csv(
    DOWNLOADS / "Augmented_IndiaTransactMultiFacet2024.csv"
)

household = pd.read_csv(
    DOWNLOADS / "Daily Household Transactions.csv"
)

# -----------------------------
# CLEAN INDIA DATA
# -----------------------------

india["amount"] = pd.to_numeric(india["amt"], errors="coerce").fillna(0)
india["datetime"] = pd.to_datetime(
    india["trans_date_trans_time"],
    errors="coerce"
)

india["category"] = india["category"].fillna("Uncategorized")
india["merchant"] = india["merchant"].fillna("Unknown merchant")
india["city"] = india["city"].fillna("Unknown")
india["state"] = india["state"].fillna("Unknown")

# -----------------------------
# CLEAN HOUSEHOLD DATA
# -----------------------------

household["amount"] = pd.to_numeric(
    household["Amount"],
    errors="coerce"
).fillna(0)

household["datetime"] = pd.to_datetime(
    household["Date"],
    errors="coerce",
    dayfirst=True
)

household["Category"] = household["Category"].fillna("Uncategorized")
household["Subcategory"] = household["Subcategory"].fillna("Other")
household["Note"] = household["Note"].fillna("")

# -----------------------------
# INDIA STATS
# -----------------------------

india_expense = india[india["amount"] > 0]

india_categories = (
    india_expense.groupby("category")["amount"]
    .agg(["sum", "count"])
    .sort_values("sum", ascending=False)
    .head(8)
    .reset_index()
)

india_merchants = (
    india_expense.groupby("merchant")["amount"]
    .agg(["sum", "count"])
    .sort_values("sum", ascending=False)
    .head(8)
    .reset_index()
)

india_monthly = (
    india_expense.dropna(subset=["datetime"])
    .assign(month=lambda x: x["datetime"].dt.to_period("M").astype(str))
    .groupby("month")["amount"]
    .sum()
    .reset_index()
)

india_hourly = (
    india_expense.dropna(subset=["datetime"])
    .assign(hour=lambda x: x["datetime"].dt.hour)
    .groupby("hour")["amount"]
    .sum()
    .reset_index()
)

fraud_count = int(
    india["is_fraud"].fillna(0).astype(float).sum()
)

# -----------------------------
# HOUSEHOLD STATS
# -----------------------------

house_expense = household[
    household["Income/Expense"].astype(str).str.lower() == "expense"
]

house_income = household[
    household["Income/Expense"].astype(str).str.lower() == "income"
]

house_categories = (
    house_expense.groupby("Category")["amount"]
    .agg(["sum", "count"])
    .sort_values("sum", ascending=False)
    .head(8)
    .reset_index()
)

house_monthly = (
    house_expense.dropna(subset=["datetime"])
    .assign(month=lambda x: x["datetime"].dt.to_period("M").astype(str))
    .groupby("month")["amount"]
    .sum()
    .reset_index()
)

# -----------------------------
# REPRESENTATIVE RECEIPTS
# -----------------------------

india_receipts = india_expense[
    ["datetime", "merchant", "category", "amount", "city", "state", "is_fraud"]
].dropna(subset=["datetime"]).sort_values("datetime", ascending=False).head(30)

india_receipts = [
    {
        "date": row.datetime.strftime("%d %b %Y"),
        "time": row.datetime.strftime("%I:%M %p"),
        "merchant": str(row.merchant),
        "category": str(row.category),
        "amount": round(float(row.amount), 2),
        "location": f"{row.city}, {row.state}",
        "fraud": bool(float(row.is_fraud)) if pd.notna(row.is_fraud) else False,
        "source": "India transactions",
    }
    for row in india_receipts.itertuples()
]

house_receipts = house_expense[
    ["datetime", "Mode", "Category", "Subcategory", "Note", "amount", "Currency"]
].dropna(subset=["datetime"]).sort_values("datetime", ascending=False).head(30)

house_receipts = [
    {
        "date": row.datetime.strftime("%d %b %Y"),
        "time": row.datetime.strftime("%I:%M %p"),
        "mode": str(row.Mode),
        "category": str(row.Category),
        "subcategory": str(row.Subcategory),
        "note": str(row.Note),
        "amount": round(float(row.amount), 2),
        "currency": str(row.Currency),
        "source": "Household transactions",
    }
    for row in house_receipts.itertuples()
]

# -----------------------------
# FINAL DATASET
# -----------------------------

output = {
    "india": {
        "stats": {
            "transactions": int(len(india)),
            "totalSpent": round(float(india_expense["amount"].sum()), 2),
            "averageTransaction": round(float(india_expense["amount"].mean()), 2),
            "fraudFlags": fraud_count,
            "cities": int(india["city"].nunique()),
            "merchants": int(india["merchant"].nunique()),
        },
        "categories": [
            {
                "name": str(row.category),
                "amount": round(float(row["sum"]), 2),
                "count": int(row["count"]),
            }
            for _, row in india_categories.iterrows()
        ],
        "merchants": [
            {
                "name": str(row.merchant),
                "amount": round(float(row["sum"]), 2),
                "count": int(row["count"]),
            }
            for _, row in india_merchants.iterrows()
        ],
        "monthly": [
            {
                "month": str(row.month),
                "amount": round(float(row.amount), 2),
            }
            for _, row in india_monthly.iterrows()
        ],
        "hourly": [
            {
                "hour": int(row.hour),
                "amount": round(float(row.amount), 2),
            }
            for _, row in india_hourly.iterrows()
        ],
        "receipts": india_receipts,
    },

    "household": {
        "stats": {
            "transactions": int(len(household)),
            "totalSpent": round(float(house_expense["amount"].sum()), 2),
            "totalIncome": round(float(house_income["amount"].sum()), 2),
            "averageExpense": round(float(house_expense["amount"].mean()), 2),
            "categories": int(household["Category"].nunique()),
        },
        "categories": [
            {
                "name": str(row.Category),
                "amount": round(float(row["sum"]), 2),
                "count": int(row["count"]),
            }
            for _, row in house_categories.iterrows()
        ],
        "monthly": [
            {
                "month": str(row.month),
                "amount": round(float(row.amount), 2),
            }
            for _, row in house_monthly.iterrows()
        ],
        "receipts": house_receipts,
    },
}

OUT.parent.mkdir(parents=True, exist_ok=True)

with open(OUT, "w", encoding="utf-8") as f:
    json.dump(output, f, indent=2, ensure_ascii=False)

print(f"Created {OUT}")
print(f"India transactions: {len(india)}")
print(f"Household transactions: {len(household)}")