'use client'

import CalendarHeader from "./components/CalendarHeader";
import { useEffect, useState } from "react";
import CalendarWeek from "./components/CalendarWeek";
import { events as initialEvents } from "@/utils/eventData";
import { EventsByDate, Event } from "@/types/types";
import CalendarDay from "./components/CalendarDay";

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState<EventsByDate>(initialEvents);
  const [isMobile, setIsMobile] = useState(false);


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getEventsForDate = (date: Date): Event[] => {
    const dateString = date.toISOString().split('T')[0];
    return events[dateString] || []
  };

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

  const handleDateChange = (newDate: Date) => {
    setSelectedDate(newDate);
  };

  return (
    <main>

      <div className="relative w-full max-w-4xl mx-auto shadow-xl rounded-lg overflow-hidden">
        <CalendarHeader selectedDate={selectedDate} onDateChange={setSelectedDate} />
        {isMobile ? (
          <CalendarDay
            selectedDate={selectedDate}
            events={getEventsForDate(selectedDate)}
            onEventDrop={handleEventDrop}
            onDateChange={handleDateChange} // Pass handleDateChange
          />
        ) : (
          <CalendarWeek
            selectedDate={selectedDate}
            events={events}
            onEventDrop={handleEventDrop}
          />
        )}
      </div>
    </main>


  );
}
