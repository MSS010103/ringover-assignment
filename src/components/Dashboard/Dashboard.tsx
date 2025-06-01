import './Dashboard.scss';
import RevenueGraph from './RevenueGraph';
import TotalProfit from './TotalProfit';

const PageviewsIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.58222 2.74033C11.7375 2.74033 13.8503 5.8044 14.4777 6.91122C14.6173 7.15738 14.6173 7.45022 14.4777 7.69638C13.8505 8.80297 11.7379 11.8683 7.58222 11.8683C3.4269 11.8681 1.31496 8.80299 0.687685 7.69638C0.548156 7.45022 0.548156 7.15738 0.687685 6.91122C1.31516 5.80438 3.42725 2.74053 7.58222 2.74033ZM7.58417 4.76865C6.18381 4.76865 5.04804 5.90442 5.04804 7.30478C5.04827 8.70494 6.18395 9.83994 7.58417 9.83994C8.98428 9.83981 10.1191 8.70486 10.1193 7.30478C10.1193 5.9045 8.98442 4.76877 7.58417 4.76865Z" fill="currentColor"/>
  </svg>
);

const MonthlyUsersIcon = () => (
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

const SubscriptionsIcon = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.44027 1.04506C6.6018 0.767734 7.00245 0.767734 7.16398 1.04506L8.87528 3.98319C8.93445 4.08478 9.0336 4.15682 9.14851 4.1817L12.4717 4.90131C12.7853 4.96924 12.9091 5.35028 12.6953 5.5896L10.4298 8.12508C10.3515 8.21275 10.3136 8.32931 10.3254 8.44628L10.6679 11.8291C10.7003 12.1485 10.3761 12.384 10.0824 12.2545L6.97099 10.8834C6.8634 10.836 6.74085 10.836 6.63326 10.8834L3.5218 12.2545C3.22811 12.3839 2.90398 12.1485 2.93631 11.8291L3.27882 8.44628C3.29067 8.32931 3.25279 8.21275 3.17446 8.12508L0.908959 5.5896C0.695118 5.35028 0.818924 4.96924 1.1326 4.90131L4.45574 4.1817C4.57064 4.15682 4.6698 4.08478 4.72897 3.98319L6.44027 1.04506Z" fill="currentColor"/>
  </svg>
);

const TrendUpIcon = () => (
  <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.98142 6.93915L7.31476 1.60581" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7.31476 6.63409V1.60581H2.28647" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Dashboard = () => {
  const stats = [
    {
      title: 'Pageviews',
      value: '1.5M',
      change: 12.5,
      icon: <PageviewsIcon />
    },
    {
      title: 'Monthly Users',
      value: '250K',
      change: 8.2,
      icon: <MonthlyUsersIcon />
    },
    {
      title: 'New Sign-ups',
      value: '1.2K',
      change: -3.8,
      icon: <SignupsIcon />
    },
    {
      title: 'Subscriptions',
      value: '348',
      change: 4.2,
      icon: <SubscriptionsIcon />
    }
  ];

  return (
    <div className="dashboard">
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-header">
              <span className="stat-icon">{stat.icon}</span>
              <span className="stat-title">{stat.title}</span>
            </div>
            <div className="stat-content">
              <span className="stat-value">{stat.value}</span>
              <span className={`stat-change ${stat.change >= 0 ? 'positive' : 'negative'}`}>
                <TrendUpIcon />
                {Math.abs(stat.change)}%
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="dashboard-content">
        <div className="main-section">
          <RevenueGraph />
        </div>
        <div className="side-section">
          <TotalProfit />
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 