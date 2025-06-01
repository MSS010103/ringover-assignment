import { useState } from 'react';
import './Profile.scss';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  company: string;
  position: string;
}

const initialProfile: UserProfile = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  address: "123 Main St, New York, NY 10001",
  company: "Tech Corp",
  position: "Senior Developer"
};

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile>(initialProfile);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedProfile(profile);
  };

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedProfile(profile);
  };

  return (
    <div className="profile">
      <h1>Profile</h1>

      <div className="profile-card">
        {isEditing ? (
          <div className="profile-edit">
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                value={editedProfile.firstName}
                onChange={(e) => setEditedProfile({ ...editedProfile, firstName: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                value={editedProfile.lastName}
                onChange={(e) => setEditedProfile({ ...editedProfile, lastName: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={editedProfile.email}
                onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                value={editedProfile.phone}
                onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                value={editedProfile.address}
                onChange={(e) => setEditedProfile({ ...editedProfile, address: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Company</label>
              <input
                type="text"
                value={editedProfile.company}
                onChange={(e) => setEditedProfile({ ...editedProfile, company: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Position</label>
              <input
                type="text"
                value={editedProfile.position}
                onChange={(e) => setEditedProfile({ ...editedProfile, position: e.target.value })}
              />
            </div>
            <div className="actions">
              <button onClick={handleSave}>Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        ) : (
          <div className="profile-view">
            <div className="profile-header">
              <h2>{profile.firstName} {profile.lastName}</h2>
              <button onClick={handleEdit}>Edit Profile</button>
            </div>
            <div className="profile-details">
              <div className="detail-group">
                <label>Email</label>
                <p>{profile.email}</p>
              </div>
              <div className="detail-group">
                <label>Phone</label>
                <p>{profile.phone}</p>
              </div>
              <div className="detail-group">
                <label>Address</label>
                <p>{profile.address}</p>
              </div>
              <div className="detail-group">
                <label>Company</label>
                <p>{profile.company}</p>
              </div>
              <div className="detail-group">
                <label>Position</label>
                <p>{profile.position}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile; 