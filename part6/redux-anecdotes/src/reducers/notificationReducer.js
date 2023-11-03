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

export const setNotification = (message, time) => {
  return (dispatch) => {
    dispatch(setNotificationMessage(message));
    setTimeout(() => {
      dispatch(clearNotifcationMessage());
    }, time * 1000);
  };
};

export default notificationSlice.reducer;
