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
	font-family: inherit;
	text-shadow: ${(props) => (props.secondary ? '1px 1px 2px #eee' : 'none')};
	color: white;
	font-family: inherit;
	font-weight: ${(props) => (props.secondary ? 500 : 800)};
	font-size: 1.2em;
	margin: 0 2px;
	border: 1px solid ${colors.accentColor};
	background-color: ${(props) =>
		props.secondary ? 'transparent' : colors.accentColor};
	box-shadow: 2px 2px 5px #ccc;
	color: ${(props) => (props.secondary ? colors.accentColor : 'white')};
	cursor: pointer;
	transition: all 0.3s;

	&:hover {
		opacity: 0.9;
	}
`;
