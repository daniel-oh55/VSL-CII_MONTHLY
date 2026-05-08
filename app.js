// CII Monthly Report Generator
// - EXPORT 엑셀을 브라우저에서 직접 분석합니다.
// - 서버 업로드 없이 사용 가능하므로 GitHub Pages 배포에 적합합니다.

const state = {
  rawRows: [],
  vessels: [],
  deVessels: [],
  gradeCounts: {},
  workbookName: "",
};

const requiredColumns = [
  "Name",
  "Code",
  "DWT",
  "Hours",
  "FOC",
  "Distance",
  "Avg Speed",
  "Grade",
  "Rating(%)",
  "Attained CII",
  "Required CII",
];

const monthLabels = Array.from({ length: 12 }, (_, i) => String(i + 1));

const fileInput = document.getElementById("fileInput");
const analyzeBtn = document.getElementById("analyzeBtn");
const fileStatus = document.getElementById("fileStatus");
const validationResult = document.getElementById("validationResult");
const searchInput = document.getElementById("searchInput");
const downloadBtn = document.getElementById("downloadBtn");
const copySummaryBtn = document.getElementById("copySummaryBtn");

fileInput.addEventListener("change", () => {
  const file = fileInput.files?.[0];
  fileStatus.textContent = file ? `선택된 파일: ${file.name}` : "아직 파일이 선택되지 않았습니다.";
});

analyzeBtn.addEventListener("click", handleAnalyze);
searchInput.addEventListener("input", () => renderDETable(filterDEVessels(searchInput.value)));
downloadBtn.addEventListener("click", downloadReport);
copySummaryBtn.addEventListener("click", copySummary);

async function handleAnalyze() {
  const file = fileInput.files?.[0];

  if (!file) {
    alert("먼저 EXPORT 엑셀 파일을 선택해 주세요.");
    return;
  }

  if (typeof XLSX === "undefined") {
    alert("SheetJS 라이브러리를 불러오지 못했습니다. 인터넷 연결 또는 CDN 접근 가능 여부를 확인해 주세요.");
    return;
  }

  try {
    fileStatus.textContent = "엑셀 파일을 읽는 중입니다...";
    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: "array", cellDates: true });
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];

    // header: 1 옵션으로 배열 형태로 읽은 뒤, EXPORT 파일의 2번째 행을 실제 헤더로 사용합니다.
    const rows = XLSX.utils.sheet_to_json(worksheet, {
      header: 1,
      defval: "",
      raw: false,
    });

    const parsed = parseExportRows(rows);
    state.rawRows = rows;
    state.vessels = parsed.vessels;
    state.deVessels = parsed.vessels.filter((v) => ["D", "E"].includes(v.grade));
    state.gradeCounts = countGrades(parsed.vessels);
    state.workbookName = file.name;

    renderValidation(parsed);
    renderDashboard();
    renderGradeChart();
    renderDETable(state.deVessels);
    renderMonthlyTable(state.vessels);
    renderSummary();

    fileStatus.textContent = `분석 완료: ${file.name}`;
  } catch (error) {
    console.error(error);
    alert("파일 분석 중 오류가 발생했습니다. EXPORT 파일 양식이 맞는지 확인해 주세요.");
    fileStatus.textContent = "분석 실패";
  }
}

function parseExportRows(rows) {
  if (!rows || rows.length < 3) {
    throw new Error("No data rows");
  }

  // 첨부 EXPORT 기준:
  // 1행: 그룹 헤더, 2행: 실제 컬럼명, 3행부터 데이터
  const headerRowIndex = detectHeaderRow(rows);
  const header = rows[headerRowIndex].map((cell) => String(cell).trim());
  const dataRows = rows.slice(headerRowIndex + 1);

  const index = buildColumnIndex(header);
  const missingColumns = requiredColumns.filter((col) => index[col] === undefined);

  const vessels = dataRows
    .map((row) => normalizeVessel(row, index))
    .filter((v) => v.name || v.code);

  return {
    header,
    index,
    missingColumns,
    vessels,
    totalRows: vessels.length,
    validRows: vessels.filter((v) => v.grade).length,
  };
}

function detectHeaderRow(rows) {
  const candidates = rows.slice(0, 8);

  for (let i = 0; i < candidates.length; i += 1) {
    const normalized = candidates[i].map((cell) => String(cell).trim());
    if (normalized.includes("Name") && normalized.includes("Code") && normalized.includes("Grade")) {
      return i;
    }
  }

  // 첨부 EXPORT 파일 기본값
  return 1;
}

function buildColumnIndex(header) {
  const index = {};
  header.forEach((name, colIndex) => {
    if (!name) return;

    // 1~12월 컬럼은 Month 그룹 아래 숫자만 들어오므로 별도 관리합니다.
    if (monthLabels.includes(name) && index[`month_${name}`] === undefined) {
      index[`month_${name}`] = colIndex;
      return;
    }

    if (index[name] === undefined) {
      index[name] = colIndex;
    }
  });

  return index;
}

function normalizeVessel(row, index) {
  const grade = cleanGrade(getCell(row, index.Grade));
  const required = toNumber(getCell(row, index["Required CII"]));
  const attained = toNumber(getCell(row, index["Attained CII"]));
  const ratingFromFile = toNumber(getCell(row, index["Rating(%)"]));
  const calculatedRating = required > 0 && attained > 0 ? (attained / required) * 100 : null;

  const monthly = {};
  monthLabels.forEach((month) => {
    monthly[month] = cleanGrade(getCell(row, index[`month_${month}`]));
  });

  const rating = ratingFromFile || calculatedRating;

  return {
    no: toNumber(getCell(row, index.No)),
    type: getCell(row, index.Type),
    name: getCell(row, index.Name),
    code: getCell(row, index.Code),
    deliveryDate: getCell(row, index["Delivery Date"]),
    dwt: toNumber(getCell(row, index.DWT)),
    hours: toNumber(getCell(row, index.Hours)),
    foc: toNumber(getCell(row, index.FOC)),
    distance: toNumber(getCell(row, index.Distance)),
    avgSpeed: toNumber(getCell(row, index["Avg Speed"])),
    grade,
    monthly,
    focPerDay: toNumber(getCell(row, index["FOC(mt/day)"])),
    rating,
    attainedCii: attained,
    requiredCii: required,
    risk: getRiskLabel(grade, rating),
  };
}

function getCell(row, idx) {
  if (idx === undefined || idx === null) return "";
  return row[idx] ?? "";
}

function cleanGrade(value) {
  const grade = String(value || "").trim().toUpperCase();
  return ["A", "B", "C", "D", "E"].includes(grade) ? grade : "";
}

function toNumber(value) {
  if (value === null || value === undefined || value === "") return null;
  const num = Number(String(value).replace(/,/g, "").replace("%", ""));
  return Number.isFinite(num) ? num : null;
}

function formatNumber(value, digits = 1) {
  if (value === null || value === undefined || value === "") return "-";
  return Number(value).toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

function formatInteger(value) {
  if (value === null || value === undefined || value === "") return "-";
  return Number(value).toLocaleString("en-US", { maximumFractionDigits: 0 });
}

function formatRating(value) {
  if (value === null || value === undefined || value === "") return "-";
  return `${Math.round(Number(value))}%`;
}

function countGrades(vessels) {
  const counts = { A: 0, B: 0, C: 0, D: 0, E: 0 };
  vessels.forEach((v) => {
    if (counts[v.grade] !== undefined) {
      counts[v.grade] += 1;
    }
  });
  return counts;
}

function getRiskLabel(grade, rating) {
  if (grade === "E" || Number(rating) >= 120) return "High Risk";
  if (grade === "D" || Number(rating) >= 110) return "Watch";
  return "Normal";
}

function renderValidation(parsed) {
  const missing = parsed.missingColumns.length
    ? `<span class="risk-high">누락 컬럼: ${parsed.missingColumns.join(", ")}</span>`
    : `<span class="risk-normal">필수 컬럼 정상</span>`;

  validationResult.innerHTML = `
    전체 선박: <strong>${parsed.totalRows}</strong>척<br>
    CII 산출 대상: <strong>${parsed.validRows}</strong>척<br>
    D/E 등급: <strong>${state.deVessels.length}</strong>척<br>
    ${missing}
  `;
}

function renderDashboard() {
  const total = state.vessels.length;
  const valid = state.vessels.filter((v) => v.grade).length;
  const eCount = state.gradeCounts.E || 0;

  document.getElementById("kpiTotal").textContent = total;
  document.getElementById("kpiValid").textContent = valid;
  document.getElementById("kpiDE").textContent = state.deVessels.length;
  document.getElementById("kpiE").textContent = eCount;
}

function renderGradeChart() {
  const container = document.getElementById("gradeChart");
  const max = Math.max(...Object.values(state.gradeCounts), 1);
  const grades = ["A", "B", "C", "D", "E"];

  container.classList.remove("empty");
  container.innerHTML = grades
    .map((grade) => {
      const count = state.gradeCounts[grade] || 0;
      const width = Math.max((count / max) * 100, count > 0 ? 5 : 0);
      return `
        <div class="grade-row">
          <div class="grade-label"><span class="grade-badge grade-${grade}">${grade}</span></div>
          <div class="grade-track">
            <div class="grade-bar grade-bar-${grade}" style="width:${width}%"></div>
          </div>
          <div class="grade-count">${count}척</div>
        </div>
      `;
    })
    .join("");
}

function renderDETable(vessels) {
  const tbody = document.getElementById("deTableBody");

  if (!vessels.length) {
    tbody.innerHTML = `<tr><td colspan="11" class="empty-cell">D/E 등급 선박이 없습니다.</td></tr>`;
    return;
  }

  tbody.innerHTML = vessels
    .map((v, idx) => {
      const riskClass = v.risk === "High Risk" ? "risk-high" : v.risk === "Watch" ? "risk-watch" : "risk-normal";
      return `
        <tr>
          <td>${idx + 1}</td>
          <td>${escapeHtml(v.code)}</td>
          <td>${escapeHtml(v.name)}</td>
          <td><span class="grade-badge grade-${v.grade}">${v.grade}</span></td>
          <td>${formatRating(v.rating)}</td>
          <td>${formatNumber(v.foc, 1)}</td>
          <td>${formatNumber(v.distance, 1)}</td>
          <td>${formatNumber(v.avgSpeed, 1)}</td>
          <td>${formatNumber(v.attainedCii, 2)}</td>
          <td>${formatNumber(v.requiredCii, 2)}</td>
          <td class="${riskClass}">${v.risk}</td>
        </tr>
      `;
    })
    .join("");
}

function renderMonthlyTable(vessels) {
  const tbody = document.getElementById("monthlyTableBody");
  const valid = vessels.filter((v) => v.grade);

  if (!valid.length) {
    tbody.innerHTML = `<tr><td colspan="15" class="empty-cell">월별 등급 데이터가 없습니다.</td></tr>`;
    return;
  }

  tbody.innerHTML = valid
    .map((v) => {
      const monthCells = monthLabels
        .map((month) => {
          const grade = v.monthly[month];
          return `<td>${grade ? `<span class="grade-badge grade-${grade}">${grade}</span>` : "-"}</td>`;
        })
        .join("");

      return `
        <tr>
          <td>${escapeHtml(v.code)}</td>
          <td>${escapeHtml(v.name)}</td>
          <td>${v.grade ? `<span class="grade-badge grade-${v.grade}">${v.grade}</span>` : "-"}</td>
          ${monthCells}
        </tr>
      `;
    })
    .join("");
}

function renderSummary() {
  const reportMonth = document.getElementById("reportMonth").value;
  const monthText = reportMonth ? reportMonth.replace("-", "년 ") + "월" : "해당 월";
  const valid = state.vessels.filter((v) => v.grade).length;
  const deCount = state.deVessels.length;
  const eCount = state.gradeCounts.E || 0;
  const dCount = state.gradeCounts.D || 0;
  const deRatio = valid ? Math.round((deCount / valid) * 100) : 0;

  const highRiskNames = state.deVessels
    .filter((v) => v.risk === "High Risk")
    .slice(0, 5)
    .map((v) => `${v.code || v.name}(${v.grade}/${formatRating(v.rating)})`)
    .join(", ");

  const summary = [
    `${monthText} CII 분석 결과, CII 산출 대상 ${valid}척 중 D/E 등급 선박은 ${deCount}척(${deRatio}%)입니다.`,
    `세부적으로 D등급은 ${dCount}척, E등급은 ${eCount}척으로 확인됩니다.`,
    highRiskNames
      ? `우선 관리 대상 선박은 ${highRiskNames} 등이며, 운항 거리, 평균 속력, 연료소모량 변동 원인 검토가 필요합니다.`
      : `현재 High Risk로 분류된 선박은 없습니다.`,
    `본 결과는 업로드된 EXPORT 파일(${state.workbookName}) 기준으로 자동 산출되었습니다.`,
  ].join("\n");

  document.getElementById("summaryText").value = summary;
}

function filterDEVessels(keyword) {
  const value = String(keyword || "").trim().toLowerCase();
  if (!value) return state.deVessels;

  return state.deVessels.filter((v) => {
    return (
      String(v.name).toLowerCase().includes(value) ||
      String(v.code).toLowerCase().includes(value)
    );
  });
}

function downloadReport() {
  if (!state.vessels.length) {
    alert("먼저 EXPORT 파일을 분석해 주세요.");
    return;
  }

  const reportMonth = document.getElementById("reportMonth").value || "monthly";
  const wb = XLSX.utils.book_new();

  const summaryRows = buildSummarySheetRows();
  const deRows = state.deVessels.map((v, idx) => ({
    No: idx + 1,
    Code: v.code,
    Vessel: v.name,
    Grade: v.grade,
    "Rating(%)": v.rating,
    FOC: v.foc,
    Distance: v.distance,
    "Avg Speed": v.avgSpeed,
    "Attained CII": v.attainedCii,
    "Required CII": v.requiredCii,
    Risk: v.risk,
  }));

  const monthlyRows = state.vessels
    .filter((v) => v.grade)
    .map((v) => ({
      Code: v.code,
      Vessel: v.name,
      "Current Grade": v.grade,
      "1월": v.monthly["1"],
      "2월": v.monthly["2"],
      "3월": v.monthly["3"],
      "4월": v.monthly["4"],
      "5월": v.monthly["5"],
      "6월": v.monthly["6"],
      "7월": v.monthly["7"],
      "8월": v.monthly["8"],
      "9월": v.monthly["9"],
      "10월": v.monthly["10"],
      "11월": v.monthly["11"],
      "12월": v.monthly["12"],
    }));

  const rawRows = state.vessels.map((v) => ({
    Code: v.code,
    Vessel: v.name,
    Type: v.type,
    DWT: v.dwt,
    Hours: v.hours,
    FOC: v.foc,
    Distance: v.distance,
    "Avg Speed": v.avgSpeed,
    Grade: v.grade,
    "Rating(%)": v.rating,
    "Attained CII": v.attainedCii,
    "Required CII": v.requiredCii,
  }));

  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(summaryRows), "01_Dashboard");
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(deRows), "02_DE_Vessels");
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(monthlyRows), "03_Monthly_Grade");
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(rawRows), "04_Raw_Data");

  XLSX.writeFile(wb, `${reportMonth}_CII_Report.xlsx`);
}

function buildSummarySheetRows() {
  const valid = state.vessels.filter((v) => v.grade).length;
  const deCount = state.deVessels.length;

  return [
    ["CII Monthly Report"],
    [],
    ["Source File", state.workbookName],
    ["Total Vessels", state.vessels.length],
    ["CII Valid Vessels", valid],
    ["D/E Vessels", deCount],
    ["E Grade Vessels", state.gradeCounts.E || 0],
    [],
    ["Grade", "Count"],
    ["A", state.gradeCounts.A || 0],
    ["B", state.gradeCounts.B || 0],
    ["C", state.gradeCounts.C || 0],
    ["D", state.gradeCounts.D || 0],
    ["E", state.gradeCounts.E || 0],
    [],
    ["Auto Summary"],
    [document.getElementById("summaryText").value],
  ];
}

async function copySummary() {
  const text = document.getElementById("summaryText").value;
  if (!text) {
    alert("복사할 요약문이 없습니다.");
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
    alert("보고용 요약문을 복사했습니다.");
  } catch {
    alert("브라우저 권한 문제로 복사하지 못했습니다. 텍스트를 직접 선택해 복사해 주세요.");
  }
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
