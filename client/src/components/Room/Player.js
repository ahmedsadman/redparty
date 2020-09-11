import React from 'react';
import styled from 'styled-components';

function Player() {
	return <StyledPlayer />;
}

const StyledPlayer = styled.div`
	margin-top: 30px;
	background-color: gray;
	width: 100%;
	height: 500px;
`;

export default Player;
