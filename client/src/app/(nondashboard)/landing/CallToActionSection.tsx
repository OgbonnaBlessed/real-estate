"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const CallToActionSection = () => {
    return (
        <div className="relative py-24">
            <Image
                src="https://images.pexels.com/photos/6316067/pexels-photo-6316067.jpeg?auto=compress&cs=tinysrgb&w=1800"
                alt="Rentiful Search Section Background"
                fill
                className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/60"></div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative max-w-4xl xl:max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 py-12"
            >
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-6 md:mb-0 md:mr-10">
                        <h2 className="text-2xl font-bold text-white">
                        Find Your Dream Rental Property
                        </h2>
                    </div>
                    <div>
                        <p className="text-white mb-3">
                            Discover a wide range of rental properties in your desired
                            location.
                        </p>
                        <div className="flex justify-center md:justify-start gap-4">
                            <Link
                                href="/search"
                                className="inline-block text-(--primary-700) bg-white rounded-lg px-6 py-3 font-semibold hover:bg-(--primary-500) hover:text-(--primary-50) transition-all duration-300"
                            >
                                Search
                            </Link>
                            <Link
                                href="/signup"
                                className="inline-block text-white bg-(--primary-500) rounded-lg px-6 py-3 font-semibold hover:bg-(--secondary-600) transition-all duration-300"
                                scroll={false}
                            >
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default CallToActionSection;