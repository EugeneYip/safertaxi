import React, { useMemo, useState } from "react";

const ICONS = {
  taxi: ["M7 14l1.2-4h7.6l1.2 4", "M5 14h14", "M6 18h2", "M16 18h2", "M8 10l1.1-3h5.8L16 10", "M7 18H6a2 2 0 0 1-2-2v-2l2-2h12l2 2v2a2 2 0 0 1-2 2h-1", "M8.2 15.2h.01", "M15.8 15.2h.01"],
  shield: ["M12 2 4.5 5.5v6c0 5 3.1 8.9 7.5 10.4 4.4-1.5 7.5-5.4 7.5-10.4v-6L12 2Z"],
  map: ["M4 6.5 9.5 4l5 2 5.5-2v13.5l-5.5 2-5-2-5.5 2V6.5Z", "M9.5 4v13.5", "M14.5 6v13.5"],
  users: ["M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z", "M17 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z", "M2.5 20a5.8 5.8 0 0 1 11 0", "M13 20a4.7 4.7 0 0 1 8.5 0"],
  phone: ["M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z", "M11 18h2"],
  chart: ["M4 19h16", "M7 16v-4", "M12 16V7", "M17 16v-7"],
  building: ["M4 21V5.5L12 2l8 3.5V21", "M9 21v-4h6v4", "M8 8h.01", "M12 8h.01", "M16 8h.01", "M8 12h.01", "M12 12h.01", "M16 12h.01"],
  briefcase: ["M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2", "M4 8h16a1 1 0 0 1 1 1v8a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V9a1 1 0 0 1 1-1Z", "M10 12h4"],
  ticket: ["M4 9a2 2 0 0 0 0 4v2a2 2 0 0 1 0 4h16a2 2 0 0 1 0-4v-2a2 2 0 0 0 0-4H4Z", "M12 7v10"],
  dollar: ["M12 2v20", "M16.5 6.5c0-1.9-2-3.5-4.5-3.5S7.5 4.4 7.5 6.2c0 5 9 2 9 7.6 0 1.9-2 3.2-4.5 3.2s-4.5-1.6-4.5-3.8"],
  target: ["M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z", "M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z", "M12 10.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z"],
  translate: ["M4 6h10", "M9 4v2c0 4.1-1.7 7.7-5 10.3", "M6 11c1 1.4 2.8 2.7 5.3 3.8", "M16 7h4", "M18 7v10", "M14.5 15h7", "M15.5 19l3-8 3 8"],
  layers: ["M12 3 3 7.5 12 12l9-4.5L12 3Z", "M3 12l9 4.5 9-4.5", "M3 16.5 12 21l9-4.5"],
  arrows: ["M4 8h10", "M11 5l3 3-3 3", "M20 16H10", "M13 13l-3 3 3 3"],
  check: ["M5 13l4 4L19 7"],
  spark: ["M12 3l1.4 4.6L18 9l-4.6 1.4L12 15l-1.4-4.6L6 9l4.6-1.4L12 3Z"],
};

const cityData = [
  { en: "Buenos Aires", zh: "布宜諾斯艾利斯", pop: 12801000, income: 10959, phone: 10, taxis: 37860, fare: 8, radio: 30, safer: 9, noteEn: "Big taxi base, weaker phone adoption.", noteZh: "車量大，但手機滲透較弱。" },
  { en: "Santiago", zh: "聖地牙哥", pop: 6027000, income: 15415, phone: 19, taxis: 22107, fare: 6, radio: 20, safer: 6, noteEn: "Best phone adoption and strongest beachhead logic.", noteZh: "手機滲透最佳，灘頭堡邏輯最強。" },
  { en: "Sao Paulo", zh: "聖保羅", pop: 11320000, income: 12340, phone: 9, taxis: 32000, fare: 12.5, radio: 30, safer: 12, noteEn: "Higher revenue per ride, heavier execution burden.", noteZh: "單趟收入較高，但執行壓力更重。" },
];

const facts = [
  {
    tag: "fact",
    icon: "layers",
    titleEn: "Case foundation",
    titleZh: "案例基礎",
    en: [
      "SaferTaxi operated in Buenos Aires, Santiago, and Sao Paulo. By October 2012 it had 18 employees and was running on what remained of an initial US$1 million venture round.",
      "The market was shaped by safety anxiety, fragmented supply, and RadioTaxi dispatch systems that were costly yet still slow.",
      "The founders first imagined a text-message solution, then pivoted toward mobile taxi hailing after the early logic of Uber-like models became visible.",
    ],
    zh: [
      "SaferTaxi 當時營運於布宜諾斯艾利斯、聖地牙哥與聖保羅。到 2012 年 10 月，公司有 18 名員工，早期 100 萬美元資金也所剩不多。",
      "它面對的是一個同時有安全焦慮、供給分散，以及 RadioTaxi 調度昂貴但仍然緩慢的市場。",
      "創辦團隊最早先想到的是簡訊式方案，之後看到類 Uber 模式的可行性後，再轉向手機叫車。",
    ],
  },
  {
    tag: "fact",
    icon: "shield",
    titleEn: "What the product actually offered",
    titleZh: "產品實際提供了甚麼",
    en: [
      "Passengers could see nearby taxis, driver photos, ETA, and prior reviews, then hail and pay.",
      "Safety and trust were built through ratings, traceability, ride records, and an emergency button.",
      "The case also mentions details many summaries skip: emergency location sharing, free Wi-Fi hotspots through driver phones, and a loyalty program tied to future free rides.",
    ],
    zh: [
      "乘客可看到附近車輛、司機照片、預計到達時間與過往評價，之後完成叫車與付款。",
      "安全與信任則由評價、可追蹤性、乘車紀錄與緊急按鈕支撐。",
      "案例還提到一些常被忽略的細節，例如緊急位置分享、司機手機可作為免費 Wi-Fi 熱點，以及可兌換未來乘車的忠誠方案。",
    ],
  },
  {
    tag: "fact",
    icon: "phone",
    titleEn: "Mobilization economics were heavy",
    titleZh: "動員成本其實很重",
    en: [
      "Driver recruitment required field work, small-group training, and support. Training took about 30 minutes per driver.",
      "In Sao Paulo, a driver could get a phone and data plan for US$20 per month versus about US$100 at market prices.",
      "By October 2012 SaferTaxi had about 250 app-equipped drivers in each city, plus waitlists in Brazil, Argentina, and Chile.",
    ],
    zh: [
      "司機招募需要現場開發、小組訓練與後續支援。每位司機平均約需 30 分鐘訓練。",
      "在聖保羅，司機可以用每月 20 美元取得手機與數據方案，市價約是 100 美元。",
      "到 2012 年 10 月，SaferTaxi 在每座城市約有 250 位已裝 app 的司機，另外在巴西、阿根廷與智利還有候補名單。",
    ],
  },
];

const logic = [
  {
    tag: "inference",
    icon: "target",
    titleEn: "This is a takeoff problem",
    titleZh: "這是 takeoff problem",
    en: [
      "The cleanest course framing is platform takeoff, not generic startup growth.",
      "The real bottleneck is activated local liquidity. Signups alone do not create a functioning market.",
      "The right riders and the right drivers need to be active in the same place at the same time.",
    ],
    zh: [
      "最乾淨的課程 framing 是 platform takeoff，而不是一般的 startup growth。",
      "真正瓶頸是 activated local liquidity。單純註冊並不會自動形成有效市場。",
      "對的乘客與對的司機，必須在同一時間、同一地點同時活躍。",
    ],
  },
  {
    tag: "inference",
    icon: "shield",
    titleEn: "Safety behaves more like a stand-alone benefit",
    titleZh: "安全更像 stand-alone benefit",
    en: [
      "Wait time and liquidity depend on enough active supply and demand.",
      "Safety is different. Ratings, ride history, emergency tools, and traceability create value from the first trip.",
      "That is why safety should remain the core positioning axis.",
    ],
    zh: [
      "等待時間與流動性仰賴足夠活躍的供需。",
      "安全不同。評價、乘車紀錄、緊急工具與可追蹤性，從第一趟乘車就能帶來價值。",
      "因此安全應持續作為核心定位軸。",
    ],
  },
  {
    tag: "inference",
    icon: "building",
    titleEn: "The operating model was already under strain",
    titleZh: "operating model 已經吃緊",
    en: [
      "Driver onboarding, support, consumer marketing, corporate selling, and event execution all pulled on the same tiny resource pool.",
      "The case does not show a company with too little imagination. It shows a company trying too many reasonable things at once.",
    ],
    zh: [
      "司機上線、支援、消費者行銷、企業銷售與活動執行，全都在拉扯同一個很小的資源池。",
      "案例呈現的不是想像力不足，而是同時做太多合理事情。",
    ],
  },
];

const channels = [
  { nameEn: "Mass consumer acquisition", nameZh: "大眾消費者拉新", icon: "users", aEn: "Diffuse demand", aZh: "需求分散", bEn: "Useful for awareness, weak as a first wedge.", bZh: "有助知名度，但不是最強的第一楔子。" },
  { nameEn: "Corporate accounts", nameZh: "企業帳戶", icon: "briefcase", aEn: "Concentrated recurring demand", aZh: "集中且重複的需求", bEn: "Strong wedge because 60% of rides were business-related and reimbursement fraud mattered.", bZh: "很強的楔子，因為約 60% 乘車與商務有關，且報帳舞弊確實存在。" },
  { nameEn: "Event partnerships", nameZh: "活動合作", icon: "ticket", aEn: "Dense short-window demand", aZh: "短時間高密度需求", bEn: "Powerful demo wedge, but operational failure becomes highly visible.", bZh: "示範效果強，但失敗也會非常顯眼。" },
  { nameEn: "RadioTaxi partnerships", nameZh: "RadioTaxi 合作", icon: "building", aEn: "Looks attractive on paper", aZh: "紙面上很誘人", bEn: "B.A. Taxi showed deep incentive misalignment. Do not make this the core scaling path.", bZh: "B.A. Taxi 顯示誘因深度錯位，不宜再作為核心擴張路徑。" },
];

const decisions = [
  {
    tag: "judgment",
    icon: "map",
    titleEn: "Strategic narrowing is the cleanest recommendation",
    titleZh: "策略收斂是最乾淨的建議",
    en: [
      "SaferTaxi was spread across three countries while also testing consumer, corporate, and event channels.",
      "The best move is to stop optimizing for breadth and instead build one credible takeoff loop.",
      "Santiago is the strongest lead answer because smartphone penetration, wait times, safety context, and the event wedge line up more cleanly there.",
      "A careful Sao Paulo answer can still be defensible, but only if it openly addresses the heavier execution burden.",
    ],
    zh: [
      "SaferTaxi 當時同時跨三個國家，也同時測消費者、企業與活動三條路。",
      "最佳動作是停止追求 breadth，改為建立單一可信的 takeoff loop。",
      "聖地牙哥是最強主答案，因為手機滲透、等待時間、安全情境與活動楔子都更整齊地對上。",
      "聖保羅答案仍可辯護，但必須公開承認更重的執行負擔。",
    ],
  },
  {
    tag: "judgment",
    icon: "dollar",
    titleEn: "Capital should follow coherence",
    titleZh: "資金應該跟著 coherence 走",
    en: [
      "The strongest pro-investment argument is existential: better funded rivals were moving faster and local density may require cash.",
      "The strongest anti-investment argument is that money alone does not fix weak focus or overloaded execution.",
      "The most defensible answer is conditional acceptance. Take outside capital only after narrowing the strategy.",
    ],
    zh: [
      "支持融資最強的論點是生存面，因為更有錢的競爭者正在更快前進，而在地密度確實可能需要資本。",
      "反對融資最強的論點則是，資金本身無法修正聚焦不足與執行過載。",
      "最可防守的答案是條件式接受，先把策略收斂，再談是否接受外部資金。",
    ],
  },
];

const answer = {
  en: "SaferTaxi should stop trying to grow broadly, concentrate on creating activated local liquidity in one beachhead market, use corporate accounts and or events as more concentrated demand wedges than mass consumer marketing, avoid relying on RadioTaxi as the core scaling channel, keep safety as its sharpest differentiator, and accept outside capital only if that capital supports a narrowed takeoff strategy rather than broader drift.",
  zh: "SaferTaxi 不應再廣泛式擴張，而應先在單一灘頭堡市場做出 activated local liquidity，把企業帳戶與或活動合作當成比分散式消費者拉新更集中的需求楔子，不再把 RadioTaxi 當作核心擴張管道，持續以安全作為最尖銳的差異化，並且只有在外部資金能支撐已收斂的起飛策略時才接受投資。",
};

function Icon({ name, className = "" }) {
  const paths = ICONS[name] || ICONS.taxi;
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {paths.map((d, i) => <path key={i} d={d} />)}
    </svg>
  );
}

function Copy({ mode, en, zh, className = "", zhClass = "text-slate-500" }) {
  if (mode === "zh") return <div className={className}>{zh}</div>;
  if (mode === "both") return <div className={`space-y-1.5 ${className}`}><div>{en}</div><div className={zhClass}>{zh}</div></div>;
  return <div className={className}>{en}</div>;
}

function Tag({ tag }) {
  const map = {
    fact: "bg-[#E8F0F3] border-[#B8CBD4] text-[#21495A]",
    inference: "bg-[#F3EAF0] border-[#D8BDCF] text-[#5B2B4E]",
    judgment: "bg-[#F6EEE3] border-[#E2CCAB] text-[#7A4B18]",
  };
  const label = tag === "fact" ? "CASE FACT" : tag === "inference" ? "COURSE INFERENCE" : "STRATEGIC JUDGMENT";
  return <span className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold tracking-[0.14em] ${map[tag]}`}>{label}</span>;
}

function SectionHeader({ mode, eyebrowEn, eyebrowZh, titleEn, titleZh }) {
  return (
    <div className="flex items-start gap-3 sm:gap-4">
      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-[#EFE6D7] text-[#2E5C6E] sm:h-10 sm:w-10">
        <Icon name="layers" className="h-4 w-4 sm:h-5 sm:w-5" />
      </div>
      <div className="min-w-0">
        <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8B7F6B] sm:text-[11px]">
          <Copy mode={mode} en={eyebrowEn} zh={eyebrowZh} />
        </div>
        <h2 className="mt-1 text-[1.45rem] font-semibold leading-tight text-slate-900 sm:text-[1.8rem]" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
          <Copy mode={mode} en={titleEn} zh={titleZh} />
        </h2>
      </div>
    </div>
  );
}

function Card({ block, mode, filter }) {
  if (filter !== "all" && filter !== block.tag) return null;
  return (
    <article className="rounded-[22px] border border-[#D8CFBC] bg-white/84 p-4 shadow-sm sm:p-5">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-[#F3EDE1] text-[#2E5C6E] sm:h-10 sm:w-10">
            <Icon name={block.icon} className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
          <h3 className="min-w-0 text-[1.02rem] font-semibold leading-snug text-slate-900 sm:text-[1.08rem]" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
            <Copy mode={mode} en={block.titleEn} zh={block.titleZh} />
          </h3>
        </div>
        <div className="hidden sm:block">
          <Tag tag={block.tag} />
        </div>
      </div>
      <div className="mb-3 sm:hidden">
        <Tag tag={block.tag} />
      </div>
      <Copy
        mode={mode}
        en={<ul className="space-y-2.5 text-[14px] leading-6 text-slate-700 sm:text-[14.5px] sm:leading-6.5">{block.en.map((item) => <li key={item} className="flex gap-2.5"><Icon name="check" className="mt-[3px] h-4 w-4 shrink-0 text-[#2E5C6E]" /><span>{item}</span></li>)}</ul>}
        zh={<ul className="space-y-2.5 text-[14px] leading-6 text-slate-600 sm:text-[14.5px] sm:leading-6.5">{block.zh.map((item) => <li key={item} className="flex gap-2.5"><Icon name="check" className="mt-[3px] h-4 w-4 shrink-0 text-[#2E5C6E]" /><span>{item}</span></li>)}</ul>}
      />
    </article>
  );
}

function CityCompare({ mode }) {
  const maxTaxi = Math.max(...cityData.map((c) => c.taxis));
  const maxPop = Math.max(...cityData.map((c) => c.pop));
  const maxIncome = Math.max(...cityData.map((c) => c.income));
  const maxWait = Math.max(...cityData.map((c) => c.radio));
  const fmt = (v) => new Intl.NumberFormat("en-US").format(v);

  return (
    <div className="grid gap-4 xl:grid-cols-3">
      {cityData.map((city) => (
        <div key={city.en} className="rounded-[22px] border border-[#D8CFBC] bg-[#FBF8F1] p-4 shadow-sm sm:p-5">
          <div className="mb-3 flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="text-[1.1rem] font-semibold leading-snug text-slate-900 sm:text-[1.18rem]" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
                <Copy mode={mode} en={city.en} zh={city.zh} />
              </h3>
              <Copy mode={mode} en={<p className="mt-1 text-[13px] leading-5 text-slate-600">{city.noteEn}</p>} zh={<p className="mt-1 text-[13px] leading-5 text-slate-500">{city.noteZh}</p>} />
            </div>
            <div className="rounded-2xl bg-white px-3 py-2 text-right">
              <div className="text-[10px] uppercase tracking-[0.16em] text-[#8B7F6B]">Phone</div>
              <div className="text-base font-semibold text-[#2E5C6E]">{city.phone}%</div>
            </div>
          </div>

          {[
            ["Population", "人口", city.pop, maxPop, fmt(city.pop)],
            ["Per-capita income", "人均收入", city.income, maxIncome, `$${fmt(city.income)}`],
            ["Number of taxis", "計程車數量", city.taxis, maxTaxi, fmt(city.taxis)],
          ].map(([en, zh, val, max, display]) => (
            <div key={en} className="mb-2.5 space-y-1.5">
              <div className="flex items-center justify-between gap-3 text-[13px] sm:text-[13.5px]">
                <Copy mode={mode} en={<span className="text-slate-600">{en}</span>} zh={<span className="text-slate-500">{zh}</span>} />
                <span className="shrink-0 font-medium text-slate-800">{display}</span>
              </div>
              <div className="h-2 rounded-full bg-[#E9E1D0]">
                <div className="h-full rounded-full bg-[#2E5C6E]" style={{ width: `${(val / max) * 100}%` }} />
              </div>
            </div>
          ))}

          <div className="mt-4 grid gap-3 rounded-[18px] bg-white p-3.5 sm:grid-cols-2">
            <div>
              <Copy mode={mode} en={<div className="text-[10px] uppercase tracking-[0.16em] text-[#8B7F6B]">Average fare</div>} zh={<div className="text-[10px] uppercase tracking-[0.16em] text-[#8B7F6B]">平均車資</div>} />
              <div className="mt-1 text-base font-semibold">US${city.fare.toFixed(2)}</div>
            </div>
            <div className="space-y-2">
              <Copy mode={mode} en={<div className="text-[10px] uppercase tracking-[0.16em] text-[#8B7F6B]">Average wait</div>} zh={<div className="text-[10px] uppercase tracking-[0.16em] text-[#8B7F6B]">平均等待</div>} />
              {[["RadioTaxi", city.radio, "#CBB89A"], ["SaferTaxi", city.safer, "#622954"]].map(([label, val, color]) => (
                <div key={label} className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-slate-600">
                    <span>{label}</span>
                    <span>{val} min</span>
                  </div>
                  <div className="h-2 rounded-full bg-[#E9E1D0]">
                    <div className="h-full rounded-full" style={{ width: `${(val / maxWait) * 100}%`, backgroundColor: color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function GrowthSketch({ mode }) {
  const series = {
    bookings: [10, 20, 32, 48, 64, 81, 100],
    users: [8, 16, 24, 44, 62, 78, 96],
    drivers: [4, 8, 11, 15, 17, 19, 21],
  };
  const labels = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"];
  const w = 620;
  const h = 210;
  const p = 26;
  const points = (vals) => vals.map((v, i) => `${p + (i * (w - p * 2)) / (vals.length - 1)},${h - p - (v / 100) * (h - p * 2)}`).join(" ");

  return (
    <div className="rounded-[22px] border border-[#D8CFBC] bg-[#FBF8F1] p-4 shadow-sm sm:p-5">
      <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
        <div className="max-w-2xl">
          <h3 className="text-[1.02rem] font-semibold text-slate-900 sm:text-[1.08rem]" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
            <Copy mode={mode} en="Directional sketch of Exhibit 3" zh="Exhibit 3 的方向性草圖" />
          </h3>
          <Copy mode={mode} en={<p className="mt-1 text-[13px] leading-5 text-slate-600">Bookings and user signups rose much faster than driver signups. That is why local liquidity stayed fragile.</p>} zh={<p className="mt-1 text-[13px] leading-5 text-slate-500">預約量與用戶註冊成長明顯快於司機註冊，這就是在地流動性仍然脆弱的原因。</p>} />
        </div>
        <div className="flex flex-wrap gap-1.5 text-[11px]">
          {[["Bookings", "#2E5C6E"], ["User signups", "#622954"], ["Driver signups", "#C18B3B"]].map(([label, color]) => (
            <div key={label} className="inline-flex items-center gap-2 rounded-full border border-[#D8CFBC] bg-white px-2.5 py-1">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
              {label}
            </div>
          ))}
        </div>
      </div>
      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${w} ${h}`} className="min-w-[560px] w-full">
          {[0, 25, 50, 75, 100].map((tick) => {
            const y = h - p - (tick / 100) * (h - p * 2);
            return (
              <g key={tick}>
                <line x1={p} x2={w - p} y1={y} y2={y} stroke="#DDD3C2" strokeDasharray="5 5" />
                <text x={8} y={y + 4} fontSize="10.5" fill="#6B7280">{tick}</text>
              </g>
            );
          })}
          {labels.map((label, i) => {
            const x = p + (i * (w - p * 2)) / (labels.length - 1);
            return <text key={label} x={x} y={h - 7} textAnchor="middle" fontSize="10.5" fill="#6B7280">{label}</text>;
          })}
          <polyline points={points(series.bookings)} fill="none" stroke="#2E5C6E" strokeWidth="3.5" strokeLinecap="round" />
          <polyline points={points(series.users)} fill="none" stroke="#622954" strokeWidth="3.5" strokeLinecap="round" />
          <polyline points={points(series.drivers)} fill="none" stroke="#C18B3B" strokeWidth="3.5" strokeLinecap="round" strokeDasharray="7 6" />
        </svg>
      </div>
    </div>
  );
}

function ChannelCardsMobile({ mode }) {
  return (
    <div className="grid gap-3 md:hidden">
      {channels.map((row) => (
        <div key={row.nameEn} className="rounded-[18px] border border-[#D8CFBC] bg-white p-4 shadow-sm">
          <div className="mb-2 flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#F3EDE1] text-[#2E5C6E]">
              <Icon name={row.icon} className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <div className="font-semibold leading-snug text-slate-900">
                <Copy mode={mode} en={row.nameEn} zh={row.nameZh} />
              </div>
              <Copy mode={mode} en={<div className="mt-1 text-[12.5px] text-[#8B7F6B]">{row.aEn}</div>} zh={<div className="mt-1 text-[12.5px] text-[#8B7F6B]">{row.aZh}</div>} />
            </div>
          </div>
          <Copy mode={mode} en={<p className="text-[13.5px] leading-5.5 text-slate-600">{row.bEn}</p>} zh={<p className="text-[13.5px] leading-5.5 text-slate-500">{row.bZh}</p>} />
        </div>
      ))}
    </div>
  );
}

function LanguageDock({ mode, setMode, open, setOpen }) {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2 sm:bottom-5 sm:right-5">
      {open && (
        <div className="rounded-[18px] border border-[#D8CFBC] bg-white/96 p-2 shadow-xl">
          <div className="flex flex-col gap-1.5">
            {[["en", "EN"], ["zh", "中"], ["both", "雙"]].map(([key, label]) => (
              <button
                key={key}
                onClick={() => {
                  setMode(key);
                  setOpen(false);
                }}
                className={`rounded-2xl px-3 py-2 text-sm font-semibold ${mode === key ? "bg-[#2E5C6E] text-white" : "bg-[#F6F1E6] text-slate-700"}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
      <button onClick={() => setOpen((v) => !v)} className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D8CFBC] bg-white/94 text-[#2E5C6E] shadow-xl sm:h-12 sm:w-12">
        <Icon name="translate" className="h-5 w-5" />
      </button>
    </div>
  );
}

export default function SaferTaxiVisualInfrastructure() {
  const [mode, setMode] = useState("en");
  const [filter, setFilter] = useState("all");
  const [dock, setDock] = useState(false);

  const visibleFacts = useMemo(() => facts.filter((b) => filter === "all" || filter === b.tag), [filter]);
  const visibleLogic = useMemo(() => logic.filter((b) => filter === "all" || filter === b.tag), [filter]);
  const visibleDecisions = useMemo(() => decisions.filter((b) => filter === "all" || filter === b.tag), [filter]);

  return (
    <div className="min-h-screen bg-[#FCFAF2] text-slate-900 antialiased">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[280px] bg-[radial-gradient(circle_at_top_left,rgba(46,92,110,0.14),transparent_46%),radial-gradient(circle_at_top_right,rgba(98,41,84,0.10),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.72),rgba(252,250,242,0))]" />

      <header className="sticky top-0 z-30 border-b border-[#DDD3C2] bg-[#FCFAF2]/92 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[#EFE6D7] text-[#2E5C6E] sm:h-10 sm:w-10">
              <Icon name="taxi" className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div className="min-w-0">
              <div className="truncate text-[11px] font-semibold tracking-[0.16em] text-[#8B7F6B] sm:text-xs">INNO6230 PLATFORM INNOVATION</div>
              <div className="truncate text-sm text-slate-800">SaferTaxi</div>
            </div>
          </div>

          <nav className="hidden min-w-0 flex-1 overflow-x-auto lg:block">
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              {[["#facts", "Case base", "案例基礎"], ["#logic", "Platform logic", "平臺邏輯"], ["#channels", "Channels", "通路選擇"], ["#decision", "Decision", "策略決策"], ["#answer", "Core answer", "核心答案"]].map(([href, en, zh]) => (
                <a key={href} href={href} className="rounded-full px-3 py-1.5 text-sm text-slate-600 transition hover:bg-white hover:text-slate-900">
                  {mode === "zh" ? zh : en}
                </a>
              ))}
            </div>
          </nav>

          <div className="hidden items-center gap-1.5 sm:flex">
            {[["all", "All", "全部"], ["fact", "Fact", "事實"], ["inference", "Course", "課程"], ["judgment", "Judgment", "判斷"]].map(([key, en, zh]) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`rounded-full border px-2.5 py-1.5 text-[11px] font-semibold tracking-[0.12em] ${filter === key ? "border-[#2E5C6E] bg-[#2E5C6E] text-white" : "border-[#D8CFBC] bg-white text-slate-700"}`}
              >
                {mode === "zh" ? zh : en}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="relative mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <section className="grid gap-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:items-start">
          <div className="rounded-[28px] border border-[#D8CFBC] bg-white/80 p-5 shadow-[0_20px_50px_rgba(38,43,49,0.06)] sm:p-7 lg:p-8">
            <div className="mb-3 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#D8CFBC] bg-[#F8F3E7] px-3 py-1 text-[10px] font-semibold tracking-[0.16em] text-[#7F735F] sm:text-[11px]">
                <Icon name="shield" className="h-3.5 w-3.5" />
                PLATFORM CASE
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#D8CFBC] bg-[#F8F3E7] px-3 py-1 text-[10px] font-semibold tracking-[0.16em] text-[#7F735F] sm:text-[11px]">
                <Icon name="translate" className="h-3.5 w-3.5" />
                {mode === "zh" ? "可切換語言" : "Language toggle"}
              </span>
            </div>

            <h1 className="text-[2rem] font-semibold leading-none tracking-tight text-slate-900 sm:text-[2.7rem] lg:text-[3rem]" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
              SaferTaxi
            </h1>

            <div className="mt-4 max-w-[55rem] text-[15px] leading-7 text-slate-700 sm:text-[16px] sm:leading-7.5">
              <Copy
                mode={mode}
                en="The strongest reading is that SaferTaxi had a real multi-sided value proposition, but had not yet aligned value creation, value delivery, and value capture into one focused platform takeoff strategy under severe resource constraints."
                zh="最穩的讀法是，SaferTaxi 其實有真實存在的多邊價值主張，但在嚴重資源限制下，還沒有把 value creation、value delivery、value capture 整合成一個聚焦的 platform takeoff strategy。"
              />
            </div>

            <div className="mt-5 grid gap-2.5 sm:grid-cols-2 xl:grid-cols-4 xl:gap-3">
              {[["map", "3 cities", "Buenos Aires, Santiago, Sao Paulo", "布宜諾斯艾利斯、聖地牙哥、聖保羅"], ["users", "18 employees", "Team size in October 2012", "2012 年 10 月團隊規模"], ["phone", "85,000 downloads", "30,000 registered users", "3 萬名註冊用戶"], ["dollar", "US$1M", "Initial VC round nearly exhausted", "初始 VC 資金幾乎見底"]].map(([icon, val, en, zh]) => (
                <div key={val} className="flex items-center gap-3 rounded-2xl border border-[#D8CFBC] bg-white/72 px-3.5 py-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F2ECE0] text-[#2E5C6E]">
                    <Icon name={icon} className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[15px] font-semibold leading-5 text-slate-900">{val}</div>
                    <Copy mode={mode} en={<div className="mt-0.5 text-[12.5px] leading-4.5 text-slate-600">{en}</div>} zh={<div className="mt-0.5 text-[12.5px] leading-4.5 text-slate-500">{zh}</div>} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-[26px] border border-[#D8CFBC] bg-[#F7F3E8] p-4 shadow-sm sm:p-5">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-[#622954]">
                  <Icon name="translate" className="h-4.5 w-4.5" />
                </div>
                <h2 className="text-[1.02rem] font-semibold text-slate-900 sm:text-[1.08rem]" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
                  <Copy mode={mode} en="How to read this page" zh="如何閱讀這一頁" />
                </h2>
              </div>
              <div className="mb-3 flex flex-wrap gap-2">
                <Tag tag="fact" />
                <Tag tag="inference" />
                <Tag tag="judgment" />
              </div>
              <Copy
                mode={mode}
                en={<p className="text-[13.5px] leading-6 text-slate-700">Built from the SaferTaxi case, your integrated SaferTaxi write-up, and Boudreau’s course logic on value creation, positioning, value delivery, takeoff, and value capture. It also restores details that quick summaries often drop, including the founder story, product features, channel mechanics, and competitive backdrop.</p>}
                zh={<p className="text-[13.5px] leading-6 text-slate-600">本頁以 SaferTaxi case、您先前整合版文字，以及 Boudreau 關於 value creation、positioning、value delivery、takeoff、value capture 的課程邏輯為基礎，也補回快速整理時常遺漏的創辦故事、產品細節、通路機制與競爭背景。</p>}
              />
            </div>

            <div className="rounded-[26px] border border-[#D8CFBC] bg-white/84 p-4 shadow-sm sm:p-5">
              <div className="grid gap-3 sm:grid-cols-3">
                {[["Discovery", "找車", "See nearby taxis, distance, and ETA.", "可看到附近車輛、距離與預計抵達時間。", "#2E5C6E"], ["Selection", "選擇", "Choose by driver photo, reviews, and wait time.", "可依司機照片、評價與等待時間選擇。", "#622954"], ["Trip safety", "乘車安全", "Ride history, traceability, and emergency tools reduce uncertainty.", "乘車紀錄、可追蹤性與緊急工具降低不確定性。", "#9C4A3C"]].map(([en, zh, bodyEn, bodyZh, color]) => (
                  <div key={en} className="rounded-[20px] border border-[#D8CFBC] bg-[#FAF6EC] p-3.5">
                    <div className="mx-auto mb-3 w-full max-w-[160px] rounded-[22px] border border-[#CFC4AF] bg-white p-2">
                      <div className="mb-2 flex items-center justify-between rounded-[16px] px-2 py-1 text-white" style={{ backgroundColor: color }}>
                        <span className="text-[10px] font-semibold tracking-[0.14em]">SaferTaxi</span>
                        <Icon name="taxi" className="h-3.5 w-3.5" />
                      </div>
                      <div className="space-y-2 rounded-[16px] bg-[#F8F3E7] p-2.5">
                        <div className="h-14 rounded-[12px] bg-[linear-gradient(135deg,#D9E7ED_0%,#EFF5F7_100%)] p-2">
                          <svg viewBox="0 0 100 64" className="h-full w-full">
                            <rect x="2" y="4" width="96" height="56" rx="12" fill="#E8F0F3" />
                            <circle cx="24" cy="36" r="4" fill={color} opacity="0.85" />
                            <circle cx="52" cy="24" r="4" fill="#C18B3B" />
                            <circle cx="78" cy="40" r="4" fill="#7A9FB0" />
                            <path d="M24 36L52 24L78 40" fill="none" stroke="#95AEB9" strokeWidth="2" strokeDasharray="4 4" />
                          </svg>
                        </div>
                        <div className="grid grid-cols-2 gap-1.5 text-[9.5px] text-slate-600">
                          <div className="rounded-xl bg-white px-2 py-1">ETA</div>
                          <div className="rounded-xl bg-white px-2 py-1">Reviews</div>
                          <div className="rounded-xl bg-white px-2 py-1">Tracking</div>
                          <div className="rounded-xl bg-white px-2 py-1">Pay</div>
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold leading-snug text-slate-900"><Copy mode={mode} en={en} zh={zh} /></div>
                      <Copy mode={mode} en={<div className="mt-1.5 text-[12.5px] leading-5 text-slate-600">{bodyEn}</div>} zh={<div className="mt-1.5 text-[12.5px] leading-5 text-slate-500">{bodyZh}</div>} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="mt-9 space-y-10 sm:mt-10 sm:space-y-12">
          <section id="facts" className="space-y-4 sm:space-y-5">
            <SectionHeader mode={mode} eyebrowEn="What the case actually gives you" eyebrowZh="案例原文實際給你的內容" titleEn="Case base" titleZh="案例基礎" />
            <div className="grid gap-4 xl:grid-cols-3">
              {visibleFacts.map((block) => <Card key={block.titleEn} block={block} mode={mode} filter={filter} />)}
            </div>
            <CityCompare mode={mode} />
            <GrowthSketch mode={mode} />
          </section>

          <section id="logic" className="space-y-4 sm:space-y-5">
            <SectionHeader mode={mode} eyebrowEn="Why this case fits the course" eyebrowZh="為何這個案例正好對應課程主軸" titleEn="Platform logic" titleZh="平臺邏輯" />
            <div className="grid gap-4 xl:grid-cols-3">
              {visibleLogic.map((block) => <Card key={block.titleEn} block={block} mode={mode} filter={filter} />)}
            </div>

            <div className="rounded-[22px] border border-[#D8CFBC] bg-white/86 p-4 shadow-sm sm:p-5">
              <div className="mb-4 max-w-2xl">
                <h3 className="text-[1.02rem] font-semibold text-slate-900 sm:text-[1.08rem]" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
                  <Copy mode={mode} en="The real bottleneck: activated local liquidity" zh="真正的瓶頸：activated local liquidity" />
                </h3>
                <Copy mode={mode} en={<p className="mt-1 text-[13.5px] leading-6 text-slate-600">Nominal signups do not create a market. The right riders and the right drivers need to be active in the same place at the same time.</p>} zh={<p className="mt-1 text-[13.5px] leading-6 text-slate-500">單純註冊數不會自動形成市場。對的乘客與對的司機，必須在同一時間、同一地點同時活躍。</p>} />
              </div>

              <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_190px_minmax(0,1fr)] lg:items-center xl:grid-cols-[minmax(0,1fr)_220px_minmax(0,1fr)]">
                <div className="space-y-3">
                  {[["briefcase", "Concentrated demand", "集中需求", "Corporate accounts and events make demand denser and easier to predict than diffuse consumer advertising.", "企業帳戶與活動合作，通常比廣泛消費者行銷更集中，也更容易預測。"], ["taxi", "Reliable local supply", "可靠在地供給", "Driver recruitment only matters if onboarded drivers actually stay active and available.", "司機招募只有在上線後真的持續活躍時才有意義。"]].map(([icon, en, zh, bEn, bZh]) => (
                    <div key={en} className="rounded-2xl border border-[#E1D7C6] bg-[#FAF6EC] p-3.5">
                      <div className="mb-2 flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-[#2E5C6E]">
                          <Icon name={icon} className="h-4 w-4" />
                        </div>
                        <div className="font-semibold text-slate-900"><Copy mode={mode} en={en} zh={zh} /></div>
                      </div>
                      <Copy mode={mode} en={<p className="text-[13px] leading-5.5 text-slate-600">{bEn}</p>} zh={<p className="text-[13px] leading-5.5 text-slate-500">{bZh}</p>} />
                    </div>
                  ))}
                </div>

                <div className="rounded-[24px] border border-[#D8CFBC] bg-[radial-gradient(circle_at_center,#F4EFE2_0%,#FBF8F1_68%)] p-4 sm:p-5">
                  <svg viewBox="0 0 220 220" className="w-full">
                    <circle cx="110" cy="110" r="70" fill="none" stroke="#D8CFBC" strokeWidth="24" />
                    <path d="M110 40a70 70 0 0 1 67 51" fill="none" stroke="#2E5C6E" strokeWidth="24" strokeLinecap="round" />
                    <path d="M177 91l7 17 16-10" fill="none" stroke="#2E5C6E" strokeWidth="6" />
                    <path d="M179 110a70 70 0 0 1-59 68" fill="none" stroke="#622954" strokeWidth="24" strokeLinecap="round" />
                    <path d="M120 178l-16 9 8 16" fill="none" stroke="#622954" strokeWidth="6" />
                    <path d="M120 179a70 70 0 0 1-67-50" fill="none" stroke="#C18B3B" strokeWidth="24" strokeLinecap="round" />
                    <path d="M53 129l-7-17-16 10" fill="none" stroke="#C18B3B" strokeWidth="6" />
                    <path d="M41 110a70 70 0 0 1 58-68" fill="none" stroke="#9C4A3C" strokeWidth="24" strokeLinecap="round" />
                    <path d="M99 42l16-9-8-16" fill="none" stroke="#9C4A3C" strokeWidth="6" />
                    <circle cx="110" cy="110" r="39" fill="#fff" stroke="#D8CFBC" />
                    <text x="110" y="103" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1F2937">Local</text>
                    <text x="110" y="121" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1F2937">Liquidity</text>
                  </svg>
                </div>

                <div className="space-y-3">
                  {[["shield", "Shorter wait, more trust", "更短等待，更高信任", "When the match works, wait time drops and the safety story becomes credible in daily use.", "只要配對真的做起來，等待時間就會下降，安全敘事也會在日常使用中變得可信。"], ["chart", "Self-reinforcing growth", "自我強化成長", "A functioning local loop creates better reviews, repeat use, and stronger word of mouth on both sides.", "在地回路一旦運作，就會帶來更好的評價、重複使用，以及雙邊口碑擴散。"]].map(([icon, en, zh, bEn, bZh]) => (
                    <div key={en} className="rounded-2xl border border-[#E1D7C6] bg-[#FAF6EC] p-3.5">
                      <div className="mb-2 flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-[#622954]">
                          <Icon name={icon} className="h-4 w-4" />
                        </div>
                        <div className="font-semibold text-slate-900"><Copy mode={mode} en={en} zh={zh} /></div>
                      </div>
                      <Copy mode={mode} en={<p className="text-[13px] leading-5.5 text-slate-600">{bEn}</p>} zh={<p className="text-[13px] leading-5.5 text-slate-500">{bZh}</p>} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="channels" className="space-y-4 sm:space-y-5">
            <SectionHeader mode={mode} eyebrowEn="Where growth could actually come from" eyebrowZh="成長真正可能從哪裡來" titleEn="Channel choices" titleZh="通路選擇" />

            <ChannelCardsMobile mode={mode} />

            <div className="hidden overflow-hidden rounded-[22px] border border-[#D8CFBC] bg-white shadow-sm md:block">
              <div className="overflow-x-auto">
                <table className="min-w-[720px] w-full text-left">
                  <thead className="bg-[#F4EEE2] text-[13px] text-slate-700">
                    <tr>
                      {[["Channel", "通路"], ["Shape of demand", "需求形狀"], ["Best reading", "較穩判讀"]].map(([en, zh]) => (
                        <th key={en} className="px-4 py-3 font-semibold">
                          <Copy mode={mode} en={en} zh={zh} />
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {channels.map((row, i) => (
                      <tr key={row.nameEn} className={i % 2 === 0 ? "bg-white" : "bg-[#FCFAF6]"}>
                        <td className="px-4 py-3.5 align-top">
                          <div className="flex items-start gap-3">
                            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#F3EDE1] text-[#2E5C6E]">
                              <Icon name={row.icon} className="h-4 w-4" />
                            </div>
                            <div className="font-medium leading-5 text-slate-900"><Copy mode={mode} en={row.nameEn} zh={row.nameZh} /></div>
                          </div>
                        </td>
                        <td className="px-4 py-3.5 text-[13.5px] leading-5.5 text-slate-700"><Copy mode={mode} en={row.aEn} zh={row.aZh} /></td>
                        <td className="px-4 py-3.5 text-[13.5px] leading-5.5 text-slate-700"><Copy mode={mode} en={row.bEn} zh={row.bZh} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section id="decision" className="space-y-4 sm:space-y-5">
            <SectionHeader mode={mode} eyebrowEn="Where to concentrate scarce resources" eyebrowZh="稀少資源應該集中在哪裡" titleEn="Decision logic" titleZh="決策邏輯" />
            <div className="grid gap-4 xl:grid-cols-2">
              {visibleDecisions.map((block) => <Card key={block.titleEn} block={block} mode={mode} filter={filter} />)}
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              {[["Why Santiago is the strongest beachhead", "為何聖地牙哥是最強灘頭堡", ["Highest smartphone penetration.", "Shortest observed SaferTaxi wait time.", "A favorable anti-drunk-driving context fit the safety story.", "The Primavera Fauna pilot gave SaferTaxi a live demand wedge."], ["智慧型手機滲透最高。", "SaferTaxi 等待時間最短。", "反酒駕環境與安全定位高度契合。", "Primavera Fauna 試點提供了真實需求楔子。"]], ["Why Sao Paulo still deserves respect", "為何聖保羅仍值得認真考慮", ["Largest revenue per ride.", "Large urban scale and meaningful taxi supply.", "The phone-and-data subsidy logic looked especially relevant there.", "The real question is whether SaferTaxi could afford to win there first."], ["單趟收入最高。", "城市規模大，計程車供給絕對數量也高。", "手機與數據補貼邏輯在當地特別重要。", "真正問題是 SaferTaxi 是否負擔得起先在那裡打贏。"]]].map(([en, zh, enBullets, zhBullets]) => (
                <div key={en} className="rounded-[22px] border border-[#D8CFBC] bg-[#FBF8F1] p-4 shadow-sm sm:p-5">
                  <h3 className="mb-3 text-[1.02rem] font-semibold text-slate-900 sm:text-[1.08rem]" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
                    <Copy mode={mode} en={en} zh={zh} />
                  </h3>
                  <Copy
                    mode={mode}
                    en={<ul className="space-y-2.5 text-[14px] leading-6 text-slate-700">{enBullets.map((b) => <li key={b} className="flex gap-2.5"><Icon name="check" className="mt-[3px] h-4 w-4 shrink-0 text-[#2E5C6E]" /><span>{b}</span></li>)}</ul>}
                    zh={<ul className="space-y-2.5 text-[14px] leading-6 text-slate-600">{zhBullets.map((b) => <li key={b} className="flex gap-2.5"><Icon name="check" className="mt-[3px] h-4 w-4 shrink-0 text-[#2E5C6E]" /><span>{b}</span></li>)}</ul>}
                  />
                </div>
              ))}
            </div>
          </section>

          <section id="answer" className="space-y-4 sm:space-y-5">
            <SectionHeader mode={mode} eyebrowEn="What to say cleanly in class" eyebrowZh="課堂上如何說得乾淨" titleEn="Core answer" titleZh="核心答案" />
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
              <div className="rounded-[22px] border border-[#D8CFBC] bg-white/84 p-4 shadow-sm sm:p-5">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[#F3EDE1] text-[#2E5C6E]">
                    <Icon name="taxi" className="h-4 w-4" />
                  </div>
                  <h3 className="text-[1.02rem] font-semibold text-slate-900 sm:text-[1.08rem]" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
                    <Copy mode={mode} en="Best concise answer" zh="最穩的精簡答案" />
                  </h3>
                </div>
                <Copy mode={mode} en={<p className="max-w-[60ch] text-[14.5px] leading-7 text-slate-800">{answer.en}</p>} zh={<p className="max-w-[60ch] text-[14.5px] leading-7 text-slate-700">{answer.zh}</p>} />
              </div>

              <div className="rounded-[22px] border border-[#D8CFBC] bg-[#FBF8F1] p-4 shadow-sm sm:p-5">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white text-[#622954]">
                    <Icon name="arrows" className="h-4 w-4" />
                  </div>
                  <h3 className="text-[1.02rem] font-semibold text-slate-900 sm:text-[1.08rem]" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
                    <Copy mode={mode} en="Safest speaking order" zh="最穩的口頭順序" />
                  </h3>
                </div>
                <Copy
                  mode={mode}
                  en={<ol className="space-y-2.5 text-[14px] leading-6 text-slate-700"><li className="flex gap-3"><span className="font-semibold text-[#622954]">1.</span><span>Start with the problem type: this is a platform takeoff problem.</span></li><li className="flex gap-3"><span className="font-semibold text-[#622954]">2.</span><span>Name the bottleneck: activated local liquidity.</span></li><li className="flex gap-3"><span className="font-semibold text-[#622954]">3.</span><span>State the move: one beachhead and one concentrated demand wedge.</span></li><li className="flex gap-3"><span className="font-semibold text-[#622954]">4.</span><span>End with capital: take it only after narrowing the strategy.</span></li></ol>}
                  zh={<ol className="space-y-2.5 text-[14px] leading-6 text-slate-600"><li className="flex gap-3"><span className="font-semibold text-[#622954]">1.</span><span>先定義問題型態，這是 platform takeoff problem。</span></li><li className="flex gap-3"><span className="font-semibold text-[#622954]">2.</span><span>再點出瓶頸，activated local liquidity。</span></li><li className="flex gap-3"><span className="font-semibold text-[#622954]">3.</span><span>接著說動作，單一 beachhead 加上單一集中需求楔子。</span></li><li className="flex gap-3"><span className="font-semibold text-[#622954]">4.</span><span>最後再談資本，只有在策略已收斂時才接受。</span></li></ol>}
                />
              </div>
            </div>
          </section>
        </div>
      </main>

      <LanguageDock mode={mode} setMode={setMode} open={dock} setOpen={setDock} />
    </div>
  );
}
