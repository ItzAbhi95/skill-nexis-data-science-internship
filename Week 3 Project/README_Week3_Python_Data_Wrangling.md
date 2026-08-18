# Week 3 — Python & Data Wrangling

## 📌 Project Overview

This project was completed as part of the **Data Analyst Course — Week 3: Python & Data Wrangling**.

The Week 3 assignment focuses on using Python and Pandas for data manipulation and cleaning. The required task was to **clean a messy dataset in Pandas, handle missing values, filter rows, and create new columns**.

The course also introduces Pandas operations such as reading CSV files, filtering and merging data, along with basic Matplotlib and Seaborn visualization. 

---

## 🎯 Objectives

The main objectives of this project were to:

1. Load the supplied CSV dataset using Pandas.
2. Inspect the dataset and identify data-quality issues.
3. Handle missing values.
4. Remove duplicate records.
5. Correct inconsistent data.
6. Filter rows based on business conditions.
7. Create new analytical columns.
8. Perform basic data visualization.
9. Export the cleaned dataset for further analysis.

---

## 📂 Dataset

**Dataset:** `data.csv`

The dataset contains workout/exercise information with the following fields:

- `Duration`
- `Date`
- `Pulse`
- `Maxpulse`
- `Calories`

The original dataset contains **32 rows and 5 columns**.

---

## 🔎 Initial Data Quality Check

The dataset was inspected before cleaning to identify common data-quality problems.

### Issues identified

- Missing values in the `Date` column
- Missing values in the `Calories` column
- A duplicate record
- An inconsistent date value: `20201226`
- An obvious inconsistent `Duration` value: `450`

These issues were handled using Pandas.

---

## 🧹 Data Cleaning

### 1. Clean the Date Column

The Date column contained inconsistent formatting.

```python
df["Date"] = df["Date"].astype("string").str.replace("'", "", regex=False).str.strip()

df["Date"] = df["Date"].replace(
    "20201226",
    "2020/12/26"
)

df["Date"] = pd.to_datetime(
    df["Date"],
    format="%Y/%m/%d",
    errors="coerce"
)
```

This standardizes the date values and converts them into Pandas datetime format.

---

### 2. Fix the Duration Value

An inconsistent duration value of `450` was identified and corrected to `45`.

```python
df.loc[df["Duration"] == 450, "Duration"] = 45
```

---

### 3. Remove Duplicate Records

Duplicate rows were identified and removed.

```python
df = df.drop_duplicates().reset_index(drop=True)
```

---

### 4. Handle Missing Calories

Missing values in the `Calories` column were replaced using the mean of the available Calories values.

```python
df["Calories"] = df["Calories"].fillna(
    df["Calories"].mean()
)
```

This prevents missing values from affecting subsequent analysis.

---

### 5. Handle Missing Date

The missing date was filled using the chronological sequence of the surrounding records.

```python
df["Date"] = df["Date"].fillna(
    pd.Timestamp("2020-12-22")
)
```

---

## ➕ New Columns Created

Two new analytical columns were created.

### Calories per Minute

This measures the calories burned relative to workout duration.

```python
df["Calories_per_Minute"] = (
    df["Calories"] / df["Duration"]
).round(2)
```

### Pulse Category

Pulse values were classified into three categories:

- Low
- Normal
- High

```python
df["Pulse_Category"] = pd.cut(
    df["Pulse"],
    bins=[-float("inf"), 99, 109, float("inf")],
    labels=["Low", "Normal", "High"]
)
```

---

## 🔍 Data Filtering

Several filtering operations were performed to demonstrate Pandas row filtering.

### High-Calorie Workouts

```python
high_calorie = df[
    df["Calories"] > df["Calories"].mean()
]
```

### Long Workouts

Workouts lasting at least 60 minutes:

```python
long_workouts = df[
    df["Duration"] >= 60
]
```

### High-Pulse Workouts

Workouts with Pulse greater than or equal to 110:

```python
high_pulse = df[
    df["Pulse"] >= 110
]
```

---

## 📊 Data Visualization

The Week 3 course introduces basic data visualization using **Matplotlib and Seaborn**.

For this project, basic Matplotlib visualizations were created to explore the cleaned dataset.

### Visualizations Included

1. **Calories Distribution**
   - Shows the distribution of calories burned across workouts.

2. **Workout Duration vs Calories**
   - Shows the relationship between workout duration and calories burned.

These visualizations help turn the cleaned data into easier-to-understand analytical information.

---

## 💻 Complete Workflow

The project follows this data-analysis workflow:

```text
Raw CSV Dataset
       ↓
Load with Pandas
       ↓
Inspect Data
       ↓
Identify Missing / Incorrect Data
       ↓
Clean Data
       ↓
Remove Duplicates
       ↓
Handle Missing Values
       ↓
Filter Rows
       ↓
Create New Columns
       ↓
Visualize Data
       ↓
Export Cleaned Dataset
```

---

## 🛠️ Technologies Used

- **Python**
- **Pandas**
- **NumPy**
- **Matplotlib**
- **Seaborn**

---

## 📁 Project Structure

```text
Week-3-Python-Data-Wrangling/
│
├── data.csv
├── Week3_Pandas_Data_Wrangling.py
├── Week3_Cleaned_Data.csv
├── Week3_Calories_Distribution.png
├── Week3_Duration_vs_Calories.png
├── Completed_Week3_Pandas_Data_Wrangling.docx
└── README.md
```

---

## 🚀 How to Run

### Step 1 — Install Required Libraries

```bash
pip install pandas numpy matplotlib seaborn openpyxl
```

### Step 2 — Place the Dataset

Keep `data.csv` in the same folder as the Python script.

### Step 3 — Run the Python Script

```bash
python Week3_Pandas_Data_Wrangling.py
```

### Step 4 — Review the Output

The script performs:

- Data inspection
- Data cleaning
- Missing-value handling
- Duplicate removal
- Row filtering
- New-column creation
- Data export

The cleaned dataset is saved as:

```text
Week3_Cleaned_Data.csv
```

---

## 📈 Project Outcome

After cleaning and transforming the dataset:

- Duplicate records were removed.
- Missing values were handled.
- Date inconsistencies were corrected.
- An incorrect Duration value was fixed.
- New analytical columns were created.
- Filtered datasets were generated for different conditions.
- Basic visualizations were created to support analysis.

The result is a cleaner and more analysis-ready dataset that can be used for further exploratory analysis and dashboard development.

---

## 🧠 Skills Demonstrated

- Python programming for data analysis
- Pandas DataFrame manipulation
- Data cleaning
- Missing-value handling
- Duplicate detection and removal
- Date conversion
- Row filtering
- Feature/column creation
- Basic exploratory analysis
- Matplotlib visualization
- Analytical thinking

---

## 📚 Learning Outcome

This project provided practical experience in using **Python and Pandas for data wrangling**, which is an important part of a Data Analyst workflow.

The project demonstrates how a raw dataset can be transformed into a cleaner, structured and analysis-ready dataset before performing deeper analysis or creating dashboards.

---

## 👨‍💻 Author

**Abhishek Raj**

B.Tech — Computer Science & Design

Aspiring Data Analyst | Python | SQL | Excel | Power BI | Tableau

---

## 📌 Course Assignment

**Week 3: Python & Data Wrangling**

The assignment requires cleaning a messy dataset in Pandas by handling missing values, filtering rows and creating new columns. The course section also covers Python basics, Pandas data manipulation, and introductory Matplotlib & Seaborn.
