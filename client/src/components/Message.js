import { useEffect, useState } from "react";
import { Transition } from "semantic-ui-react";
import { useSelector } from "react-redux";
import "./Message.css";

const CustomMessage = () => {
  const message = useSelector((store) => store.message);
  const [shouldDisplayMessage, setShouldDisplayMessage] = useState(false);

  useEffect(() => {
    if (message.message) {
      setShouldDisplayMessage(true);
      setTimeout(() => setShouldDisplayMessage(false), 3000);
    } else {
      setShouldDisplayMessage(false);
    }
  }, [message]);

  return (
    <Transition visible={shouldDisplayMessage} animation="scale" duration={500}>
      <div className="msg-container">
        <div className="msg-box" style={{ backgroundColor: message.color }}>
          <p className="msg-text"> {message.message} </p>
        </div>
      </div>
    </Transition>
  );
};

export default CustomMessage;
