// CII Monthly Report Generator v2
// 요청 반영 사항
// 1) 기존 CII 등급표의 선박 리스트만 조회
// 2) 누적등급 / OWNER / 관리사 / 선박 / 최근 12개월 표시
// 3) 누적등급 → OWNER → 관리사 → 선박 순으로 정렬
// 4) OWNER/관리사는 영어 항목을 먼저, 한글 항목을 뒤로 정렬

const VESSEL_MASTER = [
  {
    "code": "HTVY",
    "owner": "SKR",
    "manager": "SSM"
  },
  {
    "code": "MJEP",
    "owner": "SKR",
    "manager": "SSM"
  },
  {
    "code": "OSVY",
    "owner": "SKR",
    "manager": "SSM"
  },
  {
    "code": "SDTR",
    "owner": "SKR",
    "manager": "SSM"
  },
  {
    "code": "VTVY",
    "owner": "SKR",
    "manager": "SSM"
  },
  {
    "code": "NBTD",
    "owner": "SKR",
    "manager": "FLEET"
  },
  {
    "code": "HKEP",
    "owner": "HAS",
    "manager": "SSM"
  },
  {
    "code": "PCNB",
    "owner": "실버마리타임",
    "manager": "SYNERGY"
  },
  {
    "code": "PCSG",
    "owner": "실버마리타임",
    "manager": "COLUMBIA"
  },
  {
    "code": "PCSZ",
    "owner": "실버마리타임",
    "manager": "COLUMBIA"
  },
  {
    "code": "HMVY",
    "owner": "SKR",
    "manager": "SSM"
  },
  {
    "code": "SHVY",
    "owner": "SKR",
    "manager": "SSM"
  },
  {
    "code": "HAHM",
    "owner": "HAS",
    "manager": "SSM"
  },
  {
    "code": "SWTD",
    "owner": "HAS",
    "manager": "SSM"
  },
  {
    "code": "PCBS",
    "owner": "실버마리타임",
    "manager": "SYNERGY"
  },
  {
    "code": "ATPR",
    "owner": "실버마리타임",
    "manager": "COLUMBIA"
  },
  {
    "code": "ATSH",
    "owner": "실버마리타임",
    "manager": "COLUMBIA"
  },
  {
    "code": "PCBJ",
    "owner": "실버마리타임",
    "manager": "COLUMBIA"
  },
  {
    "code": "PCTJ",
    "owner": "실버마리타임",
    "manager": "COLUMBIA"
  },
  {
    "code": "AWBG",
    "owner": "SKR",
    "manager": "SSM"
  },
  {
    "code": "JKVY",
    "owner": "SKR",
    "manager": "SSM"
  },
  {
    "code": "KBTR",
    "owner": "SKR",
    "manager": "SSM"
  },
  {
    "code": "QDTR",
    "owner": "SKR",
    "manager": "SSM"
  },
  {
    "code": "SKNT",
    "owner": "SKR",
    "manager": "SSM"
  },
  {
    "code": "SWAL",
    "owner": "SKR",
    "manager": "SSM"
  },
  {
    "code": "SWCP",
    "owner": "SKR",
    "manager": "SSM"
  },
  {
    "code": "SWMM",
    "owner": "SKR",
    "manager": "SSM"
  },
  {
    "code": "SWRG",
    "owner": "SKR",
    "manager": "SSM"
  },
  {
    "code": "SWSI",
    "owner": "SKR",
    "manager": "SSM"
  },
  {
    "code": "YKTD",
    "owner": "SKR",
    "manager": "SSM"
  },
  {
    "code": "HSWH",
    "owner": "HSL",
    "manager": "SSM"
  },
  {
    "code": "HAHP",
    "owner": "HAS",
    "manager": "SSM"
  },
  {
    "code": "HAJN",
    "owner": "HAS",
    "manager": "SSM"
  },
  {
    "code": "HAKT",
    "owner": "HAS",
    "manager": "SSM"
  },
  {
    "code": "HASR",
    "owner": "HAS",
    "manager": "SSM"
  },
  {
    "code": "HAXM",
    "owner": "HAS",
    "manager": "SSM"
  },
  {
    "code": "HAYN",
    "owner": "HAS",
    "manager": "SSM"
  },
  {
    "code": "JHAB",
    "owner": "HAS",
    "manager": "SSM"
  },
  {
    "code": "CNVY",
    "owner": "SKR BBC",
    "manager": "FLEET"
  },
  {
    "code": "AKTR",
    "owner": "SKR",
    "manager": "SSM"
  },
  {
    "code": "HKVY",
    "owner": "SKR",
    "manager": "SSM"
  },
  {
    "code": "SBVG",
    "owner": "SKR",
    "manager": "SSM"
  },
  {
    "code": "SWAT",
    "owner": "SKR",
    "manager": "SSM"
  },
  {
    "code": "SWDN",
    "owner": "SKR",
    "manager": "SSM"
  },
  {
    "code": "SWIC",
    "owner": "SKR",
    "manager": "SSM"
  },
  {
    "code": "SWPC",
    "owner": "SKR",
    "manager": "SSM"
  },
  {
    "code": "SWSH",
    "owner": "SKR",
    "manager": "SSM"
  },
  {
    "code": "SWSP",
    "owner": "SKR",
    "manager": "SSM"
  },
  {
    "code": "SWSR",
    "owner": "SKR",
    "manager": "SSM"
  },
  {
    "code": "SWVG",
    "owner": "SKR",
    "manager": "SSM"
  },
  {
    "code": "TYTR",
    "owner": "SKR",
    "manager": "SSM"
  },
  {
    "code": "LCVY",
    "owner": "HAS",
    "manager": "SSM"
  },
  {
    "code": "NBVY",
    "owner": "HAS",
    "manager": "SSM"
  },
  {
    "code": "ICVY",
    "owner": "SKR",
    "manager": "SSM"
  },
  {
    "code": "KYVY",
    "owner": "SKR",
    "manager": "SSM"
  },
  {
    "code": "MEBG",
    "owner": "SKR",
    "manager": "SSM"
  },
  {
    "code": "NGTR",
    "owner": "SKR",
    "manager": "SSM"
  },
  {
    "code": "SDBG",
    "owner": "SKR",
    "manager": "SSM"
  },
  {
    "code": "SWBT",
    "owner": "SKR",
    "manager": "SSM"
  },
  {
    "code": "SWCG",
    "owner": "SKR",
    "manager": "SSM"
  },
  {
    "code": "SWXM",
    "owner": "SKR",
    "manager": "SSM"
  },
  {
    "code": "USVY",
    "owner": "SKR",
    "manager": "SSM"
  },
  {
    "code": "YSVY",
    "owner": "SKR",
    "manager": "SSM"
  },
  {
    "code": "YTTR",
    "owner": "SKR",
    "manager": "SSM"
  },
  {
    "code": "MBBG",
    "owner": "HAS",
    "manager": "SSM"
  },
  {
    "code": "QDVY",
    "owner": "HAS",
    "manager": "SSM"
  },
  {
    "code": "TJVY",
    "owner": "HAS",
    "manager": "SSM"
  }
];

const BASELINE_HISTORY = {
  "HTVY": {
    "2025-04": "E",
    "2025-05": "E",
    "2025-06": "E",
    "2025-07": "E",
    "2025-08": "E",
    "2025-09": "E",
    "2025-10": "E",
    "2025-11": "D",
    "2025-12": "D",
    "2026-01": "E",
    "2026-02": "D",
    "2026-03": "E"
  },
  "MJEP": {
    "2025-04": "",
    "2025-05": "",
    "2025-06": "",
    "2025-07": "",
    "2025-08": "",
    "2025-09": "D",
    "2025-10": "E",
    "2025-11": "E",
    "2025-12": "E",
    "2026-01": "E",
    "2026-02": "E",
    "2026-03": "E"
  },
  "OSVY": {
    "2025-04": "E",
    "2025-05": "E",
    "2025-06": "E",
    "2025-07": "E",
    "2025-08": "D",
    "2025-09": "C",
    "2025-10": "E",
    "2025-11": "D",
    "2025-12": "D",
    "2026-01": "D",
    "2026-02": "D",
    "2026-03": "E"
  },
  "SDTR": {
    "2025-04": "D",
    "2025-05": "E",
    "2025-06": "E",
    "2025-07": "E",
    "2025-08": "D",
    "2025-09": "E",
    "2025-10": "E",
    "2025-11": "E",
    "2025-12": "E",
    "2026-01": "E",
    "2026-02": "E",
    "2026-03": "E"
  },
  "VTVY": {
    "2025-04": "E",
    "2025-05": "E",
    "2025-06": "D",
    "2025-07": "D",
    "2025-08": "D",
    "2025-09": "E",
    "2025-10": "E",
    "2025-11": "D",
    "2025-12": "E",
    "2026-01": "E",
    "2026-02": "E",
    "2026-03": "E"
  },
  "NBTD": {
    "2025-04": "E",
    "2025-05": "D",
    "2025-06": "D",
    "2025-07": "D",
    "2025-08": "D",
    "2025-09": "E",
    "2025-10": "E",
    "2025-11": "D",
    "2025-12": "D",
    "2026-01": "E",
    "2026-02": "E",
    "2026-03": "E"
  },
  "HKEP": {
    "2025-04": "",
    "2025-05": "",
    "2025-06": "",
    "2025-07": "",
    "2025-08": "",
    "2025-09": "",
    "2025-10": "",
    "2025-11": "",
    "2025-12": "E",
    "2026-01": "E",
    "2026-02": "E",
    "2026-03": "E"
  },
  "PCNB": {
    "2025-04": "D",
    "2025-05": "D",
    "2025-06": "E",
    "2025-07": "E",
    "2025-08": "E",
    "2025-09": "D",
    "2025-10": "E",
    "2025-11": "D",
    "2025-12": "E",
    "2026-01": "E",
    "2026-02": "E",
    "2026-03": "E"
  },
  "PCSG": {
    "2025-04": "E",
    "2025-05": "E",
    "2025-06": "E",
    "2025-07": "E",
    "2025-08": "E",
    "2025-09": "E",
    "2025-10": "E",
    "2025-11": "E",
    "2025-12": "E",
    "2026-01": "E",
    "2026-02": "E",
    "2026-03": "D"
  },
  "PCSZ": {
    "2025-04": "E",
    "2025-05": "E",
    "2025-06": "E",
    "2025-07": "E",
    "2025-08": "E",
    "2025-09": "E",
    "2025-10": "E",
    "2025-11": "E",
    "2025-12": "E",
    "2026-01": "E",
    "2026-02": "E",
    "2026-03": "E"
  },
  "HMVY": {
    "2025-04": "D",
    "2025-05": "C",
    "2025-06": "D",
    "2025-07": "D",
    "2025-08": "D",
    "2025-09": "D",
    "2025-10": "C",
    "2025-11": "E",
    "2025-12": "D",
    "2026-01": "E",
    "2026-02": "C",
    "2026-03": "D"
  },
  "SHVY": {
    "2025-04": "C",
    "2025-05": "C",
    "2025-06": "C",
    "2025-07": "E",
    "2025-08": "C",
    "2025-09": "D",
    "2025-10": "D",
    "2025-11": "C",
    "2025-12": "A",
    "2026-01": "C",
    "2026-02": "D",
    "2026-03": "C"
  },
  "HAHM": {
    "2025-04": "D",
    "2025-05": "D",
    "2025-06": "E",
    "2025-07": "D",
    "2025-08": "E",
    "2025-09": "D",
    "2025-10": "E",
    "2025-11": "E",
    "2025-12": "D",
    "2026-01": "D",
    "2026-02": "D",
    "2026-03": "D"
  },
  "SWTD": {
    "2025-04": "D",
    "2025-05": "C",
    "2025-06": "C",
    "2025-07": "C",
    "2025-08": "D",
    "2025-09": "C",
    "2025-10": "D",
    "2025-11": "D",
    "2025-12": "D",
    "2026-01": "E",
    "2026-02": "D",
    "2026-03": "C"
  },
  "PCBS": {
    "2025-04": "E",
    "2025-05": "E",
    "2025-06": "D",
    "2025-07": "C",
    "2025-08": "A",
    "2025-09": "B",
    "2025-10": "D",
    "2025-11": "D",
    "2025-12": "E",
    "2026-01": "E",
    "2026-02": "E",
    "2026-03": "D"
  },
  "ATPR": {
    "2025-04": "B",
    "2025-05": "D",
    "2025-06": "D",
    "2025-07": "E",
    "2025-08": "E",
    "2025-09": "E",
    "2025-10": "E",
    "2025-11": "E",
    "2025-12": "E",
    "2026-01": "E",
    "2026-02": "E",
    "2026-03": "E"
  },
  "ATSH": {
    "2025-04": "C",
    "2025-05": "D",
    "2025-06": "D",
    "2025-07": "D",
    "2025-08": "D",
    "2025-09": "D",
    "2025-10": "D",
    "2025-11": "D",
    "2025-12": "E",
    "2026-01": "E",
    "2026-02": "C",
    "2026-03": "C"
  },
  "PCBJ": {
    "2025-04": "D",
    "2025-05": "D",
    "2025-06": "D",
    "2025-07": "D",
    "2025-08": "D",
    "2025-09": "D",
    "2025-10": "D",
    "2025-11": "E",
    "2025-12": "E",
    "2026-01": "D",
    "2026-02": "E",
    "2026-03": "C"
  },
  "PCTJ": {
    "2025-04": "D",
    "2025-05": "D",
    "2025-06": "D",
    "2025-07": "D",
    "2025-08": "D",
    "2025-09": "D",
    "2025-10": "E",
    "2025-11": "E",
    "2025-12": "E",
    "2026-01": "E",
    "2026-02": "C",
    "2026-03": "C"
  },
  "AWBG": {
    "2025-04": "D",
    "2025-05": "D",
    "2025-06": "C",
    "2025-07": "",
    "2025-08": "D",
    "2025-09": "A",
    "2025-10": "B",
    "2025-11": "B",
    "2025-12": "B",
    "2026-01": "C",
    "2026-02": "E",
    "2026-03": "D"
  },
  "JKVY": {
    "2025-04": "",
    "2025-05": "",
    "2025-06": "",
    "2025-07": "",
    "2025-08": "",
    "2025-09": "",
    "2025-10": "",
    "2025-11": "E",
    "2025-12": "C",
    "2026-01": "C",
    "2026-02": "C",
    "2026-03": "C"
  },
  "KBTR": {
    "2025-04": "C",
    "2025-05": "B",
    "2025-06": "B",
    "2025-07": "C",
    "2025-08": "C",
    "2025-09": "B",
    "2025-10": "C",
    "2025-11": "C",
    "2025-12": "C",
    "2026-01": "C",
    "2026-02": "C",
    "2026-03": "D"
  },
  "QDTR": {
    "2025-04": "B",
    "2025-05": "B",
    "2025-06": "D",
    "2025-07": "D",
    "2025-08": "C",
    "2025-09": "D",
    "2025-10": "C",
    "2025-11": "C",
    "2025-12": "C",
    "2026-01": "B",
    "2026-02": "B",
    "2026-03": "B"
  },
  "SKNT": {
    "2025-04": "C",
    "2025-05": "C",
    "2025-06": "C",
    "2025-07": "C",
    "2025-08": "C",
    "2025-09": "C",
    "2025-10": "C",
    "2025-11": "C",
    "2025-12": "D",
    "2026-01": "E",
    "2026-02": "C",
    "2026-03": "A"
  },
  "SWAL": {
    "2025-04": "D",
    "2025-05": "C",
    "2025-06": "B",
    "2025-07": "C",
    "2025-08": "A",
    "2025-09": "B",
    "2025-10": "B",
    "2025-11": "A",
    "2025-12": "C",
    "2026-01": "C",
    "2026-02": "C",
    "2026-03": "A"
  },
  "SWCP": {
    "2025-04": "C",
    "2025-05": "C",
    "2025-06": "B",
    "2025-07": "C",
    "2025-08": "C",
    "2025-09": "C",
    "2025-10": "B",
    "2025-11": "B",
    "2025-12": "B",
    "2026-01": "B",
    "2026-02": "A",
    "2026-03": "B"
  },
  "SWMM": {
    "2025-04": "C",
    "2025-05": "C",
    "2025-06": "C",
    "2025-07": "C",
    "2025-08": "B",
    "2025-09": "C",
    "2025-10": "C",
    "2025-11": "B",
    "2025-12": "B",
    "2026-01": "C",
    "2026-02": "A",
    "2026-03": "B"
  },
  "SWRG": {
    "2025-04": "C",
    "2025-05": "C",
    "2025-06": "D",
    "2025-07": "D",
    "2025-08": "D",
    "2025-09": "C",
    "2025-10": "D",
    "2025-11": "D",
    "2025-12": "D",
    "2026-01": "E",
    "2026-02": "E",
    "2026-03": "C"
  },
  "SWSI": {
    "2025-04": "B",
    "2025-05": "C",
    "2025-06": "C",
    "2025-07": "C",
    "2025-08": "B",
    "2025-09": "C",
    "2025-10": "B",
    "2025-11": "C",
    "2025-12": "B",
    "2026-01": "D",
    "2026-02": "A",
    "2026-03": "B"
  },
  "YKTD": {
    "2025-04": "B",
    "2025-05": "B",
    "2025-06": "C",
    "2025-07": "A",
    "2025-08": "A",
    "2025-09": "A",
    "2025-10": "A",
    "2025-11": "A",
    "2025-12": "A",
    "2026-01": "B",
    "2026-02": "B",
    "2026-03": "B"
  },
  "HSWH": {
    "2025-04": "",
    "2025-05": "",
    "2025-06": "",
    "2025-07": "A",
    "2025-08": "C",
    "2025-09": "E",
    "2025-10": "E",
    "2025-11": "E",
    "2025-12": "D",
    "2026-01": "E",
    "2026-02": "E",
    "2026-03": "E"
  },
  "HAHP": {
    "2025-04": "D",
    "2025-05": "C",
    "2025-06": "C",
    "2025-07": "C",
    "2025-08": "C",
    "2025-09": "C",
    "2025-10": "C",
    "2025-11": "D",
    "2025-12": "D",
    "2026-01": "D",
    "2026-02": "D",
    "2026-03": "C"
  },
  "HAJN": {
    "2025-04": "E",
    "2025-05": "B",
    "2025-06": "B",
    "2025-07": "C",
    "2025-08": "C",
    "2025-09": "C",
    "2025-10": "C",
    "2025-11": "C",
    "2025-12": "D",
    "2026-01": "D",
    "2026-02": "C",
    "2026-03": "C"
  },
  "HAKT": {
    "2025-04": "C",
    "2025-05": "C",
    "2025-06": "C",
    "2025-07": "D",
    "2025-08": "C",
    "2025-09": "C",
    "2025-10": "B",
    "2025-11": "B",
    "2025-12": "C",
    "2026-01": "C",
    "2026-02": "D",
    "2026-03": "C"
  },
  "HASR": {
    "2025-04": "D",
    "2025-05": "C",
    "2025-06": "C",
    "2025-07": "C",
    "2025-08": "C",
    "2025-09": "C",
    "2025-10": "E",
    "2025-11": "C",
    "2025-12": "C",
    "2026-01": "C",
    "2026-02": "C",
    "2026-03": "C"
  },
  "HAXM": {
    "2025-04": "C",
    "2025-05": "C",
    "2025-06": "C",
    "2025-07": "C",
    "2025-08": "C",
    "2025-09": "D",
    "2025-10": "D",
    "2025-11": "B",
    "2025-12": "C",
    "2026-01": "C",
    "2026-02": "C",
    "2026-03": "C"
  },
  "HAYN": {
    "2025-04": "C",
    "2025-05": "B",
    "2025-06": "B",
    "2025-07": "C",
    "2025-08": "C",
    "2025-09": "C",
    "2025-10": "C",
    "2025-11": "C",
    "2025-12": "C",
    "2026-01": "C",
    "2026-02": "C",
    "2026-03": "C"
  },
  "JHAB": {
    "2025-04": "C",
    "2025-05": "C",
    "2025-06": "D",
    "2025-07": "D",
    "2025-08": "C",
    "2025-09": "D",
    "2025-10": "C",
    "2025-11": "D",
    "2025-12": "D",
    "2026-01": "D",
    "2026-02": "D",
    "2026-03": "E"
  },
  "CNVY": {
    "2025-04": "B",
    "2025-05": "B",
    "2025-06": "B",
    "2025-07": "A",
    "2025-08": "A",
    "2025-09": "A",
    "2025-10": "C",
    "2025-11": "B",
    "2025-12": "C",
    "2026-01": "C",
    "2026-02": "C",
    "2026-03": "B"
  },
  "AKTR": {
    "2025-04": "C",
    "2025-05": "C",
    "2025-06": "B",
    "2025-07": "C",
    "2025-08": "C",
    "2025-09": "B",
    "2025-10": "C",
    "2025-11": "A",
    "2025-12": "A",
    "2026-01": "B",
    "2026-02": "C",
    "2026-03": "C"
  },
  "HKVY": {
    "2025-04": "A",
    "2025-05": "A",
    "2025-06": "A",
    "2025-07": "A",
    "2025-08": "C",
    "2025-09": "B",
    "2025-10": "A",
    "2025-11": "C",
    "2025-12": "C",
    "2026-01": "C",
    "2026-02": "C",
    "2026-03": "C"
  },
  "SBVG": {
    "2025-04": "C",
    "2025-05": "B",
    "2025-06": "A",
    "2025-07": "B",
    "2025-08": "A",
    "2025-09": "D",
    "2025-10": "E",
    "2025-11": "C",
    "2025-12": "B",
    "2026-01": "A",
    "2026-02": "B",
    "2026-03": "B"
  },
  "SWAT": {
    "2025-04": "C",
    "2025-05": "C",
    "2025-06": "C",
    "2025-07": "B",
    "2025-08": "A",
    "2025-09": "B",
    "2025-10": "B",
    "2025-11": "C",
    "2025-12": "C",
    "2026-01": "B",
    "2026-02": "B",
    "2026-03": "C"
  },
  "SWDN": {
    "2025-04": "B",
    "2025-05": "B",
    "2025-06": "B",
    "2025-07": "B",
    "2025-08": "B",
    "2025-09": "B",
    "2025-10": "C",
    "2025-11": "C",
    "2025-12": "C",
    "2026-01": "B",
    "2026-02": "A",
    "2026-03": "B"
  },
  "SWIC": {
    "2025-04": "C",
    "2025-05": "C",
    "2025-06": "B",
    "2025-07": "A",
    "2025-08": "B",
    "2025-09": "B",
    "2025-10": "A",
    "2025-11": "B",
    "2025-12": "B",
    "2026-01": "B",
    "2026-02": "B",
    "2026-03": "B"
  },
  "SWPC": {
    "2025-04": "B",
    "2025-05": "A",
    "2025-06": "A",
    "2025-07": "A",
    "2025-08": "C",
    "2025-09": "B",
    "2025-10": "B",
    "2025-11": "A",
    "2025-12": "A",
    "2026-01": "C",
    "2026-02": "B",
    "2026-03": "C"
  },
  "SWSH": {
    "2025-04": "B",
    "2025-05": "C",
    "2025-06": "C",
    "2025-07": "C",
    "2025-08": "C",
    "2025-09": "B",
    "2025-10": "B",
    "2025-11": "A",
    "2025-12": "A",
    "2026-01": "A",
    "2026-02": "A",
    "2026-03": "B"
  },
  "SWSP": {
    "2025-04": "C",
    "2025-05": "C",
    "2025-06": "B",
    "2025-07": "B",
    "2025-08": "B",
    "2025-09": "C",
    "2025-10": "B",
    "2025-11": "B",
    "2025-12": "B",
    "2026-01": "C",
    "2026-02": "B",
    "2026-03": "B"
  },
  "SWSR": {
    "2025-04": "A",
    "2025-05": "A",
    "2025-06": "A",
    "2025-07": "A",
    "2025-08": "C",
    "2025-09": "B",
    "2025-10": "C",
    "2025-11": "C",
    "2025-12": "C",
    "2026-01": "B",
    "2026-02": "B",
    "2026-03": "B"
  },
  "SWVG": {
    "2025-04": "B",
    "2025-05": "A",
    "2025-06": "A",
    "2025-07": "A",
    "2025-08": "B",
    "2025-09": "B",
    "2025-10": "D",
    "2025-11": "D",
    "2025-12": "D",
    "2026-01": "C",
    "2026-02": "C",
    "2026-03": "C"
  },
  "TYTR": {
    "2025-04": "B",
    "2025-05": "B",
    "2025-06": "A",
    "2025-07": "B",
    "2025-08": "A",
    "2025-09": "B",
    "2025-10": "A",
    "2025-11": "B",
    "2025-12": "C",
    "2026-01": "C",
    "2026-02": "C",
    "2026-03": "C"
  },
  "LCVY": {
    "2025-04": "A",
    "2025-05": "B",
    "2025-06": "A",
    "2025-07": "A",
    "2025-08": "A",
    "2025-09": "A",
    "2025-10": "A",
    "2025-11": "B",
    "2025-12": "B",
    "2026-01": "A",
    "2026-02": "B",
    "2026-03": "A"
  },
  "NBVY": {
    "2025-04": "B",
    "2025-05": "A",
    "2025-06": "A",
    "2025-07": "A",
    "2025-08": "C",
    "2025-09": "C",
    "2025-10": "C",
    "2025-11": "C",
    "2025-12": "B",
    "2026-01": "B",
    "2026-02": "A",
    "2026-03": "A"
  },
  "ICVY": {
    "2025-04": "A",
    "2025-05": "A",
    "2025-06": "B",
    "2025-07": "B",
    "2025-08": "A",
    "2025-09": "A",
    "2025-10": "A",
    "2025-11": "B",
    "2025-12": "B",
    "2026-01": "A",
    "2026-02": "B",
    "2026-03": "B"
  },
  "KYVY": {
    "2025-04": "A",
    "2025-05": "A",
    "2025-06": "A",
    "2025-07": "A",
    "2025-08": "A",
    "2025-09": "A",
    "2025-10": "A",
    "2025-11": "A",
    "2025-12": "A",
    "2026-01": "A",
    "2026-02": "A",
    "2026-03": "B"
  },
  "MEBG": {
    "2025-04": "A",
    "2025-05": "A",
    "2025-06": "A",
    "2025-07": "A",
    "2025-08": "A",
    "2025-09": "A",
    "2025-10": "A",
    "2025-11": "A",
    "2025-12": "A",
    "2026-01": "A",
    "2026-02": "A",
    "2026-03": "A"
  },
  "NGTR": {
    "2025-04": "E",
    "2025-05": "A",
    "2025-06": "A",
    "2025-07": "A",
    "2025-08": "A",
    "2025-09": "C",
    "2025-10": "A",
    "2025-11": "A",
    "2025-12": "A",
    "2026-01": "B",
    "2026-02": "C",
    "2026-03": "C"
  },
  "SDBG": {
    "2025-04": "A",
    "2025-05": "B",
    "2025-06": "A",
    "2025-07": "C",
    "2025-08": "E",
    "2025-09": "A",
    "2025-10": "A",
    "2025-11": "A",
    "2025-12": "A",
    "2026-01": "A",
    "2026-02": "B",
    "2026-03": "A"
  },
  "SWBT": {
    "2025-04": "A",
    "2025-05": "A",
    "2025-06": "A",
    "2025-07": "C",
    "2025-08": "B",
    "2025-09": "B",
    "2025-10": "A",
    "2025-11": "A",
    "2025-12": "C",
    "2026-01": "A",
    "2026-02": "B",
    "2026-03": "D"
  },
  "SWCG": {
    "2025-04": "A",
    "2025-05": "A",
    "2025-06": "A",
    "2025-07": "B",
    "2025-08": "A",
    "2025-09": "A",
    "2025-10": "A",
    "2025-11": "B",
    "2025-12": "C",
    "2026-01": "E",
    "2026-02": "A",
    "2026-03": "A"
  },
  "SWXM": {
    "2025-04": "B",
    "2025-05": "B",
    "2025-06": "B",
    "2025-07": "A",
    "2025-08": "A",
    "2025-09": "A",
    "2025-10": "A",
    "2025-11": "A",
    "2025-12": "A",
    "2026-01": "A",
    "2026-02": "A",
    "2026-03": "A"
  },
  "USVY": {
    "2025-04": "A",
    "2025-05": "A",
    "2025-06": "A",
    "2025-07": "A",
    "2025-08": "A",
    "2025-09": "A",
    "2025-10": "A",
    "2025-11": "A",
    "2025-12": "A",
    "2026-01": "A",
    "2026-02": "A",
    "2026-03": "A"
  },
  "YSVY": {
    "2025-04": "A",
    "2025-05": "A",
    "2025-06": "A",
    "2025-07": "B",
    "2025-08": "B",
    "2025-09": "A",
    "2025-10": "A",
    "2025-11": "A",
    "2025-12": "A",
    "2026-01": "A",
    "2026-02": "A",
    "2026-03": "A"
  },
  "YTTR": {
    "2025-04": "A",
    "2025-05": "A",
    "2025-06": "A",
    "2025-07": "A",
    "2025-08": "A",
    "2025-09": "A",
    "2025-10": "E",
    "2025-11": "A",
    "2025-12": "A",
    "2026-01": "B",
    "2026-02": "A",
    "2026-03": "A"
  },
  "MBBG": {
    "2025-04": "A",
    "2025-05": "A",
    "2025-06": "A",
    "2025-07": "A",
    "2025-08": "A",
    "2025-09": "A",
    "2025-10": "A",
    "2025-11": "A",
    "2025-12": "A",
    "2026-01": "A",
    "2026-02": "A",
    "2026-03": "A"
  },
  "QDVY": {
    "2025-04": "C",
    "2025-05": "A",
    "2025-06": "A",
    "2025-07": "A",
    "2025-08": "A",
    "2025-09": "A",
    "2025-10": "A",
    "2025-11": "A",
    "2025-12": "B",
    "2026-01": "A",
    "2026-02": "C",
    "2026-03": "A"
  },
  "TJVY": {
    "2025-04": "B",
    "2025-05": "A",
    "2025-06": "A",
    "2025-07": "B",
    "2025-08": "A",
    "2025-09": "A",
    "2025-10": "A",
    "2025-11": "A",
    "2025-12": "A",
    "2026-01": "B",
    "2026-02": "A",
    "2026-03": "A"
  }
};

const state = {
  exportRows: [],
  exportMap: new Map(),
  reportRows: [],
  gradeCounts: { A: 0, B: 0, C: 0, D: 0, E: 0, X: 0 },
  periods: [],
  workbookName: "",
};

const gradeOrder = { E: 1, D: 2, C: 3, B: 4, A: 5, X: 6 };
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
searchInput.addEventListener("input", () => renderGradeSheet(filterRows(searchInput.value)));
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

    const rows = XLSX.utils.sheet_to_json(worksheet, {
      header: 1,
      defval: "",
      raw: false,
    });

    state.workbookName = file.name;
    state.exportRows = rows;
    state.exportMap = parseExportRows(rows);
    state.periods = getRecent12Periods(document.getElementById("reportMonth").value);
    state.reportRows = buildReportRows();
    state.gradeCounts = countGrades(state.reportRows);

    renderValidation();
    renderDashboard();
    renderGradeChart();
    renderGradeSheet(state.reportRows);
    renderSummary();

    fileStatus.textContent = `등급표 생성 완료: ${file.name}`;
  } catch (error) {
    console.error(error);
    alert("파일 분석 중 오류가 발생했습니다. EXPORT 파일 양식이 맞는지 확인해 주세요.");
    fileStatus.textContent = "분석 실패";
  }
}

function parseExportRows(rows) {
  const headerRowIndex = detectHeaderRow(rows);
  const header = rows[headerRowIndex].map((cell) => String(cell).trim());
  const dataRows = rows.slice(headerRowIndex + 1);
  const index = buildColumnIndex(header);
  const result = new Map();

  dataRows.forEach((row) => {
    const code = String(getCell(row, index.Code)).trim().toUpperCase();
    if (!code) return;

    const monthly = {};
    monthLabels.forEach((month) => {
      monthly[month] = cleanGrade(getCell(row, index[`month_${month}`]));
    });

    result.set(code, {
      code,
      name: getCell(row, index.Name),
      grade: cleanGrade(getCell(row, index.Grade)),
      monthly,
      rating: toNumber(getCell(row, index["Rating(%)"])),
      attainedCii: toNumber(getCell(row, index["Attained CII"])),
      requiredCii: toNumber(getCell(row, index["Required CII"])),
    });
  });

  return result;
}

function detectHeaderRow(rows) {
  const candidates = rows.slice(0, 10);
  for (let i = 0; i < candidates.length; i += 1) {
    const normalized = candidates[i].map((cell) => String(cell).trim());
    if (normalized.includes("Name") && normalized.includes("Code") && normalized.includes("Grade")) {
      return i;
    }
  }
  return 1;
}

function buildColumnIndex(header) {
  const index = {};

  header.forEach((name, colIndex) => {
    if (!name) return;

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

function buildReportRows() {
  const rows = VESSEL_MASTER.map((master) => {
    const code = String(master.code).trim().toUpperCase();
    const exportItem = state.exportMap.get(code);

    const monthly = {};
    state.periods.forEach((period) => {
      const key = period.key;
      const fromExport = getGradeFromExportPeriod(exportItem, period);
      const fromBaseline = BASELINE_HISTORY[code]?.[key] || "";
      monthly[key] = fromExport || fromBaseline || "";
    });

    const currentGrade =
      exportItem?.grade ||
      monthly[state.periods[state.periods.length - 1]?.key] ||
      "X";

    return {
      code,
      owner: master.owner,
      manager: master.manager,
      vessel: exportItem?.name || code,
      grade: currentGrade,
      monthly,
      matched: Boolean(exportItem),
      rating: exportItem?.rating ?? null,
      attainedCii: exportItem?.attainedCii ?? null,
      requiredCii: exportItem?.requiredCii ?? null,
    };
  });

  return rows.sort(compareReportRows);
}

function getGradeFromExportPeriod(exportItem, period) {
  if (!exportItem) return "";

  // EXPORT 파일의 1~12 컬럼은 선택한 보고연도 기준 월별 등급으로 간주합니다.
  const selectedYear = Number(document.getElementById("reportMonth").value.slice(0, 4));
  if (period.year === selectedYear) {
    return exportItem.monthly[String(period.month)] || "";
  }

  return "";
}

function compareReportRows(a, b) {
  return (
    (gradeOrder[a.grade] || gradeOrder.X) - (gradeOrder[b.grade] || gradeOrder.X) ||
    compareMixedText(a.owner, b.owner) ||
    compareMixedText(a.manager, b.manager) ||
    String(a.code).localeCompare(String(b.code), "en")
  );
}

function compareMixedText(a, b) {
  const aa = String(a || "");
  const bb = String(b || "");
  const ak = hasKorean(aa);
  const bk = hasKorean(bb);

  if (ak !== bk) return ak ? 1 : -1;
  return aa.localeCompare(bb, ak ? "ko" : "en", { sensitivity: "base" });
}

function hasKorean(value) {
  return /[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(value);
}

function getRecent12Periods(monthValue) {
  const [year, month] = monthValue.split("-").map(Number);
  const periods = [];

  for (let offset = 11; offset >= 0; offset -= 1) {
    const date = new Date(year, month - 1 - offset, 1);
    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    periods.push({
      year: y,
      month: m,
      key: `${y}-${String(m).padStart(2, "0")}`,
      label: `${m}월`,
    });
  }

  return periods;
}

function countGrades(rows) {
  const counts = { A: 0, B: 0, C: 0, D: 0, E: 0, X: 0 };
  rows.forEach((row) => {
    const grade = ["A", "B", "C", "D", "E"].includes(row.grade) ? row.grade : "X";
    counts[grade] += 1;
  });
  return counts;
}

function renderValidation() {
  const target = VESSEL_MASTER.length;
  const matched = state.reportRows.filter((row) => row.matched).length;
  const missing = state.reportRows.filter((row) => !row.matched).map((row) => row.code);

  validationResult.innerHTML = `
    관리 대상 선박: <strong>${target}</strong>척<br>
    EXPORT 매칭 선박: <strong>${matched}</strong>척<br>
    미매칭 선박: <strong>${target - matched}</strong>척<br>
    ${missing.length ? `<span class="risk-high">미매칭: ${missing.slice(0, 8).join(", ")}${missing.length > 8 ? "..." : ""}</span>` : `<span class="risk-normal">전체 선박 매칭 정상</span>`}
  `;
}

function renderDashboard() {
  const matched = state.reportRows.filter((row) => row.matched).length;
  const deCount = (state.gradeCounts.D || 0) + (state.gradeCounts.E || 0);

  document.getElementById("kpiTarget").textContent = VESSEL_MASTER.length;
  document.getElementById("kpiMatched").textContent = matched;
  document.getElementById("kpiDE").textContent = deCount;
  document.getElementById("kpiE").textContent = state.gradeCounts.E || 0;
}

function renderGradeChart() {
  const container = document.getElementById("gradeChart");
  const grades = ["E", "D", "C", "B", "A"];
  const total = state.reportRows.filter((row) => ["A", "B", "C", "D", "E"].includes(row.grade)).length || 1;
  const max = Math.max(...grades.map((grade) => state.gradeCounts[grade] || 0), 1);

  container.classList.remove("empty");
  container.innerHTML = grades.map((grade) => {
    const count = state.gradeCounts[grade] || 0;
    const pct = Math.round((count / total) * 100);
    const width = Math.max((count / max) * 100, count > 0 ? 5 : 0);

    return `
      <div class="grade-row">
        <div class="grade-label"><span class="chip grade-${grade}">${grade}등급</span></div>
        <div class="grade-track">
          <div class="grade-bar grade-${grade}" style="width:${width}%"></div>
        </div>
        <div class="grade-count">${count}척 / ${pct}%</div>
      </div>
    `;
  }).join("");
}

function renderGradeSheet(rows) {
  renderGradeSheetHeader();

  const tbody = document.getElementById("gradeSheetBody");
  if (!rows.length) {
    tbody.innerHTML = `<tr><td colspan="${4 + state.periods.length}" class="empty-cell">표시할 선박이 없습니다.</td></tr>`;
    return;
  }

  const rowSpans = calculateRowSpans(rows);
  const totalValid = rows.filter((row) => ["A", "B", "C", "D", "E"].includes(row.grade)).length || 1;

  tbody.innerHTML = rows.map((row, idx) => {
    const cells = [];

    const gradeKey = row.grade;
    if (rowSpans.grade[idx]) {
      const count = state.gradeCounts[gradeKey] || 0;
      const pct = Math.round((count / totalValid) * 100);
      const label = gradeKey === "X"
        ? `미산출<br>${count}척`
        : `${gradeKey}등급<br>${count}척<br>${pct}%`;

      cells.push(`<td rowspan="${rowSpans.grade[idx]}" class="group-cell group-${gradeKey}">${label}</td>`);
    }

    if (rowSpans.owner[idx]) {
      cells.push(`<td rowspan="${rowSpans.owner[idx]}" class="owner-cell">${escapeHtml(row.owner)}</td>`);
    }

    if (rowSpans.manager[idx]) {
      cells.push(`<td rowspan="${rowSpans.manager[idx]}" class="manager-cell">${escapeHtml(row.manager)}</td>`);
    }

    cells.push(`<td class="vessel-cell">${escapeHtml(row.code)}</td>`);

    state.periods.forEach((period) => {
      const grade = row.monthly[period.key] || "";
      cells.push(`<td class="month-cell grade-${grade || "blank"}">${grade || ""}</td>`);
    });

    return `<tr>${cells.join("")}</tr>`;
  }).join("");
}

function renderGradeSheetHeader() {
  const thead = document.getElementById("gradeSheetHead");
  const yearGroups = [];

  state.periods.forEach((period) => {
    const last = yearGroups[yearGroups.length - 1];
    if (last && last.year === period.year) {
      last.count += 1;
    } else {
      yearGroups.push({ year: period.year, count: 1 });
    }
  });

  const yearCells = yearGroups
    .map((group) => `<th colspan="${group.count}" class="year-head">${group.year}년</th>`)
    .join("");

  const monthCells = state.periods
    .map((period) => `<th class="month-head">${period.label}</th>`)
    .join("");

  thead.innerHTML = `
    <tr>
      <th rowspan="2" class="static-head">누적등급<br>(${String(state.periods[state.periods.length - 1].year).slice(2)}년)</th>
      <th rowspan="2" class="static-head">OWNER</th>
      <th rowspan="2" class="static-head">관리사</th>
      <th rowspan="2" class="static-head">선박</th>
      ${yearCells}
    </tr>
    <tr>${monthCells}</tr>
  `;
}

function calculateRowSpans(rows) {
  const grade = {};
  const owner = {};
  const manager = {};

  for (let i = 0; i < rows.length; i += 1) {
    if (i === 0 || rows[i].grade !== rows[i - 1].grade) {
      grade[i] = countSameFrom(rows, i, (a, b) => a.grade === b.grade);
    }

    if (
      i === 0 ||
      rows[i].grade !== rows[i - 1].grade ||
      rows[i].owner !== rows[i - 1].owner
    ) {
      owner[i] = countSameFrom(rows, i, (a, b) => a.grade === b.grade && a.owner === b.owner);
    }

    if (
      i === 0 ||
      rows[i].grade !== rows[i - 1].grade ||
      rows[i].owner !== rows[i - 1].owner ||
      rows[i].manager !== rows[i - 1].manager
    ) {
      manager[i] = countSameFrom(rows, i, (a, b) =>
        a.grade === b.grade &&
        a.owner === b.owner &&
        a.manager === b.manager
      );
    }
  }

  return { grade, owner, manager };
}

function countSameFrom(rows, start, predicate) {
  let count = 1;
  for (let i = start + 1; i < rows.length; i += 1) {
    if (!predicate(rows[start], rows[i])) break;
    count += 1;
  }
  return count;
}

function renderSummary() {
  const reportMonth = document.getElementById("reportMonth").value;
  const monthText = reportMonth ? reportMonth.replace("-", "년 ") + "월" : "해당 월";
  const total = state.reportRows.filter((row) => ["A", "B", "C", "D", "E"].includes(row.grade)).length;
  const deCount = (state.gradeCounts.D || 0) + (state.gradeCounts.E || 0);
  const deRatio = total ? Math.round((deCount / total) * 100) : 0;

  const summary = [
    `${monthText} CII 관리 대상 ${VESSEL_MASTER.length}척 중 EXPORT 매칭 선박은 ${state.reportRows.filter((row) => row.matched).length}척입니다.`,
    `누적등급 기준 D/E 등급 선박은 ${deCount}척(${deRatio}%)이며, E등급 ${state.gradeCounts.E || 0}척, D등급 ${state.gradeCounts.D || 0}척입니다.`,
    `등급표는 누적등급 → OWNER → 관리사 → 선박 순으로 정렬되며, 최근 12개월은 ${state.periods[0].key}부터 ${state.periods[state.periods.length - 1].key}까지 표시됩니다.`,
    `본 결과는 업로드된 EXPORT 파일(${state.workbookName}) 기준으로 자동 산출되었습니다.`,
  ].join("\n");

  document.getElementById("summaryText").value = summary;
}

function filterRows(keyword) {
  const value = String(keyword || "").trim().toLowerCase();
  if (!value) return state.reportRows;

  return state.reportRows.filter((row) =>
    String(row.owner).toLowerCase().includes(value) ||
    String(row.manager).toLowerCase().includes(value) ||
    String(row.code).toLowerCase().includes(value) ||
    String(row.vessel).toLowerCase().includes(value)
  );
}

function downloadReport() {
  if (!state.reportRows.length) {
    alert("먼저 EXPORT 파일을 분석해 주세요.");
    return;
  }

  const wb = XLSX.utils.book_new();
  const reportMonth = document.getElementById("reportMonth").value || "monthly";

  const header = [
    "누적등급",
    "OWNER",
    "관리사",
    "선박",
    ...state.periods.map((period) => `${period.year}년 ${period.month}월`),
  ];

  const rows = state.reportRows.map((row) => [
    ["A", "B", "C", "D", "E"].includes(row.grade) ? `${row.grade}등급` : "미산출",
    row.owner,
    row.manager,
    row.code,
    ...state.periods.map((period) => row.monthly[period.key] || ""),
  ]);

  const ws = XLSX.utils.aoa_to_sheet([header, ...rows]);
  XLSX.utils.book_append_sheet(wb, ws, "CII_Grade_Sheet");

  const summaryRows = [
    ["CII Monthly Summary"],
    ["Source File", state.workbookName],
    ["Report Month", reportMonth],
    ["Target Vessels", VESSEL_MASTER.length],
    ["Matched Vessels", state.reportRows.filter((row) => row.matched).length],
    ["A", state.gradeCounts.A || 0],
    ["B", state.gradeCounts.B || 0],
    ["C", state.gradeCounts.C || 0],
    ["D", state.gradeCounts.D || 0],
    ["E", state.gradeCounts.E || 0],
    ["미산출", state.gradeCounts.X || 0],
    [],
    ["Auto Summary"],
    [document.getElementById("summaryText").value],
  ];
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(summaryRows), "Summary");

  XLSX.writeFile(wb, `${reportMonth}_CII_Grade_Sheet.xlsx`);
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

function cleanGrade(value) {
  const grade = String(value || "").trim().toUpperCase();
  return ["A", "B", "C", "D", "E"].includes(grade) ? grade : "";
}

function getCell(row, idx) {
  if (idx === undefined || idx === null) return "";
  return row[idx] ?? "";
}

function toNumber(value) {
  if (value === null || value === undefined || value === "") return null;
  const num = Number(String(value).replace(/,/g, "").replace("%", ""));
  return Number.isFinite(num) ? num : null;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
