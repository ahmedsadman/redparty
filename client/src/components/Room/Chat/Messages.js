import React from 'react';
import styled from 'styled-components';

function Messages(props) {
	return (
		<MessagesContainer>
			<Message user='Jami'>Hello how are you?</Message>
			<Message user='Samyo'>I am fine thank you</Message>
		</MessagesContainer>
	);
}

const Message = (props) => {
	return (
		<MessageContainer>
			<User>{props.user}</User>
			<Text>{props.children}</Text>
		</MessageContainer>
	);
};

const MessagesContainer = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
	padding: 5px;
	overflow-y: auto;
`;

const MessageContainer = styled.div`
	display: flex;
	flex-direction: column;
	font-size: 0.9em;
	margin-bottom: 10px;
`;

const User = styled.div`
	font-weight: 800;
	font-size: 0.85em;
`;

const Text = styled.p`
	margin: 0;
	padding: 0;
	font-weight: 500;
	font-size: 0.9em;
`;

export default Messages;
