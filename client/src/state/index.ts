import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FiltersState {
  location: string;
  beds: string;
  baths: string;
  propertyType: string;
  amenities: string[];
  availableFrom: string;
  priceRange: [number, number] | [null, null];
  squareFeet: [number, number] | [null, null];
  coordinates: [number, number];
}

interface InitialStateTypes {
  filters: FiltersState;
  isFiltersFullOpen: boolean;
  viewMode: "grid" | "list";
  isListingsOpen: boolean;
}

export const initialState: InitialStateTypes = {
  filters: {
    location: "Los Angeles",
    beds: "any",
    baths: "any",
    propertyType: "any",
    amenities: [],
    availableFrom: "any",
    priceRange: [null, null],
    squareFeet: [null, null],
    coordinates: [-118.25, 34.05],
  },
  isFiltersFullOpen: false,
  viewMode: "grid",
  isListingsOpen: false,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<FiltersState>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    toggleFiltersFullOpen: (state) => {
      state.isFiltersFullOpen = !state.isFiltersFullOpen;
    },
    closeFiltersFull: (state) => {
      state.isFiltersFullOpen = false;
    },
    setViewMode: (state, action: PayloadAction<"grid" | "list">) => {
      state.viewMode = action.payload;
    },
    toggleListings: (state) => {
      state.isListingsOpen = !state.isListingsOpen;
    },
    openListings: (state) => {
      state.isListingsOpen = true;
    },
    closeListings: (state) => {
      state.isListingsOpen = false;
    }
  },
});

export const { setFilters, toggleFiltersFullOpen, closeFiltersFull, setViewMode, toggleListings, openListings, closeListings } =
  globalSlice.actions;

export default globalSlice.reducer;