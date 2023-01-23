import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isTicketModalOpen: false,
    info: null,
    idx: null,
};
const ticketModalSlice = createSlice({
    name: 'ticketModal',
    initialState,
    reducers: {
        openTicketModal(state, actions) {
            state.isTicketModalOpen = true;
            state.info = actions.payload.row;
            state.idx = actions.payload.i;
        },
        closeTicketModal(state) {
            state.isTicketModalOpen = false;
            state.info = null;
            state.idx = null;
        }
    }
});
export const { openTicketModal, closeTicketModal } = ticketModalSlice.actions;
export default ticketModalSlice.reducer;
