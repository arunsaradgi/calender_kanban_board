"use client";

import React, { useRef } from "react";
import { format, addDays, startOfWeek, eachDayOfInterval } from "date-fns";
import { Event } from "@/types/types";
import EventCard from "./EventCard";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";

interface CalendarDayProps {
    selectedDate: Date;
    events: Event[];
    onEventDrop: (eventId: string, sourceDate: string, destinationDate: string) => void;
    onDateChange: (newDate: Date) => void;
}

const CalendarDay: React.FC<CalendarDayProps> = ({ selectedDate, events, onEventDrop, onDateChange }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const touchStartX = useRef<number>(0);
    const touchEndX = useRef<number>(0);

    const handleDragEnd = (result: DropResult) => {
        const { destination } = result;
        if (!destination) return;

        const eventId = result.draggableId;
        const sourceDate = format(selectedDate, "yyyy-MM-dd");
        const destinationDate = format(selectedDate, "yyyy-MM-dd");
        onEventDrop(eventId, sourceDate, destinationDate);
    };

    const sortedEvents = [...events].sort((a, b) => {
        return new Date(`2000-01-01 ${a.time}`).getTime() - new Date(`2000-01-01 ${b.time}`).getTime();
    });

    const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 });
    const weekDays = eachDayOfInterval({ start: weekStart, end: addDays(weekStart, 6) });


    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        touchEndX.current = e.changedTouches[0].clientX;
        const swipeDistance = touchStartX.current - touchEndX.current;

        if (swipeDistance > 50) {
            onDateChange(addDays(selectedDate, 1));
        } else if (swipeDistance < -50) {
            onDateChange(subDays(selectedDate, 1));
        }
    };

    return (
        <div
            className="p-4 min-h-screen"
            ref={containerRef}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <div className="flex gap-1 justify-between mb-4">
                {weekDays.map((day) => (
                    <button
                        key={day.toString()}
                        className={`bg-gradient-to-r from-blue-500 to-purple-600 px-2 py-1 rounded-md text-sm ${format(day, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-black"
                            }`}
                        onClick={() => onDateChange(day)}
                    >
                        {format(day, "EEE d")}
                    </button>
                ))}
            </div>
            <h3 className="text-xl font-bold mb-2">{format(selectedDate, "dd MMMM yyyy")}</h3>

            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId={format(selectedDate, "yyyy-MM-dd")}>
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                            {sortedEvents.map((event, index) => (
                                <Draggable key={event.id} draggableId={event.id} index={index}>
                                    {(provided) => (
                                        <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                            <EventCard key={event.id} event={event} />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
};

export default CalendarDay;
