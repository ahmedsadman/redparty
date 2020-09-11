import React from 'react';
import styled from 'styled-components';

function Messages(props) {
	return (
		<MessageContainer>
			<Message user='Jami'>Hello how are you?</Message>
			<Message user='Samyo'>I am fine thank you</Message>
		</MessageContainer>
	);
}

const Message = (props) => {
	const Container = styled.div`
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

	return (
		<Container>
			<User>{props.user}</User>
			<Text>{props.children}</Text>
		</Container>
	);
};

const MessageContainer = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
	padding: 5px;
	overflow-y: auto;
`;

export default Messages;
