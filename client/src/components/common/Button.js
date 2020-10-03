import React from 'react';
import styled from 'styled-components';
import { spinAnimation } from './Spinner';
import { colors } from '../../config/colors';

export const Button = ({ children, isLoading, ...props }) => (
	<StyledButton {...props} isLoading={isLoading}>
		{isLoading ? (
			<Loading>
				<ion-icon
					name='refresh-circle-outline'
					style={{ fontSize: '1.1em' }}
				></ion-icon>
			</Loading>
		) : null}
		{children}
	</StyledButton>
);

const Loading = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	animation: ${spinAnimation} 2s linear infinite;
`;

const StyledButton = styled.button`
	border-radius: 5px;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 6px;
	min-width: 90px;
	outline: none;
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
		opacity: 0.8;
	}

	${(props) => props.loading && 'opacity: 0.8'}
`;
