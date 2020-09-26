import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Hidden } from 'react-grid-system';
import Swal from 'sweetalert2';
import Topbar from '../common/Topbar';
import Player from './Player';
import Chat from './Chat/Chat';
import Options from './Options';
import { createConnection, bindSocketEvents } from '../../utils/socket';
import { UserContext } from '../../contexts/UserContext';
import { SignalContext } from '../../contexts/SignalContext';

function Room(props) {
	const [isHost, setHost] = useState(false);
	const [socket, setSocket] = useState(null);
	const { dispatch: userDispatch, userData } = useContext(UserContext);
	const { dispatch: signalDispatch } = useContext(SignalContext);

	let _isHost = false;
	let _socket = null;

	useEffect(() => {
		console.log(props);
		init();
	}, []);

	const init = async () => {
		const hostId = props.location.state && props.location.state.hostId;
		const videoId = props.location.state && props.location.state.videoId;
		let username = props.location.state && props.location.state.username;

		if (!hostId) {
			// Not a host
			// ask for username
			const usernamePrompt = await Swal.fire({
				title: 'Enter your display name',
				input: 'text',
				allowOutsideClick: false,
			});
			username = usernamePrompt.value;
			const roomId = props.match.params.id;
			_socket = await createConnection(username, roomId);

			// doesn't have video id, need to be fetched from server
		} else {
			_isHost = true;
			_socket = props.location.socket;

			// update videoid in global context
			userDispatch({ type: 'UPDATE_VIDEO_ID', videoId });
			showInviteModal();
		}

		// update username in global context
		userDispatch({ type: 'UPDATE_USERNAME', username });

		setHost(_isHost);
		setSocket(_socket);
		bindSocketEvents(_socket, {
			userDispatch,
			signalDispatch,
		});
	};

	const showInviteModal = async () => {
		await Swal.fire({
			title: 'Invite friends with this link',
			input: 'text',
			inputValue: window.location.href,
			confirmButtonText: 'Copy',
			inputAttributes: {
				readOnly: true,
			},
			width: '40%',
			onClose: () => {
				document.getElementsByClassName('swal2-input')[0].select();
				document.execCommand('copy');
			},
		});
	};

	const alertNotImplemented = () => {
		alert('Not implemented');
	};

	return (
		<React.Fragment>
			<Topbar />
			<Container fluid style={{ margin: '0 3%' }}>
				<Row>
					<Col md={8}>
						<Player socket={socket} videoId={userData.videoId} />
					</Col>
					<Col md={4}>
						<Options
							onInvite={showInviteModal}
							alertNotImplemented={alertNotImplemented}
						/>
						<Chat socket={socket} />
					</Col>
				</Row>
			</Container>
		</React.Fragment>
	);
}

export default Room;
