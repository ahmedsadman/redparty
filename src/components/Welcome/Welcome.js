import React, { useState } from 'react';
import { createConnection } from '../../utils/socket';
import { Container, Row, Col, Hidden } from 'react-grid-system';
import styled from 'styled-components';
import Topbar from '../common/Topbar';
import StartForm from './StartForm';
import FeatureBox from './FeatureBox';
import { colors } from '../../config/colors';

function Welcome(props) {
	// const [canRedirectToRoom, setRedirect] = useState(false);
	const [username, setUsername] = useState('');

	const onInputChange = (e) => {
		setUsername(e.target.value);
	};

	const onHost = async () => {
		// use socket id as room address
		const socket = await createConnection(username);
		props.history.push({
			pathname: `/room/${socket.id}`,
			state: { hostId: socket.id, username },
			socket,
		});
	};

	return (
		<React.Fragment>
			<Topbar />
			<Container fluid>
				<Row style={{ marginTop: '70px' }} align='center'>
					<Hidden xs>
						<Col xs={2}></Col>
					</Hidden>

					{/* --------- Intro Message -------- */}
					<Col xs={12} md={4}>
						<IntroMessage>
							Host{' '}
							<span style={{ color: colors.primaryColor }}>
								Youtube
							</span>{' '}
							Watch Party with Friends
						</IntroMessage>
					</Col>

					<Hidden xs>
						<Col xs={1}></Col>
					</Hidden>

					{/* --------- Form -------- */}
					<Col xs={12} md={3}>
						<StartForm onChange={onInputChange} onHost={onHost} />
					</Col>

					<Hidden xs>
						<Col xs={2}></Col>
					</Hidden>
				</Row>

				<FeatureBox />
			</Container>
		</React.Fragment>
	);
}

const IntroMessage = styled.h1`
	font-weight: 300;
	margin: 0;
	padding: 0;
	font-size: 2.5em;
`;

export default Welcome;
