import React from "react";
import dayjs from "dayjs";

export default function CalendarGrid({ currentDate, events }) {
  const startOfMonth = currentDate.startOf("month");
  const endOfMonth = currentDate.endOf("month");
  const startDay = startOfMonth.day(); // 0 (Sun) - 6 (Sat)
  const daysInMonth = currentDate.daysInMonth();

  const today = dayjs();

  // Build a full grid including previous/next month days to fill weeks
  const days = [];

  // previous month days to fill leading empty slots
  const prevMonth = currentDate.subtract(1, "month");
  const prevMonthDays = prevMonth.daysInMonth();
  for (let i = startDay - 1; i >= 0; i--) {
    days.push(dayjs(new Date(prevMonth.year(), prevMonth.month(), prevMonthDays - i)));
  }

  // current month days
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(dayjs(new Date(currentDate.year(), currentDate.month(), i)));
  }

  // next month days to fill trailing slots so total % 7 === 0
  const nextMonth = currentDate.add(1, "month");
  let nextDay = 1;
  while (days.length % 7 !== 0) {
    days.push(dayjs(new Date(nextMonth.year(), nextMonth.month(), nextDay++)));
  }

  const getEventsForDate = (date) => events.filter((e) => dayjs(e.date).isSame(date, "day"));

  return (
    <div className="grid grid-cols-7 gap-2">
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
        <div key={d} className="font-semibold text-center text-gray-600 py-1">
          {d}
        </div>
      ))}

      {days.map((day, index) => {
        const isToday = day.isSame(today, "day");
        const isCurrentMonth = day.month() === currentDate.month();
        return (
          <div
            key={index}
            className={`h-28 border rounded p-2 overflow-y-auto transition-shadow hover:shadow-lg ${
              isToday ? "ring-2 ring-blue-300 bg-blue-50" : isCurrentMonth ? "bg-white" : "bg-gray-50"
            }`}
          >
            <div className={`${isCurrentMonth ? "text-sm font-medium text-gray-800" : "text-sm text-gray-400"}`}>
              {day.date()}
            </div>

            <div className="mt-2 space-y-1">
              {getEventsForDate(day).map((event, i) => (
                <div key={i} className="inline-block text-xs px-2 py-0.5 rounded-full bg-blue-500 text-white">
                  {event.title}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
