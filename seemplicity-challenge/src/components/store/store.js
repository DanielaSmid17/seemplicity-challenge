import { configureStore } from "@reduxjs/toolkit";
import ticketModalReducer from "./slices/ticketModalSlice";

export const store = configureStore({
    reducer: {
        ticketModal: ticketModalReducer,
    }
});
