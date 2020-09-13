import React, { useEffect } from 'react';
import styled from 'styled-components';

function Messages(props) {
	let messageEnd = null;
	const { messages } = props;

	const scrollToBottom = () => {
		if (messageEnd) {
			messageEnd.scrollIntoView({ behavior: 'smooth' });
		}
	};

	useEffect(() => scrollToBottom(), [messages]);

	return (
		<MessagesContainer>
			{messages.map((message) => (
				<Message user={message.from} key={message.id}>
					{message.text}
				</Message>
			))}
			<div className='dummy' ref={(el) => (messageEnd = el)}></div>
		</MessagesContainer>
	);
}

const Message = (props) => {
	return props.user !== null ? (
		<MessageContainer>
			<User>{props.user}</User>
			<Text>{props.children}</Text>
		</MessageContainer>
	) : (
		<MessageContainer adminMessage>
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

	${({ adminMessage }) =>
		adminMessage && { 'text-align': 'center', color: 'gray' }}
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
