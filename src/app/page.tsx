'use client'

import CalendarHeader from "./components/CalendarHeader";
import { useState } from "react";
import CalendarWeek from "./components/CalendarWeek";
import { events as initialEvents } from "@/utils/eventData";
import { EventsByDate } from "@/types/types";

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState<EventsByDate>(initialEvents)

  const handleEventDrop = (eventId: string, sourceDate: string, destinationDate: string) => {

    setEvents(prevEvents => {
      const newEvents = { ...prevEvents };

      //Remove
      const movedEvent = newEvents[sourceDate]?.find(event => event.id === eventId);
      newEvents[sourceDate] = newEvents[sourceDate]?.filter(event => event.id !== eventId) || [];

      // Add 
      if (movedEvent) {
        console.log(movedEvent)
        newEvents[destinationDate] = [...(newEvents[destinationDate] || []), movedEvent];
      }

      return newEvents;
    })

  }

  return (
    <main>

      <div className="relative w-full max-w-4xl mx-auto shadow-xl rounded-lg overflow-hidden">
        <CalendarHeader selectedDate={selectedDate} onDateChange={setSelectedDate} />
        <CalendarWeek
          selectedDate={selectedDate}
          events={events}
          onEventDrop={handleEventDrop}
        />
      </div>
    </main>


  );
}
