import React, { useState } from 'react';
import { ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area } from 'recharts';
import './Dashboard.scss';

interface StatCard {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
}

interface DataPoint {
  date: string;
  revenue: number;
  expenses: number;
  isHighlightPoint?: boolean;
}

interface CustomDotProps {
  cx?: number;
  cy?: number;
  payload?: DataPoint;
}

interface CustomLabelProps {
  x?: number;
  y?: number;
  payload?: DataPoint;
}

const PageviewsIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.58222 2.74033C11.7375 2.74033 13.8503 5.8044 14.4777 6.91122C14.6173 7.15738 14.6173 7.45022 14.4777 7.69638C13.8505 8.80297 11.7379 11.8683 7.58222 11.8683C3.4269 11.8681 1.31496 8.80299 0.687685 7.69638C0.548156 7.45022 0.548156 7.15738 0.687685 6.91122C1.31516 5.80438 3.42725 2.74053 7.58222 2.74033ZM7.58417 4.76865C6.18381 4.76865 5.04804 5.90442 5.04804 7.30478C5.04827 8.70494 6.18395 9.83994 7.58417 9.83994C8.98428 9.83981 10.1191 8.70486 10.1193 7.30478C10.1193 5.9045 8.98442 4.76877 7.58417 4.76865Z" fill="currentColor"/>
  </svg>
);

const UsersIcon = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.79089 11.4044C1.79089 9.56632 3.28098 8.07623 5.11909 8.07623H8.84515C10.6833 8.07623 12.1733 9.56632 12.1733 11.4044C12.1733 12.0171 11.6766 12.5138 11.0639 12.5138H2.90029C2.28759 12.5138 1.79089 12.0171 1.79089 11.4044Z" fill="currentColor"/>
    <path d="M6.98409 7.23072C8.61797 7.23072 9.94248 5.9062 9.94248 4.27233C9.94248 2.63845 8.61797 1.31393 6.98409 1.31393C5.35021 1.31393 4.0257 2.63845 4.0257 4.27233C4.0257 5.9062 5.35021 7.23072 6.98409 7.23072Z" fill="currentColor"/>
  </svg>
);

const SignupsIcon = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.98706 0.563477C10.3008 0.563477 12.9871 3.24977 12.9871 6.56348C12.9871 9.87718 10.3008 12.5635 6.98706 12.5635C3.67335 12.5635 0.987061 9.87718 0.987061 6.56348C0.987061 3.24977 3.67335 0.563477 6.98706 0.563477ZM6.98901 3.13477C6.66605 3.13477 6.40423 3.39681 6.40405 3.71973V5.97949H4.14331C3.82024 5.97949 3.55835 6.24138 3.55835 6.56445C3.55855 6.88735 3.82037 7.14941 4.14331 7.14941H6.40405V9.40723C6.4042 9.73017 6.66604 9.99219 6.98901 9.99219C7.3118 9.99197 7.57382 9.73003 7.57397 9.40723V7.14941H9.82983C10.1527 7.14926 10.4146 6.88726 10.4148 6.56445C10.4148 6.24148 10.1528 5.97964 9.82983 5.97949H7.57397V3.71973C7.5738 3.39694 7.31179 3.13499 6.98901 3.13477Z" fill="currentColor"/>
  </svg>
);

const UpArrowIcon = () => (
  <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.50242 6.90302L6.83575 1.56968" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6.83575 6.59796V1.56968H1.80747" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const DownArrowIcon = () => (
  <svg width="7" height="8" viewBox="0 0 7 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.12915 1.3524L6.46248 6.68573" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M1.4342 6.68573L6.46249 6.68573L6.46249 1.65745" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SubscriptionsIcon = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.44027 1.04506C6.6018 0.767734 7.00245 0.767734 7.16398 1.04506L8.87528 3.98319C8.93445 4.08478 9.0336 4.15682 9.14851 4.1817L12.4717 4.90131C12.7853 4.96924 12.9091 5.35028 12.6953 5.5896L10.4298 8.12508C10.3515 8.21275 10.3136 8.32931 10.3254 8.44628L10.6679 11.8291C10.7003 12.1485 10.3761 12.384 10.0824 12.2545L6.97099 10.8834C6.8634 10.836 6.74085 10.836 6.63326 10.8834L3.5218 12.2545C3.22811 12.3839 2.90398 12.1485 2.93631 11.8291L3.27882 8.44628C3.29067 8.32931 3.25279 8.21275 3.17446 8.12508L0.908959 5.5896C0.695118 5.35028 0.818924 4.96924 1.1326 4.90131L4.45574 4.1817C4.57064 4.15682 4.6698 4.08478 4.72897 3.98319L6.44027 1.04506Z" fill="currentColor"/>
  </svg>
);

const TotalSessionsIcon = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.78331 1.57004H7.35476C7.46842 1.57004 7.57743 1.52489 7.65781 1.44451C7.73818 1.36414 7.78333 1.25513 7.78333 1.14147C7.78333 1.0278 7.73818 0.91879 7.65781 0.838417C7.57743 0.758044 7.46842 0.712891 7.35476 0.712891H4.78331C4.66965 0.712891 4.56064 0.758044 4.48026 0.838417C4.39989 0.91879 4.35474 1.0278 4.35474 1.14147C4.35474 1.25513 4.39989 1.36414 4.48026 1.44451C4.56064 1.52489 4.66965 1.57004 4.78331 1.57004Z" fill="#AEB9E1"/>
    <path d="M6.06916 2.42712C5.052 2.42712 4.05767 2.72875 3.21193 3.29386C2.36618 3.85897 1.707 4.66218 1.31775 5.60192C0.928498 6.54166 0.826651 7.57572 1.02509 8.57335C1.22353 9.57097 1.71334 10.4873 2.43259 11.2066C3.15184 11.9258 4.06821 12.4157 5.06584 12.6141C6.06346 12.8125 7.09752 12.7107 8.03726 12.3214C8.97701 11.9322 9.78022 11.273 10.3453 10.4273C10.9104 9.58151 11.2121 8.58718 11.2121 7.57002C11.2092 6.20691 10.6665 4.90044 9.70261 3.93657C8.73875 2.9727 7.43227 2.42995 6.06916 2.42712ZM8.49597 5.75393L6.37452 7.87538C6.29261 7.95459 6.18311 7.99886 6.06916 7.99886C5.95521 7.99886 5.84572 7.95459 5.76381 7.87538C5.68333 7.79412 5.63818 7.68438 5.63818 7.57002C5.63818 7.45565 5.68333 7.34591 5.76381 7.26466L7.88525 5.14321C7.92368 5.09639 7.97148 5.05814 8.02558 5.0309C8.07969 5.00367 8.13889 4.98807 8.19939 4.9851C8.25989 4.98213 8.32034 4.99185 8.37685 5.01365C8.43336 5.03545 8.48468 5.06884 8.52751 5.11167C8.57034 5.1545 8.60373 5.20582 8.62553 5.26233C8.64733 5.31885 8.65706 5.3793 8.65408 5.43979C8.65111 5.50029 8.63551 5.5595 8.60828 5.6136C8.58105 5.6677 8.54279 5.71551 8.49597 5.75393Z" fill="#AEB9E1"/>
  </svg>
);

const TotalProfitIcon = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.6047 11.5843C12.6047 11.7067 12.5561 11.8241 12.4696 11.9106C12.383 11.9972 12.2656 12.0458 12.1432 12.0458H1.06627C0.943867 12.0458 0.826473 11.9972 0.739918 11.9106C0.653363 11.8241 0.604736 11.7067 0.604736 11.5843V2.35351C0.604736 2.2311 0.653363 2.1137 0.739918 2.02715C0.826473 1.94059 0.943867 1.89197 1.06627 1.89197C1.18868 1.89197 1.30608 1.94059 1.39263 2.02715C1.47919 2.1137 1.52781 2.2311 1.52781 2.35351V8.62466L4.42974 5.71697C4.51724 5.6303 4.63542 5.58168 4.75858 5.58168C4.88174 5.58168 4.99992 5.6303 5.08743 5.71697L6.60474 7.24004L9.41435 4.43043L8.58358 3.60543C8.52097 3.5387 8.47853 3.4556 8.46117 3.36576C8.44382 3.27591 8.45225 3.18299 8.48551 3.09774C8.52144 3.01418 8.58097 2.94293 8.6568 2.89271C8.73264 2.8425 8.82148 2.81551 8.91243 2.81504H11.2201C11.3425 2.81504 11.4599 2.86367 11.5465 2.95023C11.633 3.03678 11.6817 3.15418 11.6817 3.27658V5.58428C11.6819 5.6754 11.6553 5.76456 11.6049 5.84053C11.5546 5.91651 11.483 5.97589 11.399 6.0112C11.342 6.03381 11.2814 6.04555 11.2201 6.04581C11.0976 6.0453 10.9799 5.99781 10.8913 5.91312L10.0663 5.08235L6.93358 8.22081C6.84608 8.30748 6.7279 8.3561 6.60474 8.3561C6.48158 8.3561 6.3634 8.30748 6.27589 8.22081L4.75858 6.69774L1.52781 9.92851V11.1227H12.1432C12.2656 11.1227 12.383 11.1714 12.4696 11.2579C12.5561 11.3445 12.6047 11.4619 12.6047 11.5843Z" fill="#AEB9E1"/>
  </svg>
);

const LiveBadge = () => (
  <svg width="40" height="19" viewBox="0 0 40 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.0783691" y="0.74707" width="39" height="18" rx="2" fill="#05C168" fillOpacity="0.2"/>
    <rect x="0.378369" y="1.04707" width="38.4" height="17.4" rx="1.7" stroke="#05C168" strokeOpacity="0.2" strokeWidth="0.6"/>
    <circle cx="7.57837" cy="9.74707" r="1.5" fill="#05C168"/>
    <path d="M14.9684 12.8271H17.3184V13.7471H13.8284V6.79707H14.9684V12.8271ZM18.8517 7.50707C18.6451 7.50707 18.4717 7.43707 18.3317 7.29707C18.1917 7.15707 18.1217 6.98374 18.1217 6.77707C18.1217 6.5704 18.1917 6.39707 18.3317 6.25707C18.4717 6.11707 18.6451 6.04707 18.8517 6.04707C19.0517 6.04707 19.2217 6.11707 19.3617 6.25707C19.5017 6.39707 19.5717 6.5704 19.5717 6.77707C19.5717 6.98374 19.5017 7.15707 19.3617 7.29707C19.2217 7.43707 19.0517 7.50707 18.8517 7.50707ZM19.4117 8.23707V13.7471H18.2717V8.23707H19.4117ZM23.0384 12.7271L24.5984 8.23707H25.8084L23.7084 13.7471H22.3484L20.2584 8.23707H21.4784L23.0384 12.7271ZM31.7202 10.8571C31.7202 11.0637 31.7068 11.2504 31.6802 11.4171H27.4702C27.5035 11.8571 27.6668 12.2104 27.9602 12.4771C28.2535 12.7437 28.6135 12.8771 29.0402 12.8771C29.6535 12.8771 30.0868 12.6204 30.3402 12.1071H31.5702C31.4035 12.6137 31.1002 13.0304 30.6602 13.3571C30.2268 13.6771 29.6868 13.8371 29.0402 13.8371C28.5135 13.8371 28.0402 13.7204 27.6202 13.4871C27.2068 13.2471 26.8802 12.9137 26.6402 12.4871C26.4068 12.0537 26.2902 11.5537 26.2902 10.9871C26.2902 10.4204 26.4035 9.92374 26.6302 9.49707C26.8635 9.06374 27.1868 8.7304 27.6002 8.49707C28.0202 8.26374 28.5002 8.14707 29.0402 8.14707C29.5602 8.14707 30.0235 8.2604 30.4302 8.48707C30.8368 8.71374 31.1535 9.03374 31.3802 9.44707C31.6068 9.85374 31.7202 10.3237 31.7202 10.8571ZM30.5302 10.4971C30.5235 10.0771 30.3735 9.7404 30.0802 9.48707C29.7868 9.23374 29.4235 9.10707 28.9902 9.10707C28.5968 9.10707 28.2602 9.23374 27.9802 9.48707C27.7002 9.73374 27.5335 10.0704 27.4802 10.4971H30.5302Z" fill="#14CA74"/>
  </svg>
);

const CalendarIcon = () => (
  <svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.690063" y="1.75977" width="9.06956" height="9.12111" rx="1" stroke="#AEB9E1" strokeWidth="0.8"/>
    <path d="M0.690063 4.80804H9.75963V9.88017C9.75963 10.4325 9.31191 10.8802 8.75963 10.8802H1.69006C1.13778 10.8802 0.690063 10.4325 0.690063 9.88017V4.80804Z" fill="#AEB9E1" stroke="#AEB9E1" strokeWidth="0.8"/>
    <path d="M7.74084 0.880859V2.53454" stroke="#AEB9E1" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2.77991 0.880859V2.53454" stroke="#AEB9E1" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const DropdownArrowIcon = () => (
  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1L5 5L9 1" stroke="#AEB9E1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.3334 4L6.00008 11.3333L2.66675 8" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const stats: StatCard[] = [
  {
    title: "Pageviews",
    value: "50.8K",
    change: 28.4,
    icon: <PageviewsIcon />
  },
  {
    title: "Monthly users",
    value: "23.6K",
    change: -12.6,
    icon: <UsersIcon />
  },
  {
    title: "New sign ups",
    value: "756",
    change: 3.1,
    icon: <SignupsIcon />
  },
  {
    title: "Subscriptions",
    value: "2.3K",
    change: 11.3,
    icon: <SubscriptionsIcon />
  }
];

const generateRevenueData = (days: number): DataPoint[] => {
  const data = [];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  // Revenue data points to match the exact curve from Figma
  const revenuePoints = [0, 20, 40, 100, 100, 125, 100, 120, 160, 200, 220, 225];
  
  // Expenses data points to match the exact curve from Figma
  const expensePoints = [25, 35, 15, 60, 70, 90, 70, 110, 170, 80, 50, 80];

  for (let i = 0; i < days; i++) {
    data.push({
      date: months[i],
      revenue: revenuePoints[i],
      expenses: expensePoints[i],
      isHighlightPoint: i === 5 // June
    });
  }
  return data;
};

const CustomDot = (props: CustomDotProps): React.ReactElement<SVGElement> => {
  const { cx = 0, cy = 0, payload } = props;
  if (payload?.isHighlightPoint) {
    return (
      <circle
        cx={cx}
        cy={cy}
        r={4}
        stroke="#CB3CFF"
        strokeWidth={2}
        fill="#151934"
      />
    );
  }
  return <g />;
};

const CustomLabel = (props: CustomLabelProps): React.ReactElement<SVGElement> => {
  const { x = 0, y = 0, payload } = props;
  if (payload?.isHighlightPoint) {
    return (
      <g>
        <text
          x={x}
          y={y - 20}
          fill="#fff"
          textAnchor="middle"
          fontSize="14"
        >
          $125.2k
        </text>
        <text
          x={x}
          y={y - 40}
          fill="rgba(255,255,255,0.6)"
          textAnchor="middle"
          fontSize="12"
        >
          June 21, 2023
        </text>
        <text
          x={x + 50}
          y={y - 30}
          fill="#05C168"
          textAnchor="start"
          fontSize="12"
          className="point-change positive"
        >
          12.5%
          <UpArrowIcon />
        </text>
      </g>
    );
  }
  return <g />;
};

const Dashboard = () => {
  const [dateRange, setDateRange] = useState("Jan 2025 - Dec 2025");
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);
  
  const dateOptions = [
    "Jan 2025 - Dec 2025",
    "Jan 2024 - Dec 2024",
    "Jan 2023 - Dec 2023",
    "Jan 2022 - Dec 2022"
  ];

  const data = generateRevenueData(12);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Welcome back, John</h1>
          <p className="subtitle">Measure your advertising ROI and report website traffic.</p>
        </div>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-header">
              <div className="stat-icon">{stat.icon}</div>
              <span className="stat-title">{stat.title}</span>
            </div>
            <div className="stat-content">
              <span className="stat-value">{stat.value}</span>
              <span className={`stat-change ${stat.change >= 0 ? 'positive' : 'negative'}`}>
                {Math.abs(stat.change)}%
                {stat.change >= 0 ? <UpArrowIcon /> : <DownArrowIcon />}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="chart-section">
        <div className="main-chart card">
          <div className="chart-header">
            <div>
              <h3>Total revenue</h3>
              <div className="revenue-info">
                <span className="amount">$240.8K</span>
                <span className="change positive">
                  24.6%
                  <UpArrowIcon />
                </span>
              </div>
            </div>
            <div className="chart-controls">
              <div className="legend">
                <span className="legend-item">
                  <span className="dot revenue"></span>
                  Revenue
                </span>
                <span className="legend-item">
                  <span className="dot expenses"></span>
                  Expenses
                </span>
              </div>
              <div className="custom-date-range">
                <button 
                  className="date-range-button" 
                  onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
                >
                  <CalendarIcon />
                  <span>{dateRange}</span>
                  <DropdownArrowIcon />
                </button>
                {isDateDropdownOpen && (
                  <div className="date-range-dropdown">
                    {dateOptions.map((option) => (
                      <div 
                        key={option}
                        className={`date-range-option ${dateRange === option ? 'selected' : ''}`}
                        onClick={() => {
                          setDateRange(option);
                          setIsDateDropdownOpen(false);
                        }}
                      >
                        {option}
                        {dateRange === option && <CheckIcon />}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="chart-container">
            <ResponsiveContainer width="100%" height={460}>
              <ComposedChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                <defs>
                  <linearGradient id="expensesFill" x1="276.477" y1="0.92688" x2="276.477" y2="253.015" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#57C3FF" stopOpacity={0.2}/>
                    <stop offset="1" stopColor="#57C3FF" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  stroke="rgba(255,255,255,0.6)"
                  tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
                  tickLine={false}
                  axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                />
                <YAxis 
                  stroke="rgba(255,255,255,0.6)"
                  tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
                  tickLine={false}
                  axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                  tickFormatter={(value) => `${value}K`}
                  ticks={[0, 25, 50, 100, 150, 200, 250]}
                  domain={[0, 250]}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#151934',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '12px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.25)'
                  }}
                  labelStyle={{ color: 'rgba(255,255,255,0.6)', marginBottom: '8px' }}
                  itemStyle={{ color: '#fff' }}
                  formatter={(value: number, name: string) => [
                    `$${value}K`,
                    name.charAt(0).toUpperCase() + name.slice(1)
                  ]}
                />
                <Area
                  type="natural"
                  dataKey="expenses"
                  stroke="#57C3FF"
                  fill="url(#expensesFill)"
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={false}
                  fillOpacity={1}
                />
                <Line 
                  type="natural"
                  dataKey="revenue"
                  stroke="#CB3CFF"
                  strokeWidth={2.5}
                  dot={CustomDot}
                  activeDot={false}
                  label={CustomLabel}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="side-charts">
          <div className="total-profit card">
            <div className="header">
              <span className="icon">
                <TotalProfitIcon />
              </span>
              <h3>Total profit</h3>
            </div>
            <div className="profit-info">
              <span className="amount">$144.6K</span>
              <span className="change positive">
                28.5%
                <UpArrowIcon />
              </span>
            </div>
            <div className="mini-chart">
              <svg width="317" height="95" viewBox="0 0 317 95" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Grid lines */}
                <path d="M0.604736 76.0801L316.526 76.0801" stroke="#0B1739" strokeWidth="0.6"/>
                <path d="M0.604736 51.0801L316.526 51.0801" stroke="#0B1739" strokeWidth="0.6"/>
                <path d="M0.604736 26.0801L316.526 26.0801" stroke="#0B1739" strokeWidth="0.6"/>
                <path d="M0.604736 1.08014L316.526 1.0801" stroke="#0B1739" strokeWidth="0.6"/>
                
                {/* Vertical grid lines */}
                <path d="M116.815 76.1113L116.815 1.08008" stroke="#0B1739" strokeWidth="0.6" strokeDasharray="5 5"/>
                <path d="M22.3318 76.1113L22.3318 1.08008" stroke="#0B1739" strokeWidth="0.6" strokeDasharray="5 5"/>
                <path d="M209.782 76.1113L209.782 1.08008" stroke="#0B1739" strokeWidth="0.6" strokeDasharray="5 5"/>
                <path d="M302.929 76.1113L302.929 1.08008" stroke="#0B1739" strokeWidth="0.6" strokeDasharray="5 5"/>
                
                {/* Bars */}
                <path d="M20.5632 26.9229C20.5632 26.3706 21.0109 25.9229 21.5632 25.9229H23.7739C24.3262 25.9229 24.7739 26.3706 24.7739 26.9229V76.0895H20.5632V26.9229Z" fill="#CB3CFF"/>
                <path d="M31.8477 35.8428C31.8477 35.2905 32.2954 34.8428 32.8477 34.8428H35.0583C35.6106 34.8428 36.0583 35.2905 36.0583 35.8428V76.0909H31.8477V35.8428Z" fill="#00C2FF"/>
                <path d="M43.1321 26.9229C43.1321 26.3706 43.5798 25.9229 44.1321 25.9229H46.3427C46.895 25.9229 47.3427 26.3706 47.3427 26.9229V76.0895H43.1321V26.9229Z" fill="#CB3CFF"/>
                <path d="M54.4165 45.5967C54.4165 45.0444 54.8642 44.5967 55.4165 44.5967H57.6272C58.1795 44.5967 58.6272 45.0444 58.6272 45.5967V76.0902H54.4165V45.5967Z" fill="#00C2FF"/>
                <path d="M65.7009 31.6611C65.7009 31.1088 66.1486 30.6611 66.7009 30.6611H68.9116C69.4639 30.6611 69.9116 31.1088 69.9116 31.6611V76.0898H65.7009V31.6611Z" fill="#CB3CFF"/>
                <path d="M77.003 62.5252C76.9933 61.973 77.4332 61.5205 77.9854 61.5144L80.1958 61.49C80.748 61.4839 81.2036 61.9266 81.2132 62.4788L81.4507 76.0652L77.2405 76.1117L77.003 62.5252Z" fill="#00C2FF"/>
                <path d="M88.5245 35.8428C88.5245 35.2905 88.9723 34.8428 89.5245 34.8428H91.7352C92.2875 34.8428 92.7352 35.2905 92.7352 35.8428V76.0909H88.5245V35.8428Z" fill="#CB3CFF"/>
                <path d="M99.809 18.0049C99.809 17.4526 100.257 17.0049 100.809 17.0049H103.02C103.572 17.0049 104.02 17.4526 104.02 18.0049V76.0901H99.809V18.0049Z" fill="#00C2FF"/>
                <path d="M111.093 26.9229C111.093 26.3706 111.541 25.9229 112.093 25.9229H114.304C114.856 25.9229 115.304 26.3706 115.304 26.9229V76.0895H111.093V26.9229Z" fill="#CB3CFF"/>
                <path d="M122.378 41.1377C122.378 40.5854 122.826 40.1377 123.378 40.1377H125.588C126.141 40.1377 126.588 40.5854 126.588 41.1377V76.0905H122.378V41.1377Z" fill="#00C2FF"/>
                <path d="M133.662 18.0049C133.662 17.4526 134.11 17.0049 134.662 17.0049H136.873C137.425 17.0049 137.873 17.4526 137.873 18.0049V76.0901H133.662V18.0049Z" fill="#CB3CFF"/>
                <path d="M144.947 33.8906C144.947 33.3383 145.394 32.8906 145.947 32.8906H148.157C148.709 32.8906 149.157 33.3383 149.157 33.8906V76.0897H144.947V33.8906Z" fill="#00C2FF"/>
                <path d="M156.231 25.5293C156.231 24.977 156.679 24.5293 157.231 24.5293H159.442C159.994 24.5293 160.442 24.977 160.442 25.5293V76.0895H156.231V25.5293Z" fill="#CB3CFF"/>
                <path d="M167.515 51.7285C167.515 51.1762 167.963 50.7285 168.515 50.7285H170.726C171.278 50.7285 171.726 51.1762 171.726 51.7285V76.0906H167.515V51.7285Z" fill="#00C2FF"/>
                <path d="M178.8 34.2393C178.8 33.687 179.248 33.2393 179.8 33.2393H182.01C182.563 33.2393 183.01 33.687 183.01 34.2393V76.0899H178.8V34.2393Z" fill="#CB3CFF"/>
                <path d="M190.084 44.2725C190.084 43.7202 190.532 43.2725 191.084 43.2725H193.295C193.847 43.2725 194.295 43.7202 194.295 44.2725V76.0898H190.084V44.2725Z" fill="#00C2FF"/>
                <path d="M201.369 25.1816C201.369 24.6294 201.816 24.1816 202.369 24.1816H204.579C205.132 24.1816 205.579 24.6294 205.579 25.1816V76.0902H201.369V25.1816Z" fill="#CB3CFF"/>
                <path d="M212.653 34.2393C212.653 33.687 213.101 33.2393 213.653 33.2393H215.864C216.416 33.2393 216.864 33.687 216.864 34.2393V76.0899H212.653V34.2393Z" fill="#00C2FF"/>
                <path d="M223.938 46.2236C223.938 45.6713 224.385 45.2236 224.938 45.2236H227.148C227.701 45.2236 228.148 45.6713 228.148 46.2236V76.0901H223.938V46.2236Z" fill="#CB3CFF"/>
                <path d="M235.222 20.9297C235.222 20.3774 235.67 19.9297 236.222 19.9297H238.433C238.985 19.9297 239.433 20.3774 239.433 20.9297V76.0885H235.222V20.9297Z" fill="#00C2FF"/>
                <path d="M246.506 36.748C246.506 36.1958 246.954 35.748 247.506 35.748H249.717C250.269 35.748 250.717 36.1958 250.717 36.748V76.0904H246.506V36.748Z" fill="#CB3CFF"/>
                <path d="M257.791 30.6855C257.791 30.1333 258.239 29.6855 258.791 29.6855H261.002C261.554 29.6855 262.002 30.1333 262.002 30.6855V76.0897H257.791V30.6855Z" fill="#00C2FF"/>
                <path d="M269.075 49.499C269.075 48.9467 269.523 48.499 270.075 48.499H272.286C272.838 48.499 273.286 48.9467 273.286 49.499V76.0907H269.075V49.499Z" fill="#CB3CFF"/>
                <path d="M280.36 24.832C280.36 24.2797 280.808 23.832 281.36 23.832H283.571C284.123 23.832 284.571 24.2797 284.571 24.832V76.089H280.36V24.832Z" fill="#00C2FF"/>
                <path d="M291.644 33.0547C291.644 32.5024 292.092 32.0547 292.644 32.0547H294.855C295.407 32.0547 295.855 32.5024 295.855 33.0547V76.0899H291.644V33.0547Z" fill="#CB3CFF"/>
                <path d="M302.928 21.2793C302.928 20.727 303.376 20.2793 303.928 20.2793H306.139C306.691 20.2793 307.139 20.727 307.139 21.2793V76.0897H302.928V21.2793Z" fill="#00C2FF"/>
                
                {/* Month labels */}
                <path d="M11.0709 86.4424V85.6104H12.7349V91.4424H11.8149V86.4424H11.0709ZM14.4918 90.2024C15.0038 89.7597 15.4065 89.397 15.6998 89.1144C15.9985 88.8264 16.2465 88.5277 16.4438 88.2184C16.6411 87.909 16.7398 87.5997 16.7398 87.2904C16.7398 86.9704 16.6625 86.7197 16.5078 86.5384C16.3585 86.357 16.1211 86.2664 15.7958 86.2664C15.4811 86.2664 15.2358 86.3677 15.0598 86.5704C14.8891 86.7677 14.7985 87.0344 14.7878 87.3704H13.9078C13.9238 86.7624 14.1051 86.2984 14.4518 85.9784C14.8038 85.653 15.2491 85.4904 15.7878 85.4904C16.3691 85.4904 16.8225 85.6504 17.1478 85.9704C17.4785 86.2904 17.6438 86.717 17.6438 87.2504C17.6438 87.6344 17.5451 88.005 17.3478 88.3624C17.1558 88.7144 16.9238 89.0317 16.6518 89.3144C16.3851 89.5917 16.0438 89.9144 15.6278 90.2824L15.2678 90.6024H17.8038V91.3624H13.9158V90.6984L14.4918 90.2024ZM24.1551 90.3064H21.8271L21.4271 91.4424H20.4751L22.4671 85.8744H23.5231L25.5151 91.4424H24.5551L24.1551 90.3064ZM23.8991 89.5624L22.9951 86.9784L22.0831 89.5624H23.8991ZM32.2373 85.8824V91.4424H31.3253V87.6344L29.6293 91.4424H28.9973L27.2933 87.6344V91.4424H26.3813V85.8824H27.3653L29.3173 90.2424L31.2613 85.8824H32.2373Z" fill="#AEB9E1"/>
                <path d="M107.175 88.3944C106.62 88.117 106.343 87.6797 106.343 87.0824C106.343 86.7944 106.415 86.5304 106.559 86.2904C106.703 86.0504 106.919 85.861 107.207 85.7224C107.495 85.5784 107.847 85.5064 108.263 85.5064C108.674 85.5064 109.023 85.5784 109.311 85.7224C109.604 85.861 109.823 86.0504 109.967 86.2904C110.111 86.5304 110.183 86.7944 110.183 87.0824C110.183 87.381 110.106 87.645 109.951 87.8744C109.802 88.0984 109.602 88.2717 109.351 88.3944C109.655 88.5064 109.895 88.6904 110.071 88.9464C110.247 89.197 110.335 89.493 110.335 89.8344C110.335 90.181 110.247 90.4877 110.071 90.7544C109.895 91.021 109.65 91.2264 109.335 91.3704C109.02 91.5144 108.663 91.5864 108.263 91.5864C107.863 91.5864 107.506 91.5144 107.191 91.3704C106.882 91.2264 106.639 91.021 106.463 90.7544C106.287 90.4877 106.199 90.181 106.199 89.8344C106.199 89.4877 106.287 89.189 106.463 88.9384C106.639 88.6877 106.876 88.5064 107.175 88.3944ZM109.311 87.1944C109.311 86.8957 109.218 86.6664 109.031 86.5064C108.844 86.3464 108.588 86.2664 108.263 86.2664C107.943 86.2664 107.69 86.3464 107.503 86.5064C107.316 86.6664 107.223 86.8984 107.223 87.2024C107.223 87.469 107.319 87.6877 107.511 87.8584C107.708 88.0237 107.959 88.1064 108.263 88.1064C108.567 88.1064 108.818 88.021 109.015 87.8504C109.212 87.6797 109.311 87.461 109.311 87.1944ZM108.263 88.7944C107.911 88.7944 107.623 88.8824 107.399 89.0584C107.18 89.229 107.071 89.477 107.071 89.8024C107.071 90.1064 107.178 90.3544 107.391 90.5464C107.604 90.733 107.895 90.8264 108.263 90.8264C108.626 90.8264 108.911 90.7304 109.119 90.5384C109.332 90.3464 109.439 90.101 109.439 89.8024C109.439 89.4824 109.33 89.2344 109.111 89.0584C108.898 88.8824 108.615 88.7944 108.263 88.7944ZM116.843 90.3064H114.515L114.115 91.4424H113.163L115.155 85.8744H116.211L118.203 91.4424H117.243L116.843 90.3064ZM116.587 89.5624L115.683 86.9784L114.771 89.5624H116.587ZM124.925 85.8824V91.4424H124.013V87.6344L122.317 91.4424H121.685L119.981 87.6344V91.4424H119.069V85.8824H120.053L122.005 90.2424L123.949 85.8824H124.925Z" fill="#AEB9E1"/>
                <path d="M198.079 90.2264V89.5384L200.767 85.6824H201.871V89.4344H202.615V90.2264H201.871V91.4424H200.975V90.2264H198.079ZM201.015 86.6104L199.127 89.4344H201.015V86.6104ZM209.457 87.5384C209.457 87.821 209.39 88.0877 209.257 88.3384C209.123 88.589 208.91 88.7944 208.617 88.9544C208.323 89.109 207.947 89.1864 207.489 89.1864H206.481V91.4424H205.569V85.8824H207.489C207.915 85.8824 208.275 85.957 208.569 86.1064C208.867 86.2504 209.089 86.4477 209.233 86.6984C209.382 86.949 209.457 87.229 209.457 87.5384ZM207.489 88.4424C207.835 88.4424 208.094 88.365 208.265 88.2104C208.435 88.0504 208.521 87.8264 208.521 87.5384C208.521 86.9304 208.177 86.6264 207.489 86.6264H206.481V88.4424H207.489ZM216.183 85.8824V91.4424H215.271V87.6344L213.575 91.4424H212.943L211.239 87.6344V91.4424H210.327V85.8824H211.311L213.263 90.2424L215.207 85.8824H216.183Z" fill="#AEB9E1"/>
                <path d="M290.071 86.4424V85.6104H291.735V91.4424H290.815V86.4424H290.071ZM292.868 86.4424V85.6104H294.532V91.4424H293.612V86.4424H292.868ZM301.871 87.5384C301.871 87.821 301.804 88.0877 301.671 88.3384C301.537 88.589 301.324 88.7944 301.031 88.9544C300.737 89.109 300.361 89.1864 299.903 89.1864H298.895V91.4424H297.983V85.8824H299.903C300.329 85.8824 300.689 85.957 300.983 86.1064C301.281 86.2504 301.503 86.4477 301.647 86.6984C301.796 86.949 301.871 87.229 301.871 87.5384ZM299.903 88.4424C300.249 88.4424 300.508 88.365 300.679 88.2104C300.849 88.0504 300.935 87.8264 300.935 87.5384C300.935 86.9304 300.591 86.6264 299.903 86.6264H298.895V88.4424H299.903ZM308.597 85.8824V91.4424H307.685V87.6344L305.989 91.4424H305.357L303.653 87.6344V91.4424H302.741V85.8824H303.725L305.677 90.2424L307.621 85.8824H308.597Z" fill="#AEB9E1"/>
              </svg>
            </div>
            <div className="chart-label">Last 12 months</div>
          </div>

          <div className="total-sessions card">
            <div className="header">
              <span className="icon">
                <TotalSessionsIcon />
              </span>
              <h3>Total sessions</h3>
            </div>
            <div className="sessions-info">
              <span className="amount">400</span>
              <span className="change positive">
                16.8%
                <UpArrowIcon />
              </span>
            </div>
            <div className="mini-chart">
              <svg width="325" height="104" viewBox="0 0 345 114" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Grid lines */}
                <path d="M25.1687 81.2783L323.568 81.2783" stroke="#0B1739" strokeWidth="0.6"/>
                <path d="M25.1687 57.2783L323.568 57.2783" stroke="#0B1739" strokeWidth="0.6"/>
                <path d="M25.1687 33.2783L323.568 33.2783" stroke="#0B1739" strokeWidth="0.6"/>
                <path d="M25.1687 9.27838L323.568 9.27835" stroke="#0B1739" strokeWidth="0.6"/>
                
                {/* Vertical grid lines */}
                <path d="M95.7214 81.2783L95.7214 9.27832" stroke="#0B1739" strokeWidth="0.6" strokeDasharray="5 5"/>
                <path d="M41.2406 81.2783L41.2406 9.27832" stroke="#0B1739" strokeWidth="0.6" strokeDasharray="5 5"/>
                <path d="M150.201 81.2783L150.201 9.27832" stroke="#0B1739" strokeWidth="0.6" strokeDasharray="5 5"/>
                <path d="M204.682 81.2783L204.682 9.27832" stroke="#0B1739" strokeWidth="0.6" strokeDasharray="5 5"/>
                <path d="M259.161 81.2783L259.161 9.27832" stroke="#0B1739" strokeWidth="0.6" strokeDasharray="5 5"/>
                <path d="M313.642 81.2783L313.642 9.27832" stroke="#0B1739" strokeWidth="0.6" strokeDasharray="5 5"/>
                
                {/* Line chart */}
                <path d="M25.1687 81.2783L45.128 74.9387C45.3288 74.8749 45.5043 74.7493 45.6295 74.5799L57.7714 58.1459C58.0984 57.7034 58.7214 57.6081 59.1656 57.9327L77.9322 71.6426C78.3868 71.9747 79.0258 71.8663 79.3453 71.4028L92.722 52.0049C93.0331 51.5537 93.6496 51.4371 94.1041 51.7434L112.84 64.3715C112.94 64.4389 113.052 64.4876 113.169 64.5154L145.395 72.1438C145.677 72.2105 145.973 72.1519 146.208 71.983L172.285 53.2611C172.401 53.1775 172.498 53.0699 172.569 52.9456L191.984 19.0289C192.37 18.3545 193.344 18.3588 193.724 19.0366L224.73 74.3297C224.906 74.6452 225.24 74.8406 225.602 74.8406H260.575C260.832 74.8406 261.078 74.7421 261.264 74.5656L285.089 51.9313C285.51 51.5311 286.182 51.5729 286.551 52.022L302.991 72.0647C303.09 72.1857 303.217 72.2818 303.36 72.3451L323.568 81.2783" stroke="#CB3CFF" strokeWidth="1.2" strokeLinecap="round"/>
                
                {/* X-axis labels */}
                <text x="33.6173" y="100.7471" fill="#AEB9E1" fontSize="12">12 AM</text>
                <text x="126.287" y="100.7471" fill="#AEB9E1" fontSize="12">8 AM</text>
                <text x="213.757" y="100.7471" fill="#AEB9E1" fontSize="12">4 PM</text>
                <text x="302.315" y="100.7471" fill="#AEB9E1" fontSize="12">11 PM</text>
                
                {/* Y-axis labels */}
                <text x="20" y="81.2783" fill="#AEB9E1" fontSize="12" textAnchor="end">0</text>
                <text x="20" y="57.2783" fill="#AEB9E1" fontSize="12" textAnchor="end">100</text>
                <text x="20" y="33.2783" fill="#AEB9E1" fontSize="12" textAnchor="end">250</text>
                <text x="20" y="9.27838" fill="#AEB9E1" fontSize="12" textAnchor="end">500</text>
              </svg>
            </div>
            <div className="total-sessions-footer">
              <LiveBadge />
              <div className="visitor-count">10k visitors</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 