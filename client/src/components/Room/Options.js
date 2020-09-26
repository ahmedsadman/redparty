import React from 'react';
import styled from 'styled-components';
import { colors } from '../../config/colors';

const Options = (props) => {
	return (
		<OptionsContainer>
			<OptionButton
				icon='videocam'
				title='Change to another YouTube video'
				onClick={props.onVideoChange}
			>
				Change Video
			</OptionButton>
			<OptionButton
				icon='share-social'
				title='Invite friends to join this room'
				onClick={props.onInvite}
			>
				Invite Friends
			</OptionButton>
			<OptionButton
				icon='person-circle'
				title='Allow only host to control the video'
				onClick={props.alertNotImplemented}
			>
				Host Only
			</OptionButton>
		</OptionsContainer>
	);
};

const OptionButton = ({ children, icon, ...props }) => {
	return (
		<StyledOptionButton {...props}>
			<ion-icon name={icon} style={{ fontSize: '1.8em' }}></ion-icon>
			&nbsp;{children}
		</StyledOptionButton>
	);
};

const OptionsContainer = styled.div`
	height: 30px;
	width: 100%;
	display: flex;
	flex: 1;
	flex-direction: row;
	justify-content: space-around;
	margin-top: 30px;
	padding: 0px;
	box-shadow: 2px 2px 3px #eee;
	box-sizing: border-box;
	border-radius: 5px;
`;

const StyledOptionButton = styled.button`
	margin: 0;
	padding: 0 15px;
	background-color: ${colors.accentColor};
	color: white;
	border-radius: 5px;
	margin-right: 3px;
	display: flex;
	flex: 1;
	justify-content: center;
	align-items: center;
	font-size: 0.65em;
	font-weight: 500;
	text-align: center;
	outline: none;
	border: none;
	font-family: inherit;
	transition: all 0.3s;
	cursor: pointer;

	&:hover {
		background-color: ${colors.primaryColor};
		font-size: 0.7em;
	}

	&:last-child {
		margin-right: 0;
	}
`;

export default Options;
