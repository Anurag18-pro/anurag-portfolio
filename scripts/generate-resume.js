const { PDFDocument, rgb, StandardFonts } = require("pdf-lib");
const fs = require("fs");
const path = require("path");

async function generateResume() {
  const pdfDoc = await PDFDocument.create();
  // Standard Letter size: 612 x 792 points
  const page = pdfDoc.addPage([612, 792]);
  const { width, height } = page.getSize();

  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  const margin = 40;
  const contentWidth = width - margin * 2;
  let y = height - 42;

  const colorBlack = rgb(0.08, 0.08, 0.08);
  const colorGray = rgb(0.35, 0.35, 0.35);
  const colorLine = rgb(0.2, 0.2, 0.2);

  // Helper to draw section heading with underline
  function drawSectionHeading(title) {
    y -= 10;
    page.drawText(title, {
      x: margin,
      y,
      size: 10.5,
      font: fontBold,
      color: colorBlack,
    });
    y -= 3;
    page.drawLine({
      start: { x: margin, y },
      end: { x: width - margin, y },
      thickness: 0.75,
      color: colorLine,
    });
    y -= 10;
  }

  // Helper to wrap text into multiple lines
  function drawWrappedText(text, fontSize, font, color, lineSpacing = 12) {
    const words = text.split(" ");
    let line = "";
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + " ";
      const testWidth = font.widthOfTextAtSize(testLine, fontSize);
      if (testWidth > contentWidth && n > 0) {
        page.drawText(line.trim(), { x: margin, y, size: fontSize, font, color });
        y -= lineSpacing;
        line = words[n] + " ";
      } else {
        line = testLine;
      }
    }
    if (line.trim().length > 0) {
      page.drawText(line.trim(), { x: margin, y, size: fontSize, font, color });
      y -= lineSpacing;
    }
  }

  // Helper to draw bullet point
  function drawBullet(text, fontSize = 8.5) {
    const bulletIndent = margin + 10;
    const bulletWidth = contentWidth - 10;
    const words = text.split(" ");
    let line = "";
    let isFirst = true;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + " ";
      const testWidth = fontRegular.widthOfTextAtSize(testLine, fontSize);
      if (testWidth > bulletWidth && n > 0) {
        if (isFirst) {
          page.drawText("•", { x: margin, y, size: fontSize, font: fontBold, color: colorBlack });
          isFirst = false;
        }
        page.drawText(line.trim(), { x: bulletIndent, y, size: fontSize, font: fontRegular, color: colorBlack });
        y -= 11;
        line = words[n] + " ";
      } else {
        line = testLine;
      }
    }
    if (line.trim().length > 0) {
      if (isFirst) {
        page.drawText("•", { x: margin, y, size: fontSize, font: fontBold, color: colorBlack });
      }
      page.drawText(line.trim(), { x: bulletIndent, y, size: fontSize, font: fontRegular, color: colorBlack });
      y -= 11;
    }
  }

  // --- HEADER ---
  const name = "ANURAG MISHRA";
  const nameWidth = fontBold.widthOfTextAtSize(name, 19);
  page.drawText(name, {
    x: (width - nameWidth) / 2,
    y,
    size: 19,
    font: fontBold,
    color: colorBlack,
  });
  y -= 15;

  const contactInfo = "Noida, India  |  +91 75239 37388  |  mishra7523ji@gmail.com  |  linkedin.com/in/anuragmishramba";
  const contactWidth = fontRegular.widthOfTextAtSize(contactInfo, 8.5);
  page.drawText(contactInfo, {
    x: (width - contactWidth) / 2,
    y,
    size: 8.5,
    font: fontRegular,
    color: colorGray,
  });
  y -= 12;

  // --- CAREER OBJECTIVE ---
  drawSectionHeading("CAREER OBJECTIVE");
  const objective =
    "MBA candidate with practical experience in market research, competitive intelligence, and financial analysis, skilled in collecting, validating, and analyzing market data using advanced MS Excel, PowerPoint, Power BI, and AI tools to drive data-driven decision-making. Applies strong research, critical thinking, and problem-solving abilities to convert field findings and stakeholder inputs into actionable business insights and strategic recommendations. Combines analytical rigor, business acumen, and clear communication to support client-facing consulting and business growth initiatives.";
  drawWrappedText(objective, 8.2, fontRegular, colorBlack, 11);

  // --- EDUCATION ---
  drawSectionHeading("EDUCATION");
  // 1. MBA
  page.drawText("Master of Business Administration (Finance & IT)", { x: margin, y, size: 9, font: fontBold, color: colorBlack });
  const lloydText = " | Lloyd Business School, Noida";
  page.drawText(lloydText, { x: margin + fontBold.widthOfTextAtSize("Master of Business Administration (Finance & IT)", 9), y, size: 9, font: fontRegular, color: colorBlack });
  const mbaDates = "2025–27";
  page.drawText(mbaDates, { x: width - margin - fontBold.widthOfTextAtSize(mbaDates, 9), y, size: 9, font: fontBold, color: colorBlack });
  y -= 11;
  page.drawText("Relevant coursework: ", { x: margin, y, size: 8, font: fontBold, color: colorGray });
  page.drawText("Business Analytics, Financial Modeling (Excel), Corporate Finance, Investment Analysis, Financial Markets, MIS", {
    x: margin + fontBold.widthOfTextAtSize("Relevant coursework: ", 8),
    y,
    size: 8,
    font: fontRegular,
    color: colorGray,
  });
  y -= 13;

  // 2. Bachelor's
  page.drawText("Bachelor's Degree in Economics", { x: margin, y, size: 9, font: fontBold, color: colorBlack });
  const alldText = " | University of Allahabad, Prayagraj";
  page.drawText(alldText, { x: margin + fontBold.widthOfTextAtSize("Bachelor's Degree in Economics", 9), y, size: 9, font: fontRegular, color: colorBlack });
  const bDates = "2021–24";
  page.drawText(bDates, { x: width - margin - fontBold.widthOfTextAtSize(bDates, 9), y, size: 9, font: fontBold, color: colorBlack });
  y -= 11;
  page.drawText("Relevant coursework: ", { x: margin, y, size: 8, font: fontBold, color: colorGray });
  page.drawText("Statistics, Microeconomics, Macroeconomics, Economic Analysis, Financial Basics", {
    x: margin + fontBold.widthOfTextAtSize("Relevant coursework: ", 8),
    y,
    size: 8,
    font: fontRegular,
    color: colorGray,
  });
  y -= 12;

  // --- EXPERIENCE ---
  drawSectionHeading("EXPERIENCE");
  // Opulence
  page.drawText("Research Analyst – Investment Banking", { x: margin, y, size: 9, font: fontBold, color: colorBlack });
  const opulenceCompany = " | Opulence Business Solutions Pvt. Ltd., Ahmedabad";
  page.drawText(opulenceCompany, { x: margin + fontBold.widthOfTextAtSize("Research Analyst – Investment Banking", 9), y, size: 9, font: fontRegular, color: colorBlack });
  const opulenceDates = "Jun 2026";
  page.drawText(opulenceDates, { x: width - margin - fontBold.widthOfTextAtSize(opulenceDates, 9), y, size: 9, font: fontBold, color: colorBlack });
  y -= 12;

  drawBullet("Conduct market research and competitive intelligence across target sectors — industry trend analysis, peer benchmarking, and market sizing — to support investment banking and valuation mandates");
  drawBullet("Collect, validate, and analyse financial and market data from primary and secondary sources, ensuring accuracy of datasets used in client deliverables and due diligence");
  drawBullet("Prepare research reports and PowerPoint presentations that translate analysis into clear, actionable recommendations for senior stakeholders");
  drawBullet("Build MS Excel and Power BI dashboards tracking KPIs such as profit margin, sales performance, and average order value to enable data-driven decision-making");
  drawBullet("Lead knowledge-banking and AI-automation initiatives across seven strategic verticals, collaborating with cross-functional teams to standardize research workflows");

  y -= 3;
  // Gema
  page.drawText("Marketing Intern", { x: margin, y, size: 9, font: fontBold, color: colorBlack });
  const gemaCompany = " | Gema Education Technology Pvt. Ltd.";
  page.drawText(gemaCompany, { x: margin + fontBold.widthOfTextAtSize("Marketing Intern", 9), y, size: 9, font: fontRegular, color: colorBlack });
  const gemaDates = "Aug 2025 – Oct 2025";
  page.drawText(gemaDates, { x: width - margin - fontBold.widthOfTextAtSize(gemaDates, 9), y, size: 9, font: fontBold, color: colorBlack });
  y -= 12;

  drawBullet("Supported market research and competitor analysis in the ed-tech sector to identify customer segments and inform campaign strategy");
  drawBullet("Interacted with prospective customers to gather feedback and business insights; summarized findings in reports and presentations for internal stakeholders");

  // --- PROJECTS ---
  drawSectionHeading("PROJECTS");
  // 1. CAGNEX
  page.drawText("CAGNEX — Full-Stack Application", { x: margin, y, size: 9, font: fontBold, color: colorBlack });
  const cagnexSub = " | Web Platform & Analytics Engine (cagnex.vercel.app)";
  page.drawText(cagnexSub, { x: margin + fontBold.widthOfTextAtSize("CAGNEX — Full-Stack Application", 9), y, size: 8.5, font: fontRegular, color: colorGray });
  const cagnexDates = "2025";
  page.drawText(cagnexDates, { x: width - margin - fontBold.widthOfTextAtSize(cagnexDates, 9), y, size: 9, font: fontBold, color: colorBlack });
  y -= 12;
  drawBullet("Engineered full-stack digital product on Vercel backed by Supabase with role-based auth, dynamic state management, and real-time database syncing");

  // 2. Crude Oil
  page.drawText("Commodity & Industry Analysis — Crude Oil Impact on Equity Performance", { x: margin, y, size: 9, font: fontBold, color: colorBlack });
  const crudeSub = " | Independent Project";
  page.drawText(crudeSub, { x: margin + fontBold.widthOfTextAtSize("Commodity & Industry Analysis — Crude Oil Impact on Equity Performance", 9), y, size: 8.5, font: fontRegular, color: colorGray });
  y -= 12;
  drawBullet("Conducted correlation analysis between crude oil prices and a listed company's stock performance using advanced MS Excel (trend comparison, charts, pivot tables)");
  drawBullet("Collected and validated multi-year historical market data; analyzed how global commodity cycles affect profitability, stock volatility, and industry trends");
  drawBullet("Presented insights on macro-commodity influence on equity valuation as a structured report with data-backed recommendations");

  // 3. Personal Finance
  page.drawText("Personal Finance & Investment Research", { x: margin, y, size: 9, font: fontBold, color: colorBlack });
  const pfSub = " | Content Initiative";
  page.drawText(pfSub, { x: margin + fontBold.widthOfTextAtSize("Personal Finance & Investment Research", 9), y, size: 8.5, font: fontRegular, color: colorGray });
  y -= 12;
  drawBullet("Researched SIPs, index funds, and long-term wealth strategies; distilled complex financial concepts into simplified insights for a student audience");

  // --- SKILLS ---
  drawSectionHeading("SKILLS");
  function drawSkillRow(label, items) {
    page.drawText(label, { x: margin, y, size: 8.2, font: fontBold, color: colorBlack });
    const labelWidth = fontBold.widthOfTextAtSize(label, 8.2);
    page.drawText(items, { x: margin + labelWidth, y, size: 8.2, font: fontRegular, color: colorBlack });
    y -= 11.5;
  }

  drawSkillRow("Core Competencies: ", "Market Research | Competitive Intelligence | Business Analysis | Data Collection & Validation | Industry Trend Analysis | Strategic Recommendations");
  drawSkillRow("Technical Skills: ", "MS Excel (Advanced – Pivot Tables, Lookups, Dashboards) | Power BI | SQL | Python (Basics) | Financial Modeling (DCF) | MS PowerPoint");
  drawSkillRow("Soft Skills: ", "Communication (Fluent English) | Business Acumen | Negotiation | Problem Solving | Analytical Thinking | Teamwork");

  // --- CERTIFICATIONS & ACHIEVEMENTS ---
  drawSectionHeading("CERTIFICATIONS & ACHIEVEMENTS");
  drawBullet("Analytics for Business Problem Solving – IIM Ahmedabad | Financial Modelling (DCF Valuation & Scenario Analysis)");
  drawBullet("Certificate Program in Entrepreneurship and Start Up Mastery – IIM Mumbai & Masai | Solar Entrepreneurship ESDP – Pondicherry University");
  drawBullet("Financial Markets & Investment Fundamentals | Advanced Excel for Business Analytics");
  drawBullet("Participant — Tata Crucible Business Quiz & Innovate-a-thon (E-Cell IIT Dhanbad Challenge); finance & analytics content creator");

  const pdfBytes = await pdfDoc.save();

  const publicDir = path.join(__dirname, "..", "public");
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const outputPath = path.join(publicDir, "resume.pdf");
  fs.writeFileSync(outputPath, pdfBytes);
  console.log("Resume PDF generated successfully at:", outputPath);
}

generateResume().catch((err) => {
  console.error("Error generating resume PDF:", err);
  process.exit(1);
});
