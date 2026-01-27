import "../../styles/adminDash.css";

const AdminDash = () => {
  const dashboardStats = [
    {
      id: 1,
      title: "Today's Profit",
      value: "$2,450",
      icon: "💰",
      color: "green"
    },
    {
      id: 2,
      title: "Weekly Profit",
      value: "$14,320",
      icon: "📈",
      color: "blue"
    },
    {
      id: 3,
      title: "Monthly Profit",
      value: "$58,900",
      icon: "💵",
      color: "purple"
    },
    {
      id: 4,
      title: "Total Appointments",
      value: "48",
      icon: "📅",
      color: "orange"
    },
    {
      id: 5,
      title: "Completed Today",
      value: "12",
      icon: "✅",
      color: "teal"
    },
    {
      id: 6,
      title: "Pending Tasks",
      value: "5",
      icon: "⏳",
      color: "red"
    }
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome back! Here's your business summary.</p>
      </div>

      <div className="dashboard-grid">
        {dashboardStats.map((stat) => (
          <div key={stat.id} className={`stat-card ${stat.color}`}>
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-content">
              <h3>{stat.title}</h3>
              <p className="stat-value">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-sections">
        <div className="section-box">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <button className="action-btn">📋 Create New Appointment</button>
            <button className="action-btn">👥 View All Clients</button>
            <button className="action-btn">📊 Generate Report</button>
            <button className="action-btn">📢 Send Message</button>
          </div>
        </div>

        <div className="section-box">
          <h2>Recent Activity</h2>
          <ul className="activity-list">
            <li>
              <span className="activity-badge">New</span>
              Appointment scheduled with Sarah Williams
            </li>
            <li>
              <span className="activity-badge">Update</span>
              Profile updated successfully
            </li>
            <li>
              <span className="activity-badge">Complete</span>
              Monthly report generated
            </li>
            <li>
              <span className="activity-badge">New</span>
              3 new appointments pending review
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDash;
