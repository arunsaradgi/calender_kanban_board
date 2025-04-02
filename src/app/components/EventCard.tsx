"use client";

import React from "react";
import { motion } from "framer-motion";
import { Event } from "@/types/types";

interface EventCardProps {
    event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
    return (
        <>
            <motion.div
                className="bg-white rounded-lg shadow-md p-3 mb-2 cursor-pointer"
            >
                <motion.img
                    src={event.imageUrl}
                    alt={event.title}
                    className="w-full h-24 object-cover rounded-md mb-2"
                    whileHover={{ scale: 1.1 }}
                />
                <h5 className="font-semibold text-black">{event.title}</h5>
                <p className="text-sm text-gray-600">{event.time}</p>
            </motion.div>
        </>
    );
};

export default EventCard;
