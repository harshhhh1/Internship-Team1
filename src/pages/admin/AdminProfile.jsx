import "../../styles/adminProfile.css";

const AdminProfile = () => {
  const profileData = {
    name: "John Doe",
    gender: "Male",
    dateOfBirth: "January 15, 1990",
    address: "123 Business Street, New York, NY 10001",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    joinDate: "January 2024",
    department: "Administration"
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Profile Information</h1>
      </div>

      <div className="profile-card">
        <div className="profile-section">
          <div className="profile-avatar">
            <span>JD</span>
          </div>
          <div className="profile-main">
            <h2>{profileData.name}</h2>
            <p className="department">{profileData.department}</p>
          </div>
        </div>

        <div className="profile-details">
          <div className="detail-row">
            <div className="detail-item">
              <label>Name</label>
              <p>{profileData.name}</p>
            </div>
            <div className="detail-item">
              <label>Gender</label>
              <p>{profileData.gender}</p>
            </div>
          </div>

          <div className="detail-row">
            <div className="detail-item">
              <label>Date of Birth</label>
              <p>{profileData.dateOfBirth}</p>
            </div>
            <div className="detail-item">
              <label>Join Date</label>
              <p>{profileData.joinDate}</p>
            </div>
          </div>

          <div className="detail-row">
            <div className="detail-item">
              <label>Email</label>
              <p>{profileData.email}</p>
            </div>
            <div className="detail-item">
              <label>Phone</label>
              <p>{profileData.phone}</p>
            </div>
          </div>

          <div className="detail-row full-width">
            <div className="detail-item">
              <label>Address</label>
              <p>{profileData.address}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
