import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import Participants from './Participants';
import Messages from './Messages';
import { Input } from '../../common/FormControls';
import { Button } from '../../common';
import { UserContext } from '../../../contexts/UserContext';
import { colors } from '../../../config/colors';

function Chat(props) {
	const { socket } = props;
	const { userData } = useContext(UserContext);
	const [message, setMessage] = useState('');

	const onMessageSend = (evt) => {
		evt.preventDefault();
		socket.emit('createMessage', message);
		console.log('message sent', message);
		setMessage('');
	};

	const onMessageChange = (evt) => {
		setMessage(evt.target.value);
	};

	return (
		<StyledChat>
			<Participants users={userData.userList} />
			<Messages messages={userData.messages} />
			<MessageSend onSubmit={onMessageSend}>
				<Input
					type='text'
					placeholder='Send a message!'
					style={{ fontSize: '0.8em', fontWeight: 500 }}
					value={message}
					onChange={onMessageChange}
					required
				/>
				<Button type='submit' style={sendButtonStyle}>
					<ion-icon
						name='paper-plane'
						style={{ fontSize: '1.2em' }}
					></ion-icon>
				</Button>
			</MessageSend>
		</StyledChat>
	);
}

const StyledChat = styled.div`
	background-color: #fff;
	display: flex;
	flex-direction: column;
	height: 465px;
	margin-top: 5px;
	border-radius: 5px;
	border: 1px solid #ddd;
	box-shadow: 3px 3px 5px #eee;
	padding: 10px;
	box-sizing: border-box;
`;

const sendButtonStyle = {
	minWidth: 0,
	padding: '0 20px',
	backgroundColor: colors.primaryColor,
};

const MessageSend = styled.form`
	display: flex;
	flex-direction: row;
`;

export default Chat;
