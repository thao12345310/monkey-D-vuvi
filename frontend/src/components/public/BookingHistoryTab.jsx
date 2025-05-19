import { useState } from "react";

export default function BookingHistoryTabs({ onTypeChange }) {
  const [selected, setSelected] = useState("cruise");

  const handleClick = (type) => {
    setSelected(type);
    onTypeChange(type);
  };

  return (
    <div className="flex">
      <button
        className={`px-4 py-2 border ${selected === "cruise" ? "bg-gray-200 font-bold" : ""}`}
        onClick={() => handleClick("cruise")}
      >
        Du thuyền
      </button>
      <button
        className={`px-4 py-2 border ${selected === "hotel" ? "bg-gray-200 font-bold" : ""}`}
        onClick={() => handleClick("hotel")}
      >
        Khách sạn
      </button>
    </div>
  );
}
