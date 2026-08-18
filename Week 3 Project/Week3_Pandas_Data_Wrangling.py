import pandas as pd
import numpy as np

df = pd.read_csv("data.csv")

# Inspect
print(df.head())
print(df.info())
print(df.isnull().sum())
print("Duplicates:", df.duplicated().sum())

# Clean Date
df["Date"] = df["Date"].astype("string").str.replace("'", "", regex=False).str.strip()
df["Date"] = df["Date"].replace("20201226", "2020/12/26")
df["Date"] = pd.to_datetime(df["Date"], format="%Y/%m/%d", errors="coerce")

# Fix obvious Duration entry
df.loc[df["Duration"] == 450, "Duration"] = 45

# Remove duplicate
df = df.drop_duplicates().reset_index(drop=True)

# Fill missing Calories with mean
df["Calories"] = df["Calories"].fillna(df["Calories"].mean())

# Fill the missing date from the chronological sequence
df["Date"] = df["Date"].fillna(pd.Timestamp("2020-12-22"))

# Create new columns
df["Calories_per_Minute"] = (df["Calories"] / df["Duration"]).round(2)
df["Pulse_Category"] = pd.cut(
    df["Pulse"],
    bins=[-np.inf, 99, 109, np.inf],
    labels=["Low", "Normal", "High"]
)

# Filter rows
high_calorie = df[df["Calories"] > df["Calories"].mean()]
long_workouts = df[df["Duration"] >= 60]
high_pulse = df[df["Pulse"] >= 110]

print("\nCleaned data:")
print(df.head())
print("\nHigh-calorie workouts:")
print(high_calorie)
print("\nWorkouts >= 60 minutes:")
print(long_workouts)
print("\nPulse >= 110:")
print(high_pulse)

df.to_csv("Week3_Cleaned_Data.csv", index=False)
