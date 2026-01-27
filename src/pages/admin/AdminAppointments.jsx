import "../../styles/adminAppointments.css";

const AdminAppointments = () => {
  const appointmentsData = [
    {
      id: 1,
      name: "Sarah Williams",
      address: "456 Oak Avenue, Los Angeles, CA",
      contact: "(555) 234-5678",
      date: "January 28, 2026",
      notes: "Follow-up consultation needed"
    },
    {
      id: 2,
      name: "Michael Johnson",
      address: "789 Pine Road, Chicago, IL",
      contact: "(555) 345-6789",
      date: "January 29, 2026",
      notes: "Initial assessment appointment"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      address: "321 Elm Street, Houston, TX",
      contact: "(555) 456-7890",
      date: "January 30, 2026",
      notes: "Quarterly review meeting"
    },
    {
      id: 4,
      name: "David Brown",
      address: "654 Maple Drive, Phoenix, AZ",
      contact: "(555) 567-8901",
      date: "January 31, 2026",
      notes: "Contract renewal discussion"
    },
    {
      id: 5,
      name: "Jessica Martinez",
      address: "987 Cedar Lane, Philadelphia, PA",
      contact: "(555) 678-9012",
      date: "February 1, 2026",
      notes: "Service upgrade consultation"
    },
    {
      id: 6,
      name: "Robert Taylor",
      address: "147 Birch Court, San Antonio, TX",
      contact: "(555) 789-0123",
      date: "February 2, 2026",
      notes: "Technical support session"
    },
    {
      id: 7,
      name: "Lisa Anderson",
      address: "258 Spruce Way, San Diego, CA",
      contact: "(555) 890-1234",
      date: "February 3, 2026",
      notes: "Project planning meeting"
    },
    {
      id: 8,
      name: "James Wilson",
      address: "369 Ash Boulevard, Dallas, TX",
      contact: "(555) 901-2345",
      date: "February 4, 2026",
      notes: "Annual performance review"
    },
    {
      id: 9,
      name: "Amanda Davis",
      address: "741 Walnut Street, Austin, TX",
      contact: "(555) 012-3456",
      date: "February 5, 2026",
      notes: "Training session for new features"
    },
    {
      id: 10,
      name: "Christopher Lee",
      address: "852 Laurel Avenue, Jacksonville, FL",
      contact: "(555) 123-4567",
      date: "February 6, 2026",
      notes: "Post-service feedback call"
    }
  ];

  return (
    <div className="appointments-container">
      <div className="appointments-header">
        <h1>Appointments</h1>
        <button className="add-appointment-btn">+ New Appointment</button>
      </div>

      <div className="appointments-table-wrapper">
        <table className="appointments-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Address</th>
              <th>Contact Info</th>
              <th>Appointment Date</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {appointmentsData.map((appointment) => (
              <tr key={appointment.id}>
                <td>#{appointment.id}</td>
                <td>{appointment.name}</td>
                <td>{appointment.address}</td>
                <td>{appointment.contact}</td>
                <td>{appointment.date}</td>
                <td>{appointment.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAppointments;
