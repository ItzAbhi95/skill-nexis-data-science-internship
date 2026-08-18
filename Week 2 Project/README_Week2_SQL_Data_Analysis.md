# Week 2 — SQL for Data Analysis

## 📌 Project Overview

This project was completed as part of the **Data Analyst Course — Week 2: SQL for Data Analysis**.

The objective was to practice SQL queries for analyzing a sales dataset and answer business-oriented questions such as identifying top customers and calculating average order values.

The Week 2 assignment specifically covers:

- Basic SQL queries: `SELECT`, `WHERE`, `GROUP BY`, `ORDER BY`
- Aggregate functions: `SUM()`, `AVG()`, `COUNT()`
- `JOIN`s
- Subqueries
- `CASE` statements
- Sales analysis using a sample database

The assignment asks to query a sample database to find **top customers** and **average order values**.

---

## 📂 Dataset

**Dataset:** `SQL_Sales_Dataset_200_Rows.xlsx`

The dataset contains **200 sales/order records**.

The main fields used in the analysis include:

- `order_id`
- `customer_name`
- `total_price`
- `region`
- `category`

> **Note:** The supplied workbook contains a single table. Therefore, a `JOIN` is not required for the main assignment. JOIN syntax is discussed separately for practice and future multi-table analysis.

---

## 🎯 Objectives

The main objectives of this project were to:

1. Retrieve and inspect sales records.
2. Calculate overall sales metrics.
3. Identify the top customers based on total spending.
4. Calculate average order value.
5. Analyze average order value by region and category.
6. Use a subquery to identify orders above the overall average.
7. Use a `CASE` statement to classify orders by value.
8. Practice SQL aggregation and grouping.

---

## 🛠️ SQL Concepts Used

### Basic Queries

```sql
SELECT
FROM
WHERE
GROUP BY
ORDER BY
```

### Aggregate Functions

```sql
SUM()
AVG()
COUNT()
```

### Advanced SQL

```sql
JOIN
Subqueries
CASE
```

---

## 📊 Key Analysis

### 1. Overall Sales Summary

The project calculates:

- Total number of orders
- Total sales
- Average order value

```sql
SELECT
    COUNT(*) AS total_orders,
    SUM(total_price) AS total_sales,
    AVG(total_price) AS average_order_value
FROM sales;
```

### 2. Top Customers

Customers are ranked according to their total spending.

```sql
SELECT
    customer_name,
    COUNT(order_id) AS total_orders,
    SUM(total_price) AS total_spent,
    AVG(total_price) AS average_order_value
FROM sales
GROUP BY customer_name
ORDER BY total_spent DESC
LIMIT 10;
```

### 3. Average Order Value by Region

```sql
SELECT
    region,
    AVG(total_price) AS average_order_value
FROM sales
GROUP BY region
ORDER BY average_order_value DESC;
```

### 4. Average Order Value by Category

```sql
SELECT
    category,
    AVG(total_price) AS average_order_value
FROM sales
GROUP BY category
ORDER BY average_order_value DESC;
```

### 5. Orders Above Average

A subquery is used to compare individual orders with the overall average order value.

```sql
SELECT
    order_id,
    customer_name,
    total_price
FROM sales
WHERE total_price > (
    SELECT AVG(total_price)
    FROM sales
)
ORDER BY total_price DESC;
```

### 6. Order Value Classification

A `CASE` statement is used to categorize orders into value groups.

```sql
SELECT
    order_id,
    customer_name,
    total_price,
    CASE
        WHEN total_price >= 20000 THEN 'High Value'
        WHEN total_price >= 10000 THEN 'Medium Value'
        ELSE 'Low Value'
    END AS order_value_category
FROM sales
ORDER BY total_price DESC;
```

---

## 📈 Key Results

Based on the supplied 200-row dataset:

| Metric | Result |
|---|---:|
| Total Orders | 200 |
| Total Sales | 2,420,107 |
| Average Order Value | 12,100.54 |
| Top Customer | Lynn Garrison |
| Top Customer Spending | 47,940 |

The dataset contains **200 unique customer names**, so each customer appears once in the supplied data.

---

## 💡 Business Insights

The SQL analysis demonstrates how raw transactional data can be converted into useful business information.

### Top Customers
Ranking customers by total spending helps identify high-value customers who may deserve additional attention or retention strategies.

### Average Order Value
Average order value provides a useful measure of the typical transaction size and can be monitored over time or compared across regions/categories.

### High-Value Orders
Orders above the overall average can be isolated using a subquery, helping analysts investigate larger transactions.

### Order Segmentation
The `CASE` statement provides a simple way to classify transactions into Low, Medium, and High Value groups for reporting.

---

## 🗃️ Project Structure

```text
Week-2-SQL-Data-Analysis/
│
├── SQL_Sales_Dataset_200_Rows.xlsx
├── Completed_SQL_Data_Analysis_Assignment.sql
├── Completed_SQL_Data_Analysis_Assignment.docx
└── README.md
```

---

## 🚀 How to Run

### Step 1 — Load the Dataset

Import `SQL_Sales_Dataset_200_Rows.xlsx` into your SQL environment.

### Step 2 — Create the Table

Create a table named:

```text
sales
```

with columns matching the dataset.

### Step 3 — Run the Queries

Open:

```text
Completed_SQL_Data_Analysis_Assignment.sql
```

and execute the queries individually.

### Step 4 — Review the Results

Check the output for:

- Overall sales metrics
- Top customers
- Average order values
- Orders above average
- Order-value classifications

---

## 🧠 Skills Demonstrated

- SQL fundamentals
- Data aggregation
- Data filtering
- Grouping and sorting
- Customer analysis
- Business metrics
- Subqueries
- Conditional logic using `CASE`
- Analytical thinking
- Translating business questions into SQL queries

---

## 📌 Learning Outcome

After completing this project, I gained practical experience in using SQL to transform transactional sales data into meaningful business insights.

The project strengthened my understanding of **SQL querying, aggregation, grouping, filtering, subqueries, and conditional logic**, which are essential skills for a Data Analyst role.

---

## 👨‍💻 Author

**Abhishek Raj**

B.Tech — Computer Science & Design

Aspiring Data Analyst | SQL | Python | Excel | Power BI | Tableau

---

## 📄 Course Assignment

This project corresponds to **Week 2: SQL for Data Analysis** of the Data Analyst Course.

The assignment focuses on basic SQL queries, aggregations, joins, subqueries, `CASE` statements, and querying a sample database to find top customers and average order values.
