import React from 'react';
import styled from 'styled-components';
import { colors } from '../../config/colors';

const Footer = (props) => (
	<StyledFooter>
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
			}}
		>
			Crafted with&nbsp;
			<ion-icon
				name='heart-outline'
				style={{ color: colors.primaryColor, fontSize: '1.3em' }}
			></ion-icon>
			&nbsp;by&nbsp;
			<a
				href='https://github.com/ahmedsadman'
				target='_blank'
				rel='noopener noreferrer'
			>
				ahmedsadman
			</a>
			&nbsp;(Source at&nbsp;
			<a
				href='https://github.com/ahmedsadman/redparty'
				target='_blank'
				rel='noopener noreferrer'
			>
				<ion-icon
					name='logo-github'
					style={{ fontSize: '1.3em' }}
				></ion-icon>
				)
			</a>
		</div>
		<div>
			Logo by{' '}
			<a
				href='https://github.com/IshrakAbedin'
				target='_blank'
				rel='noopener noreferrer'
			>
				IshrakAbedin
			</a>
		</div>
	</StyledFooter>
);

const StyledFooter = styled.div`
	height: 45px;
	margin-top: -45px;
	display: flex;
	flex-direction: column;
	position: relative;
	flex: 1;
	align-items: center;
	justify-content: center;
	font-size: 0.9em;
	font-weight: 500;
	flex-wrap: wrap;
	padding: 0 5%;
	text-align: center;
`;

export default Footer;
