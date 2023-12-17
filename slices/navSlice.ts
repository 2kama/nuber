import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { Point } from "react-native-google-places-autocomplete";

type locationType = {
    location: Point | undefined
    description: string
}

type NavStateType = {
    origin: null | locationType
    destination: null | locationType
    travelTimeInformation: null | any
}

const initialState: NavStateType = {
    origin: null,
    destination: null,
    travelTimeInformation: null,
}

export const navSlice = createSlice({
    name: 'nav',
    initialState,
    reducers: {
        setOrigin: (state, action: PayloadAction<locationType | null>) => {
            state.origin = action.payload;
        },
        setDestination: (state, action: PayloadAction<locationType | null>) => {
            state.destination = action.payload;
        },
        setTravelTimeInformation: (state, action: PayloadAction<any>) => {
            state.travelTimeInformation = action.payload;
        },
    }
});


export const { setOrigin, setDestination, setTravelTimeInformation } = navSlice.actions;

// Selectors
export const selectOrigin = (state: RootState) => state.nav.origin;
export const selectDestination = (state: RootState) => state.nav.destination;
export const selectTravelTimeInformation = (state: RootState) => state.nav.travelTimeInformation;

export default navSlice.reducer;


