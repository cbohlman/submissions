import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "test",
  reducers: {
    changeNotificationMessage(state, action) {
      return action.payload;
    },
  },
});

export const { changeNotificationMessage } = notificationSlice.actions;
export default notificationSlice.reducer;
