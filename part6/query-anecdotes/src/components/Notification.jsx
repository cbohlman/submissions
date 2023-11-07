import { useContext } from "react";
import MessageContext from "../MessageContext";

const Notification = () => {
  const [message, messageDispatch] = useContext(MessageContext);
  console.log(message);
  const visibleStyle = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  const hiddenStyle = {
    visibility: "hidden",
  };

  const style = message === "" ? hiddenStyle : visibleStyle;

  return <div style={style}>{message}</div>;
};

export default Notification;
