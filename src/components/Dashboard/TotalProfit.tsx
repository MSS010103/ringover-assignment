import React from 'react';
import './TotalProfit.scss';

const TotalProfit = () => {
  return (
    <div className="total-profit">
      <div className="total-profit-header">
        <div className="header-content">
          <div className="title-row">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 2.25C9.0675 2.25 10.62 4.545 11.085 5.37C11.19 5.55 11.19 5.775 11.085 5.955C10.62 6.78 9.0675 9.075 6 9.075C2.9325 9.075 1.38 6.78 0.915 5.955C0.81 5.775 0.81 5.55 0.915 5.37C1.38 4.545 2.9325 2.25 6 2.25ZM6 3.75C4.965 3.75 4.125 4.59 4.125 5.625C4.125 6.66 4.965 7.5 6 7.5C7.035 7.5 7.875 6.66 7.875 5.625C7.875 4.59 7.035 3.75 6 3.75Z" fill="#AEB9E1"/>
            </svg>
            <span>Total profit</span>
          </div>
          <div className="value-row">
            <span className="amount">$144.6K</span>
            <span className="change">+28.5%</span>
          </div>
        </div>
      </div>
      
      <div className="graph-container">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Background grid */}
          <line x1="0" y1="25" x2="100" y2="25" stroke="#0B1739" strokeWidth="0.5" strokeDasharray="1 1"/>
          <line x1="0" y1="50" x2="100" y2="50" stroke="#0B1739" strokeWidth="0.5" strokeDasharray="1 1"/>
          <line x1="0" y1="75" x2="100" y2="75" stroke="#0B1739" strokeWidth="0.5" strokeDasharray="1 1"/>
          
          {/* Vertical grid lines */}
          <line x1="25" y1="0" x2="25" y2="75" stroke="#0B1739" strokeWidth="0.5" strokeDasharray="1 1"/>
          <line x1="50" y1="0" x2="50" y2="75" stroke="#0B1739" strokeWidth="0.5" strokeDasharray="1 1"/>
          <line x1="75" y1="0" x2="75" y2="75" stroke="#0B1739" strokeWidth="0.5" strokeDasharray="1 1"/>

          {/* Sample bars */}
          <rect x="10" y="30" width="3" height="45" fill="#CB3CFF"/>
          <rect x="15" y="40" width="3" height="35" fill="#00C2FF"/>
          <rect x="30" y="20" width="3" height="55" fill="#CB3CFF"/>
          <rect x="35" y="35" width="3" height="40" fill="#00C2FF"/>
          <rect x="50" y="25" width="3" height="50" fill="#CB3CFF"/>
          <rect x="55" y="45" width="3" height="30" fill="#00C2FF"/>
          <rect x="70" y="15" width="3" height="60" fill="#CB3CFF"/>
          <rect x="75" y="30" width="3" height="45" fill="#00C2FF"/>
          <rect x="90" y="20" width="3" height="55" fill="#CB3CFF"/>
          <rect x="95" y="40" width="3" height="35" fill="#00C2FF"/>

          {/* Month labels */}
          <text x="5" y="95" fill="#AEB9E1" fontSize="4">Jan</text>
          <text x="35" y="95" fill="#AEB9E1" fontSize="4">Apr</text>
          <text x="65" y="95" fill="#AEB9E1" fontSize="4">Jul</text>
          <text x="90" y="95" fill="#AEB9E1" fontSize="4">Oct</text>
        </svg>
      </div>
    </div>
  );
};

export default TotalProfit; 