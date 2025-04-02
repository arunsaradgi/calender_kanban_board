import React from 'react';
import { format, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Event, EventsByDate } from '@/types/types';
import EventCard from './EventCard';

interface CalendarWeekProps {
    selectedDate: Date;
    events: EventsByDate;
    onEventDrop: (eventId: string, sourceDate: string, destinationDate: string) => void;
}

const CalendarWeek: React.FC<CalendarWeekProps> = ({ selectedDate, events, onEventDrop }) => {
    const start = startOfWeek(selectedDate, { weekStartsOn: 1 });
    const end = endOfWeek(selectedDate, { weekStartsOn: 1 });
    const weekDays = eachDayOfInterval({ start, end });

    const handleDragEnd = (result: DropResult) => {
        const { source, destination } = result;

        if (!destination) {
            return;
        }

        if (source.droppableId !== destination.droppableId) {
            const eventId = result.draggableId;
            const sourceDate = source.droppableId;
            const destinationDate = destination.droppableId;
            onEventDrop(eventId, sourceDate, destinationDate);
        }
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div className="grid grid-cols-7 gap-1 p-4">
                {weekDays?.map((day) => {
                    const dayString = format(day, 'yyyy-MM-dd');
                    const eventsForDay: Event[] = events[dayString] || [];

                    return (
                        <Droppable droppableId={dayString} key={day.toISOString()}>
                            {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className="rounded p-2 min-h-[100px]" 
                                >
                                    <div className='bg-gradient-to-r from-blue-500 to-purple-600 text-white m-1 p-2 rounded'>
                                        <h4 className="text-center font-semibold">{format(day, 'E')}</h4>
                                        <p className="text-center text-sm">{format(day, 'd')}</p>
                                    </div>
                                    {eventsForDay.map((event, index) => (
                                        <Draggable key={event.id} draggableId={event.id} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <EventCard key={event.id} event={event} />
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    );
                })}
            </div>
        </DragDropContext>
    );
};

export default CalendarWeek;