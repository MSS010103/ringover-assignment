import type { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import './Layout.scss';

// SVG Icons as components
const DashboardIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 6.33355C0 5.91283 0.181487 5.51216 0.498755 5.23244L6.01055 0.372996C6.57464 -0.124332 7.42536 -0.124332 7.98945 0.372995L13.5012 5.23244C13.8185 5.51216 14 5.91283 14 6.33355V12.5259C14 13.34 13.3337 14 12.5118 14H1.4882C0.666291 14 0 13.34 0 12.5259V6.33355Z" fill="currentColor"/>
  </svg>
);

const ProductsIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.57785 0.561451C6.7663 0.237899 7.23373 0.237898 7.42218 0.56145L9.4187 3.98926C9.48773 4.10778 9.60341 4.19183 9.73746 4.22086L13.6145 5.06041C13.9804 5.13965 14.1249 5.5842 13.8754 5.86341L11.2323 8.82146C11.1409 8.92375 11.0967 9.05973 11.1105 9.1962L11.5101 13.1429C11.5479 13.5154 11.1697 13.7902 10.8271 13.6392L7.19702 12.0395C7.07151 11.9842 6.92852 11.9842 6.80301 12.0395L3.17297 13.6392C2.83033 13.7902 2.45218 13.5154 2.4899 13.1429L2.8895 9.1962C2.90331 9.05973 2.85913 8.92375 2.76774 8.82146L0.124656 5.86341C-0.124825 5.5842 0.0196157 5.13965 0.385566 5.06041L4.26257 4.22086C4.39662 4.19183 4.5123 4.10778 4.58133 3.98926L6.57785 0.561451Z" fill="currentColor"/>
  </svg>
);

const SettingsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.14 12.94C19.18 12.64 19.2 12.33 19.2 12C19.2 11.68 19.18 11.36 19.14 11.06L21.16 9.48C21.34 9.34 21.39 9.07 21.28 8.87L19.36 5.55C19.24 5.33 18.99 5.26 18.77 5.33L16.38 6.29C15.88 5.91 15.35 5.59 14.76 5.35L14.4 2.81C14.36 2.57 14.16 2.4 13.92 2.4H10.08C9.84 2.4 9.65 2.57 9.61 2.81L9.25 5.35C8.66 5.59 8.12 5.91 7.63 6.29L5.24 5.33C5.02 5.26 4.77 5.33 4.65 5.55L2.74 8.87C2.62 9.07 2.66 9.34 2.86 9.48L4.88 11.06C4.84 11.36 4.8 11.69 4.8 12C4.8 12.31 4.82 12.64 4.86 12.94L2.84 14.52C2.66 14.66 2.61 14.93 2.72 15.13L4.64 18.45C4.76 18.67 5.01 18.74 5.23 18.67L7.62 17.71C8.12 18.09 8.65 18.41 9.24 18.65L9.6 21.19C9.65 21.43 9.84 21.6 10.08 21.6H13.92C14.16 21.6 14.36 21.43 14.39 21.19L14.75 18.65C15.34 18.41 15.88 18.09 16.37 17.71L18.76 18.67C18.98 18.74 19.23 18.67 19.35 18.45L21.27 15.13C21.39 14.91 21.34 14.66 21.15 14.52L19.14 12.94ZM12 15.6C10.02 15.6 8.4 13.98 8.4 12C8.4 10.02 10.02 8.4 12 8.4C13.98 8.4 15.6 10.02 15.6 12C15.6 13.98 13.98 15.6 12 15.6Z" fill="currentColor"/>
  </svg>
);

const ChevronIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [avatarError, setAvatarError] = useState(false);

  return (
    <div className="layout">
      <nav className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
        <div className="logo">
          <div className="logo-icon">
            <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.72269 17.3394C8.72269 17.7981 9.095 18.1703 9.55374 18.1704H17.4463V26.063C17.4461 26.5216 17.0739 26.8931 16.6153 26.8931H8.72269C3.90531 26.8928 0.000110404 22.9878 3.05176e-05 18.1704C3.05176e-05 13.5033 3.66533 9.69201 8.27444 9.4585L8.72269 9.44678V17.3394ZM17.4463 0.724121C22.2638 0.724179 26.1687 4.62939 26.169 9.44678C26.169 14.1137 22.5043 17.9248 17.8955 18.1587L17.4463 18.1704V10.2778C17.4463 9.81907 17.074 9.44678 16.6153 9.44678H8.72269V1.55518C8.72269 1.09641 9.095 0.724211 9.55374 0.724121H17.4463Z" fill="#CB3CFF"/>
              <path d="M9.4603 0.724121C9.05318 0.724121 8.72314 1.05416 8.72314 1.46128L8.72314 9.4472H16.7091C17.1162 9.4472 17.4462 9.77723 17.4462 10.1844L17.4462 18.1703C22.2638 18.1703 26.1693 14.2648 26.1693 9.4472C26.1693 4.62957 22.2638 0.724121 17.4462 0.724121H9.4603Z" fill="#00C2FF"/>
            </svg>
          </div>
          {!isCollapsed && (
            <>
              Dashdark X
              <button className="chevron-icon" onClick={() => setIsCollapsed(true)}>
                <ChevronIcon />
              </button>
            </>
          )}
          {isCollapsed && (
            <button className="chevron-icon" onClick={() => setIsCollapsed(false)}>
              <ChevronIcon />
            </button>
          )}
        </div>
        <ul className="nav-links">
          <li>
            <NavLink to="/" end>
              <DashboardIcon />
              {!isCollapsed && 'Dashboard'}
            </NavLink>
          </li>
          <li>
            <NavLink to="/products">
              <ProductsIcon />
              {!isCollapsed && 'Product List'}
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings">
              <SettingsIcon />
              {!isCollapsed && 'Settings'}
            </NavLink>
          </li>
        </ul>
        
        <div className="user-profile">
          {!avatarError ? (
            <img 
              src="/john.png" 
              alt="John Carter" 
              className="user-avatar" 
              onError={() => setAvatarError(true)}
            />
          ) : (
            <div className="user-avatar-fallback">JC</div>
          )}
          {!isCollapsed && (
            <>
              <span className="user-name">John Carter</span>
              <button className="chevron-right">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 4L10 8L6 12" stroke="#AEB9E1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </>
          )}
        </div>
      </nav>
      <main className={`main-content ${isCollapsed ? 'expanded' : ''}`}>
        {children}
      </main>
    </div>
  );
};

export default Layout; 