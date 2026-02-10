import { useEffect, useState } from "react";
import axios from "axios";

export default function StaffList({ salonId }) {
  const [staff, setStaff] = useState([]);

  const fetchStaff = async () => {
    const res = await axios.get(
      `http://localhost:5001/api/staff/salon/${salonId}`
    );
    setStaff(res.data);
  };

  useEffect(() => {
    fetchStaff();
  }, [salonId]);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Staff Members</h2>

      <div className="grid gap-4">
        {staff.map((s) => (
          <div key={s._id} className="bg-gray-100 p-4 rounded">
            <p className="font-semibold">{s.name}</p>
            <p className="text-sm">{s.role}</p>
            <p className="text-sm">{s.contact}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
