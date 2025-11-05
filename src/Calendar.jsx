import React, { useState } from "react";
import dayjs from "dayjs";
import events from "./events.json";
import "./Calendar.css";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedDay, setSelectedDay] = useState(null);

  const today = dayjs();

  // Dropdown data
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const years = [];
  for (let y = 1990; y <= 2030; y++) years.push(y);

  const [selectedMonth, setSelectedMonth] = useState(currentDate.month());
  const [selectedYear, setSelectedYear] = useState(currentDate.year());

  const handleGoClick = () => {
    const newDate = dayjs(new Date(selectedYear, selectedMonth, 1));
    setCurrentDate(newDate);
  };

  // Calendar generation
  const daysInMonth = currentDate.daysInMonth();
  const firstDayOfMonth = currentDate.startOf("month").day();

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    days.push(dayjs(new Date(currentDate.year(), currentDate.month(), d)));
  }

  const getEvents = (date) =>
    events.filter((e) => dayjs(e.date).isSame(date, "day"));

  const handleDayClick = (day) => {
    if (!day) return;
    setSelectedDay((prev) =>
      prev && prev.isSame(day, "day") ? null : day
    );
  };

  return (
    <div className="calendar-container">
      {/* Header */}
      <div className="calendar-header">
        <button onClick={() => setCurrentDate(currentDate.subtract(1, "month"))}>
          ◀
        </button>

        <h2>{currentDate.format("MMMM YYYY")}</h2>

        <button onClick={() => setCurrentDate(currentDate.add(1, "month"))}>
          ▶
        </button>
      </div>

      {/* Month & Year selector */}
      <div className="calendar-selector">
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(Number(e.target.value))}
        >
          {months.map((month, index) => (
            <option key={index} value={index}>
              {month}
            </option>
          ))}
        </select>

        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <button onClick={handleGoClick} className="go-btn">
          Go
        </button>
      </div>

      {/* Calendar grid */}
      <div className="calendar-grid">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="day-name">
            {day}
          </div>
        ))}

        {days.map((day, i) => {
          const isToday = day && day.isSame(today, "day");
          const isSelected = selectedDay && day && day.isSame(selectedDay, "day");

          return (
            <div
              key={i}
              className={`day-cell ${isToday ? "today" : ""} ${
                isSelected ? "selected" : ""
              }`}
              onClick={() => handleDayClick(day)}
            >
              {day && (
                <>
                  <div className="date">{day.date()}</div>
                  <div className="events">
                    {getEvents(day).map((e, idx) => (
                      <div key={idx} className="event">
                        {e.title}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
