# Data Analyst Course — 4-Week Program

**Author:** Abhishek Raj
**Program:** Data Analyst Course (Axcentra)

A 4-week, project-based data analytics program covering the full analyst
toolchain — Excel, SQL, Python, and BI dashboards — culminating in an
end-to-end capstone project.

---

## 📁 Repository Structure

```
.
├── week1-excel/
│   └── Sales_Pivot_Dashboard.xlsx
├── week2-sql/
│   └── customer_order_analysis.sql
├── week3-python/
│   ├── data_cleaning.ipynb
│   └── cleaned_dataset.csv
├── week4-capstone/
│   ├── data/
│   │   └── raw_sample_data.xlsx
│   ├── scripts/
│   │   ├── 01_clean_explore.py
│   │   ├── 02_sql_analysis.py
│   │   ├── 03_build_dashboard.py
│   │   └── build_report.js
│   └── outputs/
│       ├── cleaned_sales_data.csv
│       ├── sql_analysis_results.xlsx
│       ├── Sales_Performance_Dashboard.xlsx
│       └── Sales_Performance_Report.docx
└── README.md
```

> Folder names above are suggested — rename to match how you've organized
> files in your repo.

---

## Week 1 — Excel & Data Fundamentals

**Topics covered**
- Excel basics: navigation, core formulas (`SUM`, `AVERAGE`, `COUNT`)
- Data cleaning techniques
- Pivot tables and data summarization
- Data types and descriptive statistics (mean, median, mode, variance)

**Project — Pivot Table Dashboard: Sales Performance**
Built a pivot-table-driven dashboard analyzing:
- Total Revenue
- Sales by Category
- Yearly Sales Trends
- Department-wise Revenue

**Deliverable:** `week1-excel/Sales_Pivot_Dashboard.xlsx`

---

## Week 2 — SQL for Data Analysis

**Topics covered**
- Basic queries: `SELECT`, `WHERE`, `GROUP BY`, `ORDER BY`
- Aggregations: `SUM`, `AVG`, `COUNT`
- Joins, subqueries, `CASE` statements

**Assignment**
Queried a sample database to find top customers and average order values.

**Deliverable:** `week2-sql/customer_order_analysis.sql`

---

## Week 3 — Python & Data Wrangling

**Topics covered**
- Python basics: data structures, functions, scripting
- Pandas for data manipulation (reading CSV, filtering, merging)
- Intro to data visualization: Matplotlib & Seaborn basics

**Assignment**
Cleaned a messy dataset in Pandas — handled missing values, filtered rows,
and created new derived columns.

**Deliverable:** `week3-python/data_cleaning.ipynb`

---

## Week 4 — Data Visualization & Capstone Project ✅

**Topics covered**
- Tableau / Power BI fundamentals — dashboards, filters, calculated fields
- Storytelling with data — choosing the right charts, structuring insights

### Capstone: End-to-End Analysis Case Study

A full pipeline built on a 700-row sales dataset (Segment, Country, Product,
Discounts, Sales, COGS, Profit — Sep 2013 to Dec 2014):

1. **Clean & explore in Python** (`01_clean_explore.py`) — handled missing
   `Discount Band` values, validated data types, confirmed Sales/Profit
   formulas tie out with zero discrepancies.
2. **Analyze with SQL & Pandas** (`02_sql_analysis.py`) — SQLite queries
   answering business questions: profit by segment, sales by country,
   top products, monthly trend, discount-band impact, loss-making
   transactions.
3. **Visualize in Excel + BI-style dashboard** (`03_build_dashboard.py`) —
   formula-driven Excel dashboard (`SUMIF`/`SUMIFS`) with KPI cards and
   4 charts; recalculates automatically if source data changes.
4. **Final stakeholder report** (`build_report.js`) — Word document with
   charts, key findings, and business recommendations.

### Headline Results
| Metric | Value |
|---|---|
| Total Sales | $118.7M |
| Total Profit | $16.9M |
| Overall Profit Margin | 14.2% |
| Transactions Analyzed | 700 |

**Key finding:** The Enterprise segment is loss-making overall (-3.1% margin)
and accounts for every loss-making transaction in the dataset, while the
Government segment is the strongest performer (21.7% margin). Profit margin
also declines steadily as discount depth increases (37.3% at no discount
vs. 24.5% at high discount).

**Deliverables:** `week4-capstone/outputs/`
- `Sales_Performance_Dashboard.xlsx` — interactive Excel dashboard
- `Sales_Performance_Report.docx` — final findings & recommendations report
- `sql_analysis_results.xlsx` — raw SQL query outputs
- `cleaned_sales_data.csv` — cleaned dataset

---

## 🛠️ Tools & Technologies

`Excel` · `SQL (SQLite)` · `Python` (Pandas, Matplotlib) · `Power BI / Tableau concepts` · `openpyxl`

## ⚙️ How to Reproduce (Week 4 Capstone)

```bash
cd week4-capstone/scripts
python3 01_clean_explore.py     # -> outputs/cleaned_sales_data.csv
python3 02_sql_analysis.py      # -> outputs/sql_analysis_results.xlsx
python3 03_build_dashboard.py   # -> outputs/Sales_Performance_Dashboard.xlsx
node build_report.js            # -> outputs/Sales_Performance_Report.docx
```

---

## 📬 Contact

**Abhishek Raj**
Final-Year B.Tech CSD, Dr. B.C. Roy Engineering College, Durgapur
📧 itsabhi36@gmail.com
🔗 [GitHub](https://github.com/ItzAbhi95) · [Portfolio](https://ItzAbhi95.github.io)
