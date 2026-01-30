import React from 'react';

const AppointmentRow = ({ name, time, date, type }: any) => (
    <div className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors rounded-lg px-2">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-primary font-bold text-lg">
                {name.charAt(0)}
            </div>
            <div>
                <p className="font-semibold text-gray-900 text-sm">{name}</p>
                <p className="text-xs text-gray-500">{type}</p>
            </div>
        </div>
        <div className="text-right">
            <p className="text-sm font-medium text-gray-900">{time}</p>
            <p className="text-xs text-gray-500">{date}</p>
        </div>
    </div>
);

export default AppointmentRow;