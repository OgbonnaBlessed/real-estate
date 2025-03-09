"use client";

import { NAVBAR_HEIGHT } from "@/lib/constants";
import { useAppDispatch, useAppSelector } from "@/state/redux";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { cleanParams } from "@/lib/utils";
import { setFilters } from "@/state";
import FiltersBar from "./FiltersBar";
import FiltersFull from "./FiltersFull";
import Map from "./Map";
import Listings from "./Listings";

const SearchPageContent = () => {
    const searchParams = useSearchParams();
    const dispatch = useAppDispatch();
    const isFiltersFullOpen = useAppSelector(
        (state) => state.global.isFiltersFullOpen
    );

    useEffect(() => {
        const initialFilters = Array.from(searchParams.entries()).reduce(
            (acc: any, [key, value]) => {
                if (key === "priceRange" || key === "squareFeet") {
                    acc[key] = value.split(",").map((v) => (v === "" ? null : Number(v)));
                } else if (key === "coordinates") {
                    acc[key] = value.split(",").map(Number);
                } else {
                    acc[key] = value === "any" ? null : value;
                }
                return acc;
            },
            {}
        );

        const cleanedFilters = cleanParams(initialFilters);
        dispatch(setFilters(cleanedFilters));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div
            className="w-full mx-auto px-5 flex flex-col"
            style={{
                height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
            }}
        >
            <FiltersBar />
            <div className="flex justify-between flex-1 overflow-hidden gap-3 mb-5">
                <FiltersFull />
                <Map />
                <Listings />
            </div>
        </div>
    );
};

export default SearchPageContent;