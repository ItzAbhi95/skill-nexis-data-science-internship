# Week 4 Capstone — End-to-End Analysis Case Study
**Data Analyst Course | Abhishek Raj**

## Project overview
Full pipeline analyzing a 700-row sales dataset (Segment, Country, Product,
Discounts, Sales, COGS, Profit — Sep 2013 to Dec 2014): clean in Python,
analyze with SQL/Pandas, visualize in Excel, report findings & recommendations.

## How to reproduce
```
cd scripts
python3 01_clean_explore.py     # cleans data/raw_sample_data.xlsx -> outputs/cleaned_sales_data.csv
python3 02_sql_analysis.py      # runs SQL queries -> outputs/sql_analysis_results.xlsx
python3 03_build_dashboard.py   # builds -> outputs/Sales_Performance_Dashboard.xlsx
node build_report.js            # builds -> outputs/Sales_Performance_Report.docx
```

## Folder structure
- `data/raw_sample_data.xlsx` — original source dataset
- `scripts/` — all Python/SQL/JS code (fully reproducible, no hardcoded results)
- `outputs/cleaned_sales_data.csv` — cleaned dataset
- `outputs/sql_analysis_results.xlsx` — raw output of every SQL query
- `outputs/Sales_Performance_Dashboard.xlsx` — interactive Excel dashboard
  (KPI cards + 4 charts, all formula-driven with SUMIF/SUMIFS — recalculates
  automatically if the Data sheet changes)
- `outputs/Sales_Performance_Report.docx` — final stakeholder report with
  charts, findings, and recommendations

## Headline result
- Total Sales: $118.7M | Total Profit: $16.9M | Margin: 14.2%
- Government segment is most profitable (21.7% margin); Enterprise segment
  is loss-making overall (-3.1% margin) and accounts for every loss-making
  transaction in the dataset.
- Profit margin steadily declines as discount depth increases (37.3% at
  no discount vs. 24.5% at high discount).

Full detail in `outputs/Sales_Performance_Report.docx`.
