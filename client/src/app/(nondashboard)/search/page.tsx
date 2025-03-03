"use client";

import { Suspense } from "react";
import SearchPageContent from "./SearchPageContent";

const SearchPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SearchPageContent />
        </Suspense>
    );
};

export default SearchPage;