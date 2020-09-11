import React from 'react';
import styled from 'styled-components';
import Participants from './Participants';
import Messages from './Messages';
import { Input } from '../../common/FormControls';
import { Button } from '../../common';

function Chat() {
	return (
		<StyledChat>
			<Participants />
			<Messages />
			<MessageSend>
				<Input
					type='text'
					placeholder='Send a message!'
					style={{ fontSize: '0.8em', fontWeight: 500 }}
				/>
				<Button style={{ fontSize: '0.8em' }}>Send</Button>
			</MessageSend>
		</StyledChat>
	);
}

const StyledChat = styled.div`
	background-color: #fff;
	display: flex;
	flex-direction: column;
	height: 500px;
	margin-top: 30px;
	border-radius: 5px;
	border: 1px solid #ddd;
	box-shadow: 3px 3px 5px #eee;
	padding: 10px;
	box-sizing: border-box;
`;

const MessageSend = styled.div`
	display: flex;
	padding-top: 10px;
	flex-direction: row;
	margin: 5px 0;
`;

export default Chat;
