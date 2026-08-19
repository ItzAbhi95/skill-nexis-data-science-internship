const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell,
  WidthType, ShadingType, ImageRun, AlignmentType, BorderStyle, PageOrientation
} = require("docx");

const NAVY = "1F3864";
const GOLD = "C99A2E";
const LIGHT = "F2F2F2";

function h1(text) {
  return new Paragraph({ text, heading: HeadingLevel.HEADING_1, spacing: { before: 300, after: 150 } });
}
function h2(text) {
  return new Paragraph({ text, heading: HeadingLevel.HEADING_2, spacing: { before: 200, after: 100 } });
}
function body(text, opts = {}) {
  return new Paragraph({ children: [new TextRun({ text, ...opts })], spacing: { after: 120 } });
}
function bullet(text) {
  return new Paragraph({ text, bullet: { level: 0 }, spacing: { after: 80 } });
}

function kpiCell(label, value, color) {
  return new TableCell({
    width: { size: 25, type: WidthType.PERCENTAGE },
    shading: { type: ShadingType.CLEAR, fill: color },
    margins: { top: 150, bottom: 150, left: 100, right: 100 },
    children: [
      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: label, color: "FFFFFF", size: 18, bold: true })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: value, color: "FFFFFF", size: 30, bold: true })] }),
    ],
  });
}

function dataTable(headers, rows) {
  const headerRow = new TableRow({
    children: headers.map(hd => new TableCell({
      shading: { type: ShadingType.CLEAR, fill: NAVY },
      margins: { top: 80, bottom: 80, left: 100, right: 100 },
      children: [new Paragraph({ children: [new TextRun({ text: hd, color: "FFFFFF", bold: true, size: 20 })] })],
    })),
  });
  const bodyRows = rows.map((r, idx) => new TableRow({
    children: r.map(val => new TableCell({
      shading: { type: ShadingType.CLEAR, fill: idx % 2 === 0 ? "FFFFFF" : LIGHT },
      margins: { top: 60, bottom: 60, left: 100, right: 100 },
      children: [new Paragraph({ children: [new TextRun({ text: String(val), size: 20 })] })],
    })),
  }));
  return new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, rows: [headerRow, ...bodyRows] });
}

function chartImage(path, width, height, caption) {
  const data = fs.readFileSync(path);
  return [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new ImageRun({ type: "png", data, transformation: { width, height } })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
      children: [new TextRun({ text: caption, italics: true, size: 18, color: "666666" })],
    }),
  ];
}

const doc = new Document({
  sections: [{
    properties: { page: { size: { width: 12240, height: 15840 } } },
    children: [
      new Paragraph({ text: "Sales Performance Analysis", heading: HeadingLevel.TITLE, alignment: AlignmentType.CENTER }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 },
        children: [new TextRun({ text: "End-to-End Analysis Case Study — Week 4 Capstone Project", italics: true, size: 24, color: "555555" })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 400 },
        children: [new TextRun({ text: "Prepared by Abhishek Raj  |  Data Analyst Course  |  " + new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }), size: 20, color: "888888" })] }),

      h1("1. Executive Summary"),
      body("This report analyzes 700 sales transactions spanning September 2013 to December 2014, covering five customer segments, five countries, and six products. The dataset was cleaned and validated in Python, analyzed with SQL and Pandas, and visualized in an interactive Power BI-style Excel dashboard. The goal is to surface actionable insights on where the business makes money, where it loses money, and how discounting is affecting profitability."),

      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [new TableRow({ children: [
          kpiCell("Total Sales", "$118.7M", NAVY),
          kpiCell("Total Profit", "$16.9M", GOLD),
          kpiCell("Profit Margin", "14.2%", NAVY),
          kpiCell("Transactions", "700", GOLD),
        ]})],
      }),
      new Paragraph({ text: "", spacing: { after: 300 } }),

      h1("2. Methodology"),
      bullet("Data Cleaning (Python/Pandas): standardized column names, filled 53 missing Discount Band values with 'No Discount' (these were transactions with $0 discount, not missing data), validated data types, and confirmed Sales and Profit tie out to source formulas with zero discrepancies."),
      bullet("Analysis (SQL/SQLite + Pandas): ran grouped aggregation queries across Segment, Country, Product, Discount Band, and Month to quantify sales and profit contribution."),
      bullet("Visualization (Excel + Power BI-style dashboard): built a formula-driven Excel dashboard (SUMIFS-based, so it recalculates automatically if new data is added) with KPI cards and four charts."),
      bullet("Reporting: findings and recommendations compiled into this stakeholder-facing report."),

      h1("3. Key Findings"),

      h2("3.1 Profit by Segment — Enterprise is losing money"),
      ...chartImage("../outputs/chart_segment_profit.png", 550, 314, "Figure 1: Total profit by customer segment"),
      body("Government is the strongest segment, generating $11.4M profit at a 21.7% margin on $52.5M of sales. Channel Partners has the highest margin at 73.1%, though on a small revenue base. The Enterprise segment is the standout concern: it posted $19.6M in sales but a net loss of -$614K (-3.1% margin) — every single loss-making transaction in the dataset (57 of them) belongs to this segment."),

      h2("3.2 Country Performance — broadly balanced"),
      body("Sales are fairly evenly spread across the five markets ($21M–$25M each), with France (16.1% margin) and Germany (15.7% margin) slightly outperforming the United States (12.0% margin) despite similar sales volumes."),

      h2("3.3 Monthly Trend — strong seasonal peaks"),
      ...chartImage("../outputs/chart_monthly_trend.png", 550, 244, "Figure 2: Sales and profit trend, Sep 2013 \u2013 Dec 2014"),
      body("Sales peak sharply in October and December of both years (Oct 2014: $12.4M, Dec 2014: $12.0M), consistent with year-end/holiday purchasing or budget-cycle buying common in Government and Enterprise accounts. March, May, and November are comparatively soft months."),

      h2("3.4 Discounting — heavy discounts compress margin"),
      ...chartImage("../outputs/chart_discount_margin.png", 400, 267, "Figure 3: Average profit margin by discount band"),
      body("There is a clear, consistent pattern: margin erodes as discount depth increases. No-discount orders average a 37.3% margin; that falls to 28.8% at Low discount, 28.7% at Medium, and drops to 24.5% at High discount (avg. 12.5% off). High-discount orders make up 35% of all transactions but contribute a disproportionately smaller share of profit."),

      h2("3.5 Product Mix"),
      ...chartImage("../outputs/chart_product_mix.png", 400, 333, "Figure 4: Sales mix by product"),
      body("Paseo is the top performer by both volume and profit ($4.8M profit, 338K units sold), followed by VTT and Amarilla. Carretera is the weakest product on profit contribution despite reasonable unit sales, suggesting pricing or cost pressure on that line."),

      h1("4. Supporting Data"),
      h2("4.1 Profit by Segment"),
      dataTable(
        ["Segment", "Total Sales", "Total Profit", "Margin"],
        [
          ["Government", "$52,504,261", "$11,388,173", "21.7%"],
          ["Small Business", "$42,427,919", "$4,143,169", "9.8%"],
          ["Enterprise", "$19,611,694", "-$614,546", "-3.1%"],
          ["Midmarket", "$2,381,883", "$660,103", "27.7%"],
          ["Channel Partners", "$1,800,594", "$1,316,803", "73.1%"],
        ]
      ),
      new Paragraph({ text: "", spacing: { after: 200 } }),
      h2("4.2 Discount Band Impact"),
      dataTable(
        ["Discount Band", "Orders", "Avg Discount %", "Total Profit", "Avg Margin %"],
        [
          ["No Discount", "53", "0.0%", "$1,736,455", "37.3%"],
          ["Low", "160", "2.4%", "$6,188,858", "28.8%"],
          ["Medium", "242", "7.0%", "$5,579,523", "28.7%"],
          ["High", "245", "12.5%", "$3,388,867", "24.5%"],
        ]
      ),

      h1("5. Recommendations"),
      bullet("Investigate Enterprise segment pricing and cost structure. It's the only segment with negative overall profit and accounts for 100% of loss-making transactions (57 of 700). Review manufacturing/COGS allocation and discount approval thresholds specific to Enterprise deals."),
      bullet("Cap or tier discount approvals above ~10%. High-discount orders (avg. 12.5% off) show the weakest margins (24.5% vs. 37.3% for no-discount orders). Consider requiring manager approval for discounts beyond a defined threshold."),
      bullet("Double down on Government and Channel Partners relationships — highest-margin segments and worth prioritizing in account planning and renewal conversations."),
      bullet("Plan inventory and staffing around the October/December demand peaks seen in both years, and investigate targeted promotions for the softer March/May/November months."),
      bullet("Review Carretera's cost and pricing — it underperforms on profit relative to its unit sales versus other products in the lineup."),

      h1("6. Deliverables"),
      body("This analysis is packaged with the following files:"),
      bullet("01_clean_explore.py — Python data cleaning & exploration script"),
      bullet("02_sql_analysis.py — SQL (SQLite) business-question queries"),
      bullet("03_build_dashboard.py — Excel dashboard generation script"),
      bullet("cleaned_sales_data.csv — cleaned dataset"),
      bullet("sql_analysis_results.xlsx — raw SQL query outputs"),
      bullet("Sales_Performance_Dashboard.xlsx — interactive Excel dashboard (KPI cards + 4 charts, formula-driven)"),
      bullet("Sales_Performance_Report.docx — this report"),
    ],
  }],
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync("../outputs/Sales_Performance_Report.docx", buf);
  console.log("Report written.");
});
