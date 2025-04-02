"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Event } from "@/types/types";

interface EventCardProps {
    event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleEventClick = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };


    return (
        <>
            <motion.div
                className="bg-white rounded-lg shadow-md p-3 mb-2 cursor-pointer"
                onClick={handleEventClick}
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

            <AnimatePresence>
                {isPopupOpen && (
                    <motion.div
                        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClosePopup}
                    >
                        <motion.div
                            className="bg-white rounded-xl p-6 shadow-2xl w-full max-w-md"
                            initial={{ scale: 0.8, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0, y: 50 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <motion.img
                                src={event.imageUrl}
                                alt={event.title}
                                className="w-full h-48 object-cover rounded-lg mb-5"
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                transition={{ duration: 0.4 }}
                            />
                            <h3 className="text-2xl font-bold mb-5 text-gray-800">{event.title}</h3>
                            <p className="text-gray-700 leading-relaxed">{event.description}</p>
                            <p className="mt-3 text-sm text-gray-500">Time: {event.time}</p>
                            <motion.button
                                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg block w-full"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleClosePopup}
                            >
                                Close
                            </motion.button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default EventCard;
