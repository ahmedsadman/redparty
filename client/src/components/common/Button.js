import React from 'react';
import styled from 'styled-components';
import { colors } from '../../config/colors';

export const Button = ({ children, ...props }) => (
	<StyledButton {...props}>{children}</StyledButton>
);

const StyledButton = styled.button`
	border-radius: 5px;
	padding: 6px;
	min-width: 90px;
	outline: none;
	text-align: center;
	color: white;
	font-family: inherit;
	font-weight: 500;
	font-size: 1em;
	margin: 0 2px;
	border: 1px solid ${colors.accentColor};
	background-color: transparent;
	box-shadow: 1px 1px 2px #ddd;
	color: ${colors.accentColor};
	cursor: pointer;
`;
