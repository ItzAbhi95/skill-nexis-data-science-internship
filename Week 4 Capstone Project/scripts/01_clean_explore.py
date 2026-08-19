"""
Week 4 Capstone - End-to-End Analysis Case Study
Step 1: Data Cleaning & Exploration (Python)

Author: Abhishek Raj
Dataset: Sample_data.xlsx (Financial/Sales sample dataset - 700 records)
"""

import pandas as pd

# ---------------------------------------------------------
# 1. Load raw data
# ---------------------------------------------------------
RAW_PATH = "../data/raw_sample_data.xlsx"
df = pd.read_excel(RAW_PATH)

print("=" * 60)
print("RAW DATA OVERVIEW")
print("=" * 60)
print(f"Shape: {df.shape}")
print(f"\nColumns: {list(df.columns)}")
print(f"\nData types:\n{df.dtypes}")

# ---------------------------------------------------------
# 2. Clean column names (strip stray whitespace, e.g. ' Sales')
# ---------------------------------------------------------
df.columns = [c.strip() for c in df.columns]

# ---------------------------------------------------------
# 3. Handle missing values
# ---------------------------------------------------------
print("\nMissing values BEFORE cleaning:")
print(df.isnull().sum()[df.isnull().sum() > 0])

# 'Discount Band' is null wherever Discounts == 0 -> these are
# genuinely "No Discount" transactions, not missing data.
df["Discount Band"] = df["Discount Band"].fillna("No Discount")

print("\nMissing values AFTER cleaning:")
print(df.isnull().sum().sum(), "total nulls remaining")

# ---------------------------------------------------------
# 4. Fix data types
# ---------------------------------------------------------
df["Date"] = pd.to_datetime(df["Date"])
df["Units Sold"] = df["Units Sold"].round().astype(int)

# ---------------------------------------------------------
# 5. Remove duplicates
# ---------------------------------------------------------
before = len(df)
df = df.drop_duplicates()
print(f"\nDuplicates removed: {before - len(df)}")

# ---------------------------------------------------------
# 6. Sanity checks / business-rule validation
# ---------------------------------------------------------
# Sales should equal Gross Sales - Discounts
check = (df["Gross Sales"] - df["Discounts"] - df["Sales"]).abs() > 1
print(f"\nRows where Sales != Gross Sales - Discounts: {check.sum()}")

# Profit should equal Sales - COGS
check2 = (df["Sales"] - df["COGS"] - df["Profit"]).abs() > 1
print(f"Rows where Profit != Sales - COGS: {check2.sum()}")

# Discount rate sanity (0-100%)
df["Discount Rate"] = (df["Discounts"] / df["Gross Sales"]).round(4)
print(f"\nDiscount rate range: {df['Discount Rate'].min():.2%} - {df['Discount Rate'].max():.2%}")

# ---------------------------------------------------------
# 7. Feature engineering for analysis
# ---------------------------------------------------------
df["Profit Margin"] = (df["Profit"] / df["Sales"]).round(4)
df["Quarter"] = df["Date"].dt.quarter
df["Quarter Label"] = "Q" + df["Quarter"].astype(str) + " " + df["Year"].astype(str)

# ---------------------------------------------------------
# 8. Exploratory summary
# ---------------------------------------------------------
print("\n" + "=" * 60)
print("EXPLORATORY SUMMARY")
print("=" * 60)
print(f"Date range: {df['Date'].min().date()} to {df['Date'].max().date()}")
print(f"Segments: {df['Segment'].nunique()} -> {sorted(df['Segment'].unique())}")
print(f"Countries: {df['Country'].nunique()} -> {sorted(df['Country'].unique())}")
print(f"Products: {df['Product'].nunique()} -> {sorted(df['Product'].unique())}")

print(f"\nTotal Gross Sales: ${df['Gross Sales'].sum():,.0f}")
print(f"Total Net Sales:   ${df['Sales'].sum():,.0f}")
print(f"Total Discounts:   ${df['Discounts'].sum():,.0f}")
print(f"Total COGS:        ${df['COGS'].sum():,.0f}")
print(f"Total Profit:      ${df['Profit'].sum():,.0f}")
print(f"Overall Profit Margin: {df['Profit'].sum() / df['Sales'].sum():.2%}")

# ---------------------------------------------------------
# 9. Export cleaned dataset for downstream SQL / BI steps
# ---------------------------------------------------------
OUT_PATH = "../outputs/cleaned_sales_data.csv"
df.to_csv(OUT_PATH, index=False)
print(f"\nCleaned dataset exported -> {OUT_PATH}")
print(f"Final shape: {df.shape}")
