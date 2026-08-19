"""
Week 4 Capstone - End-to-End Analysis Case Study
Step 2: Analysis using SQL (SQLite) + Pandas

Loads the cleaned dataset into a local SQLite database and runs
business-question queries against it with real SQL.
"""

import sqlite3
import pandas as pd

df = pd.read_csv("../outputs/cleaned_sales_data.csv")

conn = sqlite3.connect(":memory:")
df.to_sql("sales", conn, index=False, if_exists="replace")

queries = {
    "Profit by Segment": """
        SELECT Segment,
               ROUND(SUM(Sales), 0)   AS Total_Sales,
               ROUND(SUM(Profit), 0)  AS Total_Profit,
               ROUND(SUM(Profit) * 100.0 / SUM(Sales), 2) AS Profit_Margin_Pct
        FROM sales
        GROUP BY Segment
        ORDER BY Total_Profit DESC;
    """,

    "Sales by Country": """
        SELECT Country,
               ROUND(SUM(Sales), 0)  AS Total_Sales,
               ROUND(SUM(Profit), 0) AS Total_Profit,
               COUNT(*)              AS Num_Transactions
        FROM sales
        GROUP BY Country
        ORDER BY Total_Sales DESC;
    """,

    "Top Products by Profit": """
        SELECT Product,
               SUM("Units Sold")     AS Total_Units,
               ROUND(SUM(Sales), 0)  AS Total_Sales,
               ROUND(SUM(Profit), 0) AS Total_Profit
        FROM sales
        GROUP BY Product
        ORDER BY Total_Profit DESC;
    """,

    "Monthly Sales Trend": """
        SELECT Year, "Month Number" AS Month_Num, "Month Name" AS Month,
               ROUND(SUM(Sales), 0)  AS Total_Sales,
               ROUND(SUM(Profit), 0) AS Total_Profit
        FROM sales
        GROUP BY Year, "Month Number"
        ORDER BY Year, "Month Number";
    """,

    "Discount Band Impact": """
        SELECT "Discount Band" AS Discount_Band,
               COUNT(*)                          AS Num_Orders,
               ROUND(AVG("Discount Rate") * 100, 2) AS Avg_Discount_Pct,
               ROUND(SUM(Profit), 0)              AS Total_Profit,
               ROUND(AVG("Profit Margin") * 100, 2) AS Avg_Margin_Pct
        FROM sales
        GROUP BY "Discount Band"
        ORDER BY Total_Profit DESC;
    """,

    "Best Segment-Country Combo": """
        SELECT Segment, Country,
               ROUND(SUM(Profit), 0) AS Total_Profit
        FROM sales
        GROUP BY Segment, Country
        ORDER BY Total_Profit DESC
        LIMIT 10;
    """,

    "Loss-Making Transactions": """
        SELECT Segment, Country, Product, Date, Profit
        FROM sales
        WHERE Profit < 0
        ORDER BY Profit ASC;
    """,
}

results = {}
for name, q in queries.items():
    print("\n" + "=" * 70)
    print(name.upper())
    print("=" * 70)
    result = pd.read_sql_query(q, conn)
    print(result.to_string(index=False))
    results[name] = result

# Save all query results to a single Excel workbook for the report/dashboard
with pd.ExcelWriter("../outputs/sql_analysis_results.xlsx") as writer:
    for name, result in results.items():
        sheet_name = name[:31]  # Excel sheet name limit
        result.to_excel(writer, sheet_name=sheet_name, index=False)

print("\nAll SQL analysis results exported -> ../outputs/sql_analysis_results.xlsx")
conn.close()
