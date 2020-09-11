import React from 'react';
import styled from 'styled-components';

const Centered = (props) => <StyledCentered>{props.children}</StyledCentered>;

const StyledCentered = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

export default Centered;
