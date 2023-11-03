import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setNotificationMessage(state, action) {
      return action.payload;
    },
    clearNotifcationMessage() {
      return "";
    },
  },
});

export const { setNotificationMessage, clearNotifcationMessage } =
  notificationSlice.actions;
export default notificationSlice.reducer;
