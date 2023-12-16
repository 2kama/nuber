import { createSlice } from "@reduxjs/toolkit";

type NavStateType = {
    origin: null | string
    destination: null | string
    travelTimeInformation: null | string
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
        setOrigin: (state, action) => {
            state.origin = action.payload;
        },
        setDestination: (state, action) => {
            state.destination = action.payload;
        },
        setTravelTimeInformation: (state, action) => {
            state.travelTimeInformation = action.payload;
        },
    }
});


export const { setOrigin, setDestination, setTravelTimeInformation } = navSlice.actions;

// Selectors
export const selectOrigin = (state: { nav: NavStateType }) => state.nav.origin;
export const selectDestination = (state: { nav: NavStateType }) => state.nav.destination;
export const selectTravelTimeInformation = (state: { nav: NavStateType }) => state.nav.travelTimeInformation;

export default navSlice.reducer;


