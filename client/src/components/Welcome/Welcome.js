import React, { useState } from 'react';
import { createConnection } from '../../utils/socket';
import { Container, Row, Col, Hidden } from 'react-grid-system';
import styled from 'styled-components';
import Topbar from '../common/Topbar';
import StartForm from './StartForm';
import FeatureBox from './FeatureBox';
import { Button } from '../common';
import { colors } from '../../config/colors';

function Welcome(props) {
	// const [canRedirectToRoom, setRedirect] = useState(false);
	let formEnd = null;
	const [username, setUsername] = useState('');

	const onInputChange = (e) => {
		setUsername(e.target.value);
	};

	const scrollToForm = () => {
		if (formEnd) {
			formEnd.scrollIntoView({ behavior: 'smooth' });
		}
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
			<Container fluid style={{ height: '92vh' }}>
				{/* topbar is 8vh in height, so (100 - 8) = 92 */}
				<Row style={{ paddingTop: '80px' }} align='center'>
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
						<Button
							style={styles.heroButton}
							onClick={scrollToForm}
							primary
						>
							Get Started
						</Button>
					</Col>

					<Col xs={12} md={5}>
						<img src='hero-banner.svg' />
					</Col>

					<Hidden xs>
						<Col xs={2}></Col>
					</Hidden>
				</Row>
				<FeatureBox />
			</Container>

			<Container fluid>
				<Row align='center' style={styles.formContainer}>
					<Col md={2}></Col>
					<StartForm />
					<Col md={2}></Col>
					<div className='dummy' ref={(el) => (formEnd = el)}></div>
				</Row>
			</Container>
		</React.Fragment>
	);
}

const IntroMessage = styled.h1`
	font-weight: 500;
	margin: 0;
	padding: 0;
	font-size: 2.5em;
`;

const styles = {
	formContainer: {
		backgroundImage: 'linear-gradient(#f9f9f9, #fff)',
		marginBottom: '40px',
		zIndex: 10,
		height: '100vh',
	},
	heroButton: {
		margin: '15px 0',
		minWidth: '200px',
		padding: '15px 10px',
	},
};

export default Welcome;
