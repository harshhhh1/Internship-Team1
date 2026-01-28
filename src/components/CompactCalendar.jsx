import { useState } from "react";

const CompactCalendar = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthName = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);

  return (
    <div className="pure-calendar">
      {/* Header */}
      <div className="calendar-header">
        {monthName}
      </div>

      {/* Week Days */}
      <div className="calendar-week">
        {["S", "M", "T", "W", "T", "F", "S"].map(day => (
          <span key={day}>{day}</span>
        ))}
      </div>

      {/* Dates */}
      <div className="calendar-grid">
        {days.map((day, index) => (
          <span
            key={index}
            className={
              day === today.getDate() &&
              month === today.getMonth() &&
              year === today.getFullYear()
                ? "calendar-day today"
                : "calendar-day"
            }
          >
            {day}
          </span>
        ))}
      </div>
    </div>
  );
};

export default CompactCalendar;
