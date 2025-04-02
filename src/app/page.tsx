'use client'

import Image from "next/image";
import CalendarHeader from "./components/CalendarHeader";
import { useState } from "react";

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  return (
    <div className="relative w-full max-w-4xl mx-auto shadow-xl rounded-lg">
      <CalendarHeader selectedDate={selectedDate} onDateChange={setSelectedDate} />
    </div>


  );
}
