import React from 'react';
import { format, addDays, subDays } from 'date-fns';

interface CalendarHeaderProps {
    selectedDate: Date;
    onDateChange: (date: Date) => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
    selectedDate,
    onDateChange,
}) => {
    return (
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 flex justify-between items-center">
            <button onClick={() => onDateChange(subDays(selectedDate, window.innerWidth < 768 ? 1 : 7))}>
                &lt;
            </button>
            <h2 className="text-2xl font-semibold">
                {format(selectedDate, 'MMMM yyyy')}
            </h2>
            <button onClick={() => onDateChange(addDays(selectedDate, window.innerWidth < 768 ? 1 : 7))}>
                &gt;
            </button>
        </div>
    );
};

export default CalendarHeader;