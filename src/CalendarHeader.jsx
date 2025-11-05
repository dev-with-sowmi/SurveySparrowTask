import React from "react";

export default function CalendarHeader({ currentDate, onPrev, onNext }) {
  return (
    <div className="flex justify-between items-center mb-4">
      <button onClick={onPrev} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">←</button>
      <h2 className="text-xl font-semibold">{currentDate.format("MMMM YYYY")}</h2>
      <button onClick={onNext} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">→</button>
    </div>
  );
}
