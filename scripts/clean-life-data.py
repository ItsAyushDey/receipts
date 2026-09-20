import json

path = "data/life-data.json"

with open(path, "r", encoding="utf-8") as f:
    data = json.load(f)

fields = [
    "date",
    "time",
    "merchant",
    "note",
    "subcategory",
    "category",
    "amount",
    "location",
]

total = 0
unique = 0

for source in data.values():
    if not isinstance(source, dict) or "receipts" not in source:
        continue

    seen = set()
    clean = []

    for receipt in source["receipts"]:
        key = tuple(receipt.get(field, "") for field in fields)

        if key not in seen:
            seen.add(key)
            clean.append(receipt)

    total += len(source["receipts"])
    unique += len(clean)
    source["receipts"] = clean

with open(path, "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Receipts: {total} -> {unique}")