import {
    useAddFavoritePropertyMutation,
    useGetAuthUserQuery,
    useGetPropertiesQuery,
    useGetTenantQuery,
    useRemoveFavoritePropertyMutation,
} from "@/state/api";
import { useAppSelector } from "@/state/redux";
import { Property } from "@/types/prismaTypes";
import Card from "@/components/Card";
import React from "react";
import CardCompact from "@/components/CardCompact";
import Loading from "@/components/Loading";
import { ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { closeListings } from "@/state";
import { useDispatch } from "react-redux";
  
const Listings = () => {
    const { data: authUser } = useGetAuthUserQuery();
    const dispatch = useDispatch();
    const { data: tenant } = useGetTenantQuery(
        authUser?.cognitoInfo?.userId || "",
        {
            skip: !authUser?.cognitoInfo?.userId,
        }
    );
    const [addFavorite] = useAddFavoritePropertyMutation();
    const [removeFavorite] = useRemoveFavoritePropertyMutation();
    const viewMode = useAppSelector((state) => state.global.viewMode);
    const filters = useAppSelector((state) => state.global.filters);
    const isListingOpen = useAppSelector((state) => state.global.isListingsOpen);
  
    const {
      data: properties,
      isError,
    } = useGetPropertiesQuery(filters);
  
    const handleFavoriteToggle = async (propertyId: number) => {
        if (!authUser) return;
    
        const isFavorite = tenant?.favorites?.some(
            (fav: Property) => fav.id === propertyId
        );
    
        if (isFavorite) {
            await removeFavorite({
            cognitoId: authUser.cognitoInfo.userId,
            propertyId,
            });
        } else {
            await addFavorite({
                cognitoId: authUser.cognitoInfo.userId,
                propertyId,
            });
        }
    };
    
    if (isError) return <div>Failed to fetch properties</div>;
  
    return (
        <AnimatePresence>
            {isListingOpen && (
                <motion.div 
                    key="listings"
                    initial={{ opacity: 0, x: "100%" }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: "100%" }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute right-0 max-w-full w-md h-full bg-white overflow-y-auto z-10"
                >
                    <div className="flex justify-between items-center sticky -top-1 z-20 p-4 bg-white shadow-md">
                        <ChevronRight 
                            className="p-1 cursor-pointer"
                            onClick={() => dispatch(closeListings())}
                        />
                        <h3 className="text-sm px-4 font-bold">
                            {properties?.length}{" "}
                            <span className="text-gray-700 font-normal">
                                Places in {filters.location}
                            </span>
                        </h3>
                    </div>
                    <div className="flex">
                        <div className="p-4 w-full">
                            {properties?.map((property) =>
                                viewMode === "grid" ? (
                                    <Card
                                        key={property.id}
                                        property={property}
                                        isFavorite={
                                            tenant?.favorites?.some(
                                            (fav: Property) => fav.id === property.id
                                            ) || false
                                        }
                                        onFavoriteToggle={() => handleFavoriteToggle(property.id)}
                                        showFavoriteButton={!!authUser}
                                        propertyLink={`/search/${property.id}`}
                                    />
                                ) : (
                                    <CardCompact
                                        key={property.id}
                                        property={property}
                                        isFavorite={
                                            tenant?.favorites?.some(
                                            (fav: Property) => fav.id === property.id
                                            ) || false
                                        }
                                        onFavoriteToggle={() => handleFavoriteToggle(property.id)}
                                        showFavoriteButton={!!authUser}
                                        propertyLink={`/search/${property.id}`}
                                    />
                                )
                            )}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Listings;