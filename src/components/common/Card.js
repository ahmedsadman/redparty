import React from 'react';
import styled from 'styled-components';

export const Card = (props) => (
	<StyledCard {...props}>{props.children}</StyledCard>
);

const StyledCard = styled.div`
	padding: ${(props) => props.padding || 0};
	border: 1px solid black;
	box-shadow: 2px 2px 3px gray;
	width: ${(props) => props.width || 'auto'};
	height: ${(props) => props.height || 'auto'};
`;
