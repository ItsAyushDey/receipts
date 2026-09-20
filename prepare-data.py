import pandas as pd
import json
from pathlib import Path

# --------------------------------------------------
# CONFIG
# --------------------------------------------------

INPUT_FILE = r"C:\Users\deyay\Downloads\spotify_history.csv"
OUTPUT_FILE = Path("data/spotify.json")

# --------------------------------------------------
# LOAD DATA
# --------------------------------------------------

print("Loading Spotify history...")

df = pd.read_csv(INPUT_FILE)

print(f"Loaded {len(df):,} listening records.")

# --------------------------------------------------
# CLEAN DATA
# --------------------------------------------------

df["ts"] = pd.to_datetime(df["ts"], errors="coerce")

df["ms_played"] = pd.to_numeric(
    df["ms_played"],
    errors="coerce"
).fillna(0)

df["skipped"] = (
    df["skipped"]
    .astype(str)
    .str.upper()
    .eq("TRUE")
)

# Remove invalid timestamps
df = df.dropna(subset=["ts"])

# Sort chronologically
df = df.sort_values("ts")

# --------------------------------------------------
# DERIVED TIME DATA
# --------------------------------------------------

df["date"] = df["ts"].dt.strftime("%Y-%m-%d")
df["hour"] = df["ts"].dt.hour
df["day"] = df["ts"].dt.day_name()
df["month"] = df["ts"].dt.strftime("%Y-%m")

def get_period(hour):
    if 5 <= hour < 12:
        return "Morning"
    elif 12 <= hour < 17:
        return "Afternoon"
    elif 17 <= hour < 22:
        return "Evening"
    else:
        return "Night"

df["period"] = df["hour"].apply(get_period)

# --------------------------------------------------
# BASIC STATISTICS
# --------------------------------------------------

total_records = len(df)

total_minutes = round(
    df["ms_played"].sum() / 1000 / 60,
    1
)

total_hours = round(total_minutes / 60, 1)

unique_artists = int(
    df["artist_name"].nunique()
)

unique_tracks = int(
    df["track_name"].nunique()
)

unique_albums = int(
    df["album_name"].nunique()
)

skipped_count = int(
    df["skipped"].sum()
)

# --------------------------------------------------
# TOP ARTISTS
# --------------------------------------------------

top_artists = (
    df["artist_name"]
    .value_counts()
    .head(10)
    .reset_index()
)

top_artists.columns = ["name", "plays"]

top_artists = top_artists.to_dict(
    orient="records"
)

# --------------------------------------------------
# TOP TRACKS
# --------------------------------------------------

top_tracks = (
    df["track_name"]
    .value_counts()
    .head(10)
    .reset_index()
)

top_tracks.columns = ["name", "plays"]

top_tracks = top_tracks.to_dict(
    orient="records"
)

# --------------------------------------------------
# LISTENING BY HOUR
# --------------------------------------------------

hourly = (
    df.groupby("hour")
    .size()
    .reindex(range(24), fill_value=0)
    .reset_index(name="plays")
)

hourly = hourly.to_dict(
    orient="records"
)

# --------------------------------------------------
# LISTENING BY PERIOD
# --------------------------------------------------

period_order = [
    "Morning",
    "Afternoon",
    "Evening",
    "Night"
]

period_counts = (
    df["period"]
    .value_counts()
    .reindex(
        period_order,
        fill_value=0
    )
)

period_data = [
    {
        "name": period,
        "plays": int(period_counts[period])
    }
    for period in period_order
]

# --------------------------------------------------
# LISTENING BY MONTH
# --------------------------------------------------

monthly = (
    df.groupby("month")
    .size()
    .reset_index(name="plays")
)

monthly = monthly.to_dict(
    orient="records"
)

# --------------------------------------------------
# RECENT / REPRESENTATIVE RECEIPTS
# --------------------------------------------------

receipts_df = df.tail(100)

receipts = []

for _, row in receipts_df.iterrows():

    receipts.append({
        "id": row["spotify_track_uri"],
        "timestamp": row["ts"].isoformat(),
        "date": row["date"],
        "hour": int(row["hour"]),
        "period": row["period"],
        "track": row["track_name"],
        "artist": row["artist_name"],
        "album": row["album_name"],
        "duration": int(row["ms_played"]),
        "platform": row["platform"],
        "skipped": bool(row["skipped"]),
        "reasonStart": row["reason_start"],
        "reasonEnd": row["reason_end"]
    })

# --------------------------------------------------
# FINAL DATASET
# --------------------------------------------------

output = {
    "stats": {
        "totalRecords": total_records,
        "totalMinutes": total_minutes,
        "totalHours": total_hours,
        "uniqueArtists": unique_artists,
        "uniqueTracks": unique_tracks,
        "uniqueAlbums": unique_albums,
        "skipped": skipped_count
    },

    "topArtists": top_artists,
    "topTracks": top_tracks,
    "hourly": hourly,
    "periods": period_data,
    "monthly": monthly,
    "receipts": receipts
}

# --------------------------------------------------
# WRITE JSON
# --------------------------------------------------

OUTPUT_FILE.parent.mkdir(
    parents=True,
    exist_ok=True
)

with open(
    OUTPUT_FILE,
    "w",
    encoding="utf-8"
) as f:

    json.dump(
        output,
        f,
        ensure_ascii=False,
        separators=(",", ":")
    )

print()
print("Done!")
print(f"Output: {OUTPUT_FILE}")
print()
print("Stats:")
print(f"  Records:       {total_records:,}")
print(f"  Hours listened:{total_hours:,}")
print(f"  Artists:       {unique_artists:,}")
print(f"  Tracks:        {unique_tracks:,}")
print(f"  Albums:        {unique_albums:,}")
print(f"  Skipped:       {skipped_count:,}")