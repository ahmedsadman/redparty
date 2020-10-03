import React from 'react';
import styled, { keyframes } from 'styled-components';
import { colors } from '../../config/colors';

export const spinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Spinner = (props) => (
	<SpinnerContainer>
		<StyledSpinner />
	</SpinnerContainer>
);

const StyledSpinner = styled.div`
	border: 16px solid #f3f3f3; /* Light grey */
	border-top: 16px solid ${colors.primaryColor}; /* Blue */
	border-radius: 50%;
	width: 120px;
	height: 120px;
	animation: ${spinAnimation} 2s linear infinite;
`;

const SpinnerContainer = styled.div`
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
`;
