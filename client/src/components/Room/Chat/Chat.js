import React from 'react';
import styled from 'styled-components';

function Chat() {
	return <StyledChat />;
}

const StyledChat = styled.div`
	background-color: gray;
	display: flex;
	flex-direction: row;
	height: 500px;
	margin-top: 30px;
`;

export default Chat;
