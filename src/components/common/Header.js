import React from 'react';
import styled from 'styled-components';

export const Header = (props) => <StyledHeader>{props.children}</StyledHeader>;

const StyledHeader = styled.h1`
	font-size: 1.8em;
	font-weight: 300;
	margin: 5px 0;
`;
