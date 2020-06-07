import React from 'react';
import styled from 'styled-components';
import { Header } from '../common/Header';

const Intro = (props) => (
	<React.Fragment>
		<Header>YT Party</Header>
		<P>Watch Youtube with friends!</P>
	</React.Fragment>
);

const P = styled.p`
	font-size: 1em;
`;

export default Intro;
