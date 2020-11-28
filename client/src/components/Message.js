import { useEffect, useState } from 'react';
import { Message } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
//import './ErrorMessage.css';

const CustomMessage = () => {
	const message = useSelector(store => store.message);
  const [shouldDisplayMessage, setShouldDisplayMessage] = useState(false);

  useEffect(() => {
    if(message.message){
      setShouldDisplayMessage(true);
      setTimeout(() => setShouldDisplayMessage(false),3000)
    }else{
      setShouldDisplayMessage(false);
    }
  }, [ message ])

	return(
		<div>
		{ shouldDisplayMessage && (<Message color={message.color} >
			<Message.Header>
			<div style={{ textAlign: 'right' }}>
				{ message.message }
			</div>
			</Message.Header>
		</Message>) }
		</div>
	)
}

export default CustomMessage;