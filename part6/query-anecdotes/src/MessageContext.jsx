import { createContext } from "react";
import { useReducer } from "react";

const messageReducer = (state, action) => {
  switch (action.type) {
    case "SET_MESSAGE":
      return action.payload;
    case "CLEAR_MESSAGE":
      return "";
  }
};

const MessageContext = createContext();

export const MessageContextProvider = (props) => {
  const [message, messageDispatch] = useReducer(messageReducer, "");

  return (
    <MessageContext.Provider value={[message, messageDispatch]}>
      {props.children}
    </MessageContext.Provider>
  );
};

export default MessageContext;
