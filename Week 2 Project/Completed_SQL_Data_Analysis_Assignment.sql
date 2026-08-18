-- DATA ANALYST COURSE: WEEK 2 - SQL FOR DATA ANALYSIS
-- Dataset: SQL_Sales_Dataset_200_Rows.xlsx
-- Table name assumed: sales

-- 1. Inspect the data
SELECT *
FROM sales;

-- 2. Basic sales summary
SELECT
    COUNT(*) AS total_orders,
    SUM(total_price) AS total_sales,
    AVG(total_price) AS average_order_value
FROM sales;

-- 3. Top 10 customers by total spending
SELECT
    customer_name,
    COUNT(order_id) AS total_orders,
    SUM(total_price) AS total_spent,
    AVG(total_price) AS average_order_value
FROM sales
GROUP BY customer_name
ORDER BY total_spent DESC
LIMIT 10;

-- 4. Average order value by region
SELECT
    region,
    AVG(total_price) AS average_order_value
FROM sales
GROUP BY region
ORDER BY average_order_value DESC;

-- 5. Average order value by category
SELECT
    category,
    AVG(total_price) AS average_order_value
FROM sales
GROUP BY category
ORDER BY average_order_value DESC;

-- 6. Orders above the overall average order value (subquery)
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

-- 7. Classify orders using CASE
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

-- 8. Example JOIN
-- The supplied workbook contains one table, so a JOIN is not required
-- for the requested assignment. If customer/product lookup tables are
-- added later, JOIN can be used to combine them.
