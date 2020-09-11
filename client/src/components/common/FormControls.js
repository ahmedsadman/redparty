import React from 'react';
import styled from 'styled-components';

export const Label = ({ children, ...props }) => (
	<StyledLabel {...props}>{children}</StyledLabel>
);

export const Input = (props) => <StyledInput {...props} />;

const StyledLabel = styled.label`
	display: flex;
	flex: 1;
	font-size: 0.95em;
	margin: 4px 0;
`;

const StyledInput = styled.input`
	display: flex;
	flex: 1;
	padding: 7px 11px;
	border: 1px solid transparent;
	border-color: #dbdbdb;
	outline: none;
	border-radius: 5px;
	box-shadow: inset 0 0.0625em 0.125em rgba(10, 10, 10, 0.05);
	font-size: 0.95em;
	font-family: inherit;
`;
