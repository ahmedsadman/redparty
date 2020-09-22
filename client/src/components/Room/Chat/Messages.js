import React, { useEffect, createRef } from 'react';
import styled from 'styled-components';

function Messages(props) {
	let messageEnd = createRef();
	let messagesContainer = createRef();
	const { messages } = props;

	const scrollToBottom = () => {
		if (!messagesContainer.current || !messageEnd.current) return;

		const {
			clientHeight,
			scrollTop,
			scrollHeight,
		} = messagesContainer.current;

		// totalMessage >= 1 always, because we have a dummy div as a permanent children
		const totalMessage = messagesContainer.current.children.length;

		const newMessage = messagesContainer.current.children[totalMessage - 2];
		const lastMessage =
			totalMessage > 2
				? messagesContainer.current.children[totalMessage - 3]
				: null;

		if (!newMessage || !lastMessage) return;

		const newMessageHeight = newMessage.clientHeight;
		const lastMessageHeight = lastMessage.clientHeight;

		// -15 for error margin
		if (
			clientHeight + scrollTop + newMessageHeight + lastMessageHeight >=
			scrollHeight - 15
		) {
			messageEnd.current.scrollIntoView({ behavior: 'smooth' });
		}
	};

	useEffect(scrollToBottom, [messages]);

	return (
		<MessagesContainer ref={messagesContainer}>
			{messages.map((message) => (
				<Message user={message.from} key={message.id}>
					{message.text}
				</Message>
			))}
			<div className='dummy' ref={messageEnd}></div>
		</MessagesContainer>
	);
}

const Message = (props) => {
	return props.user !== null ? (
		<MessageContainer className={props.className}>
			<User>{props.user}</User>
			<Text>{props.children}</Text>
		</MessageContainer>
	) : (
		<MessageContainer adminMessage className={props.className}>
			<Text>{props.children}</Text>
		</MessageContainer>
	);
};

const MessagesContainer = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
	padding: 5px;
	box-sizing: border-box;
	overflow-y: auto;
`;

const MessageContainer = styled.div`
	display: flex;
	flex-direction: column;
	font-size: 0.9em;
	margin-bottom: 10px;
	box-sizing: border-box;

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
