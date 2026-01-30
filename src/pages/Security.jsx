import "./security.css";

const Security = () => {
  return (
    <div className="security-page">
      <div className="security-header">
        <h1>Security</h1>
        <p>Protect your account and monitor activity</p>
      </div>

      {/* Password Card */}
      <div className="security-card">
        <h2>🔐 Change Password</h2>

        <div className="input-grid">
          <input type="password" placeholder="Current password" />
          <input type="password" placeholder="New password" />
          <input type="password" placeholder="Confirm new password" />
        </div>

        <button className="primary-btn">Update Password</button>
      </div>

      {/* 2FA */}
      <div className="security-card highlight">
        <h2>🛡 Two-Factor Authentication</h2>
        <p>
          Enable OTP verification for enhanced security.
        </p>

        <button className="secondary-btn">Enable 2FA</button>
      </div>

      {/* Sessions */}
      <div className="security-card">
        <h2>💻 Active Sessions</h2>

        <div className="session-row">
          <span>Windows · Chrome</span>
          <span className="status">Active</span>
        </div>

        <button className="danger-btn">
          Logout from all devices
        </button>
      </div>

      {/* Login History */}
      <div className="security-card">
        <h2>📊 Login Activity</h2>

        <table className="login-table">
          <thead>
            <tr>
              <th>Device</th>
              <th>Browser</th>
              <th>IP</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Windows</td>
              <td>Chrome</td>
              <td>192.168.1.2</td>
              <td>30 Jan 2026</td>
            </tr>
            <tr>
              <td>Android</td>
              <td>Edge</td>
              <td>192.168.1.8</td>
              <td>29 Jan 2026</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Security;
