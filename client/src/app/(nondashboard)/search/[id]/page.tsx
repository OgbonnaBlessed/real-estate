"use client";

import { useGetAuthUserQuery, useGetPropertyQuery } from "@/state/api";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ImagePreviews from "./ImagePreviews";
import PropertyOverview from "./PropertyOverview";
import PropertyDetails from "./PropertyDetails";
import PropertyLocation from "./PropertyLocation";
import ContactWidget from "./ContactWidget";
import ApplicationModal from "./ApplicationModal";
import Loading from "@/components/Loading";

const SingleListing = () => {
    const { id } = useParams();
    const propertyId = Number(id);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data: authUser } = useGetAuthUserQuery();
    const { data: property, isLoading } = useGetPropertyQuery(propertyId);
    const [showLoading, setShowLoading] = useState(true);

    // Ensure loading persists for at least 5 seconds
    useEffect(() => {
        if (isLoading) {
            setShowLoading(true);
        } else {
            const timer = setTimeout(() => setShowLoading(false), 5000);
            return () => clearTimeout(timer); // Cleanup on unmount
        }
    }, [isLoading]);

    if (showLoading) return <Loading />;

    return (
        <div>
            <ImagePreviews
                images={[property?.photoUrls[0], property?.photoUrls[1]]}
            />
            <div className="flex flex-col md:flex-row justify-center gap-10 mx-10 md:w-2/3 md:mx-auto mt-16 mb-8">
                <div className="order-2 md:order-1">
                    <PropertyOverview propertyId={propertyId} />
                    <PropertyDetails propertyId={propertyId} />
                    <PropertyLocation propertyId={propertyId} />
                </div>

                <div className="order-1 md:order-2">
                    <ContactWidget onOpenModal={() => setIsModalOpen(true)} />
                </div>
            </div>

            {authUser && (
                <ApplicationModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    propertyId={propertyId}
                />
            )}
        </div>
    );
};

export default SingleListing;