import { useState } from 'react';
import './Settings.scss';

interface UserInfo {
  fullName: string;
  email: string;
  photo: string;
  description: string;
}

interface NotificationSetting {
  id: string;
  title: string;
  inApp: boolean;
  email: boolean;
  tooltip?: string;
}

const Settings = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    fullName: 'John Carter',
    email: 'john@dashdark.com',
    photo: '',
    description: 'Write a short bio about you...'
  });

  const tooltipText = "Lorem ipsum dolor sit amet consectetur adipiscing. Lorem ipsum dolor sit amet consectetur adipiscing.";

  const [generalNotifications, setGeneralNotifications] = useState<NotificationSetting[]>([
    { id: 'mentioned', title: "I'm mentioned in a message", inApp: true, email: false, tooltip: tooltipText },
    { id: 'replies', title: 'Someone replies to any message', inApp: false, email: true, tooltip: tooltipText },
    { id: 'assigned', title: "I'm assigned a task", inApp: false, email: true, tooltip: tooltipText },
    { id: 'overdue', title: 'A task is overdue', inApp: true, email: false, tooltip: tooltipText },
  ]);

  const [summaryNotifications, setSummaryNotifications] = useState<NotificationSetting[]>([
    { id: 'daily', title: 'Daily summary', inApp: false, email: true, tooltip: tooltipText },
    { id: 'weekly', title: 'Weekly summary', inApp: true, email: false, tooltip: tooltipText },
    { id: 'monthly', title: 'Monthly summary', inApp: true, email: false, tooltip: tooltipText },
  ]);

  const handleInputChange = (field: keyof UserInfo, value: string) => {
    setUserInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationChange = (
    settingId: string, 
    type: 'inApp' | 'email', 
    isGeneral: boolean
  ) => {
    const updateSettings = (settings: NotificationSetting[]) =>
      settings.map(setting =>
        setting.id === settingId
          ? { ...setting, [type]: !setting[type] }
          : setting
      );

    if (isGeneral) {
      setGeneralNotifications(updateSettings(generalNotifications));
    } else {
      setSummaryNotifications(updateSettings(summaryNotifications));
    }
  };

  const handleSave = () => {
    console.log('Saving settings:', { userInfo });
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleInputChange('photo', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1>Settings</h1>
        {activeTab === 'personal' && (
          <button className="save-button" onClick={handleSave}>
            Save
          </button>
        )}
      </div>

      <div className="settings-content">
        <div className="settings-sidebar">
          <button 
            className={`tab-button ${activeTab === 'personal' ? 'active' : ''}`}
            onClick={() => setActiveTab('personal')}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 8C9.47333 8 10.6667 6.80667 10.6667 5.33333C10.6667 3.86 9.47333 2.66667 8 2.66667C6.52667 2.66667 5.33333 3.86 5.33333 5.33333C5.33333 6.80667 6.52667 8 8 8ZM8 9.33333C6.22 9.33333 2.66667 10.2267 2.66667 12V13.3333H13.3333V12C13.3333 10.2267 9.78 9.33333 8 9.33333Z" fill="currentColor"/>
            </svg>
            Personal Information
          </button>
          <button 
            className={`tab-button ${activeTab === 'notifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('notifications')}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 14.6667C8.73333 14.6667 9.33333 14.0667 9.33333 13.3333H6.66667C6.66667 14.0667 7.26667 14.6667 8 14.6667ZM12 10.6667V7.33333C12 5.28667 10.9133 3.57333 9 3.12V2.66667C9 2.11333 8.55333 1.66667 8 1.66667C7.44667 1.66667 7 2.11333 7 2.66667V3.12C5.08667 3.57333 4 5.28667 4 7.33333V10.6667L2.66667 12V12.6667H13.3333V12L12 10.6667ZM10.6667 11.3333H5.33333V7.33333C5.33333 5.68 6.34 4.33333 8 4.33333C9.66 4.33333 10.6667 5.68 10.6667 7.33333V11.3333Z" fill="currentColor"/>
            </svg>
            Notifications
          </button>
        </div>

        <div className="settings-main">
          {activeTab === 'personal' && (
            <>
              <div className="section-header">
                <h2>Personal Information</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipiscing.</p>
              </div>

              <div className="form-card">
                <div className="form-group">
                  <label>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 8C9.47333 8 10.6667 6.80667 10.6667 5.33333C10.6667 3.86 9.47333 2.66667 8 2.66667C6.52667 2.66667 5.33333 3.86 5.33333 5.33333C5.33333 6.80667 6.52667 8 8 8ZM8 9.33333C6.22 9.33333 2.66667 10.2267 2.66667 12V13.3333H13.3333V12C13.3333 10.2267 9.78 9.33333 8 9.33333Z" fill="currentColor"/>
                    </svg>
                    Full name
                  </label>
                  <div className="input-container">
                    <input
                      type="text"
                      value={userInfo.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.3333 2.66667H2.66667C1.93333 2.66667 1.34 3.26667 1.34 4L1.33333 12C1.33333 12.7333 1.93333 13.3333 2.66667 13.3333H13.3333C14.0667 13.3333 14.6667 12.7333 14.6667 12V4C14.6667 3.26667 14.0667 2.66667 13.3333 2.66667ZM13.3333 5.33333L8 8.66667L2.66667 5.33333V4L8 7.33333L13.3333 4V5.33333Z" fill="currentColor"/>
                    </svg>
                    Email address
                  </label>
                  <div className="input-container">
                    <input
                      type="email"
                      value={userInfo.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14 12.6667V3.33333C14 2.6 13.4 2 12.6667 2H3.33333C2.6 2 2 2.6 2 3.33333V12.6667C2 13.4 2.6 14 3.33333 14H12.6667C13.4 14 14 13.4 14 12.6667ZM5.66667 9L7.33333 11.0067L9.66667 8L12.6667 12H3.33333L5.66667 9Z" fill="currentColor"/>
                    </svg>
                    Photo
                  </label>
                  <div className="photo-upload">
                    <div className="upload-area">
                      {userInfo.photo ? (
                        <img src={userInfo.photo} alt="User" />
                      ) : (
                        <div className="upload-placeholder">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="currentColor"/>
                          </svg>
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        id="photo-upload"
                      />
                      <div className="upload-text">
                        <p>Click to upload</p>
                        <span>or drag and drop</span>
                        <span className="file-types">SVG, PNG, JPG or GIF (max. 800x400px)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14 7.33333H2V8.66667H14V7.33333ZM2 10.6667H10V12H2V10.6667ZM14 4H2V5.33333H14V4Z" fill="currentColor"/>
                    </svg>
                    Short description
                  </label>
                  <div className="input-container">
                    <textarea
                      value={userInfo.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Write a short bio about you..."
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'notifications' && (
            <>
              <div className="section-header">
                <h2>General notification</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipiscing.</p>
              </div>

              <div className="form-card">
                {generalNotifications.map(notification => (
                  <div key={notification.id} className="notification-item">
                    <div className="notification-info">
                      {notification.title}
                      <button 
                        className="info-button"
                        onMouseEnter={() => setShowTooltip(notification.id)}
                        onMouseLeave={() => setShowTooltip(null)}
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8 2C4.688 2 2 4.688 2 8C2 11.312 4.688 14 8 14C11.312 14 14 11.312 14 8C14 4.688 11.312 2 8 2ZM8.8 11.2H7.2V7.2H8.8V11.2ZM8.8 5.6H7.2V4H8.8V5.6Z" fill="currentColor"/>
                        </svg>
                        {showTooltip === notification.id && (
                          <div className="tooltip">
                            {notification.tooltip}
                          </div>
                        )}
                      </button>
                    </div>
                    <div className="notification-controls">
                      <button
                        className={`notification-button in-app-button ${notification.inApp ? 'selected' : ''}`}
                        onClick={() => handleNotificationChange(notification.id, 'inApp', true)}
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8 14.6667C8.73333 14.6667 9.33333 14.0667 9.33333 13.3333H6.66667C6.66667 14.0667 7.26667 14.6667 8 14.6667ZM12 10.6667V7.33333C12 5.28667 10.9133 3.57333 9 3.12V2.66667C9 2.11333 8.55333 1.66667 8 1.66667C7.44667 1.66667 7 2.11333 7 2.66667V3.12C5.08667 3.57333 4 5.28667 4 7.33333V10.6667L2.66667 12V12.6667H13.3333V12L12 10.6667ZM10.6667 11.3333H5.33333V7.33333C5.33333 5.68 6.34 4.33333 8 4.33333C9.66 4.33333 10.6667 5.68 10.6667 7.33333V11.3333Z" fill="currentColor"/>
                        </svg>
                        In-app
                      </button>
                      <button
                        className={`notification-button email-button ${notification.email ? 'selected' : ''}`}
                        onClick={() => handleNotificationChange(notification.id, 'email', true)}
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M13.3333 2.66667H2.66667C1.93333 2.66667 1.34 3.26667 1.34 4L1.33333 12C1.33333 12.7333 1.93333 13.3333 2.66667 13.3333H13.3333C14.0667 13.3333 14.6667 12.7333 14.6667 12V4C14.6667 3.26667 14.0667 2.66667 13.3333 2.66667ZM13.3333 5.33333L8 8.66667L2.66667 5.33333V4L8 7.33333L13.3333 4V5.33333Z" fill="currentColor"/>
                        </svg>
                        Email
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="section-header">
                <h2>Summary notification</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipiscing.</p>
              </div>

              <div className="form-card">
                {summaryNotifications.map(notification => (
                  <div key={notification.id} className="notification-item">
                    <div className="notification-info">
                      {notification.title}
                      <button 
                        className="info-button"
                        onMouseEnter={() => setShowTooltip(notification.id)}
                        onMouseLeave={() => setShowTooltip(null)}
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8 2C4.688 2 2 4.688 2 8C2 11.312 4.688 14 8 14C11.312 14 14 11.312 14 8C14 4.688 11.312 2 8 2ZM8.8 11.2H7.2V7.2H8.8V11.2ZM8.8 5.6H7.2V4H8.8V5.6Z" fill="currentColor"/>
                        </svg>
                        {showTooltip === notification.id && (
                          <div className="tooltip">
                            {notification.tooltip}
                          </div>
                        )}
                      </button>
                    </div>
                    <div className="notification-controls">
                      <button
                        className={`notification-button in-app-button ${notification.inApp ? 'selected' : ''}`}
                        onClick={() => handleNotificationChange(notification.id, 'inApp', false)}
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8 14.6667C8.73333 14.6667 9.33333 14.0667 9.33333 13.3333H6.66667C6.66667 14.0667 7.26667 14.6667 8 14.6667ZM12 10.6667V7.33333C12 5.28667 10.9133 3.57333 9 3.12V2.66667C9 2.11333 8.55333 1.66667 8 1.66667C7.44667 1.66667 7 2.11333 7 2.66667V3.12C5.08667 3.57333 4 5.28667 4 7.33333V10.6667L2.66667 12V12.6667H13.3333V12L12 10.6667ZM10.6667 11.3333H5.33333V7.33333C5.33333 5.68 6.34 4.33333 8 4.33333C9.66 4.33333 10.6667 5.68 10.6667 7.33333V11.3333Z" fill="currentColor"/>
                        </svg>
                        In-app
                      </button>
                      <button
                        className={`notification-button email-button ${notification.email ? 'selected' : ''}`}
                        onClick={() => handleNotificationChange(notification.id, 'email', false)}
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M13.3333 2.66667H2.66667C1.93333 2.66667 1.34 3.26667 1.34 4L1.33333 12C1.33333 12.7333 1.93333 13.3333 2.66667 13.3333H13.3333C14.0667 13.3333 14.6667 12.7333 14.6667 12V4C14.6667 3.26667 14.0667 2.66667 13.3333 2.66667ZM13.3333 5.33333L8 8.66667L2.66667 5.33333V4L8 7.33333L13.3333 4V5.33333Z" fill="currentColor"/>
                        </svg>
                        Email
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings; 