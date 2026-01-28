import React from 'react';

const ScheduleItem = ({ time, title, color }: any) => (
  <div className="flex gap-3 items-start">
    <div className="text-xs text-gray-500 min-w-[60px] pt-1">{time}</div>
    <div className="flex-1 py-2 px-3 rounded-md border-l-4" style={{ backgroundColor: `${color}`, borderColor: color }}>
      <p className="text-sm font-semibold text-gray-700 m-0">{title}</p>
    </div>
  </div>
);

export default ScheduleItem;