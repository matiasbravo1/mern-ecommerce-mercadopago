import { Message } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
//import './ErrorMessage.css';

const CustomMessage = () => {
	const message = useSelector(store => store.message);

	return(
		<Message color={message.color} >
			<Message.Header>
			<div style={{ textAlign: 'right' }}>
				{ message.message }
			</div>
			</Message.Header>
		</Message>
	)
}

export default CustomMessage;