import "./RevenueReportPro.css";

const doctors = [
  { id: 1, name: "Dr. Rahul Sharma", status: "Active", cases: 320, salary: "₹12,00,000" },
  { id: 2, name: "Dr. Anjali Mehta", status: "On Leave", cases: 210, salary: "₹9,50,000" },
  { id: 3, name: "Dr. Aman Verma", status: "Inactive", cases: 180, salary: "₹8,20,000" },
  { id: 4, name: "Dr. Sneha Patil", status: "Active", cases: 402, salary: "₹14,00,000" },
  { id: 5, name: "Dr. Rakesh Nair", status: "Active", cases: 298, salary: "₹11,80,000" },
  { id: 6, name: "Dr. Pooja Singh", status: "On Leave", cases: 165, salary: "₹7,90,000" },
  { id: 7, name: "Dr. Arjun Kapoor", status: "Active", cases: 510, salary: "₹18,00,000" },
  { id: 8, name: "Dr. Kavita Joshi", status: "Inactive", cases: 120, salary: "₹6,40,000" },
  { id: 9, name: "Dr. Mohit Jain", status: "Active", cases: 356, salary: "₹13,50,000" },
  { id: 10, name: "Dr. Neha Kulkarni", status: "Active", cases: 289, salary: "₹10,20,000" },
  { id: 11, name: "Dr. Sameer Khan", status: "On Leave", cases: 198, salary: "₹8,90,000" },
];

export default function RevenueReport() {
  return (
    <div className="rev-container">
      <h1 className="rev-title">Revenue & Report</h1>

      {/* STATS */}
      <div className="rev-stats">
        <StatCard title="Revenue This Month" value="₹5,00,000" trend="↑ 12%" />
        <StatCard title="Total Income" value="₹12,50,000" trend="↑ 8%" />
        <StatCard title="Patients" value="11,000" trend="↑ 4%" />
      </div>

      {/* FILTER BAR */}
      <div className="filter-bar">
        <input placeholder="Search doctor..." />
        <input type="date" />
        <input type="time" />
        <select>
          <option>All Status</option>
          <option>Active</option>
          <option>On Leave</option>
          <option>Inactive</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="table-card">
        <h2>Doctor List</h2>
        <table>
          <thead>
            <tr>
              <th>Sr No</th>
              <th>Name</th>
              <th>Status</th>
              <th>Total Cases</th>
              <th>Annual Salary</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((d) => (
              <tr key={d.id}>
                <td>{d.id}</td>
                <td>{d.name}</td>
                <td className={`status ${d.status.replace(" ", "").toLowerCase()}`}>
                  {d.status}
                </td>
                <td>{d.cases}</td>
                <td>{d.salary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatCard({ title, value, trend }) {
  return (
    <div className="stat-card">
      <p>{title}</p>
      <h2>{value}</h2>
      <span>{trend}</span>
      <div className="mini-graph">
        <div style={{ height: "40%" }}></div>
        <div style={{ height: "70%" }}></div>
        <div style={{ height: "55%" }}></div>
        <div style={{ height: "85%" }}></div>
        <div style={{ height: "60%" }}></div>
      </div>
    </div>
  );
}





