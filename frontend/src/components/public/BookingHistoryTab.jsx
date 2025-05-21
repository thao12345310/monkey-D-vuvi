import { useState } from "react";

export default function BookingHistoryTabs({ onTypeChange, isLoading }) {
  const [selected, setSelected] = useState("ship");

  const handleClick = (type) => {
    setSelected(type);
    onTypeChange(type);
  };

  return (
    <div className="flex">
      <button
        className={`px-4 py-2 border ${selected === "ship" ? "bg-gray-200 font-bold" : ""}`}
        onClick={() => handleClick("ship")}
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
