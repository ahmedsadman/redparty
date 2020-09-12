import React, { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';
import { Container, Row, Col, Hidden } from 'react-grid-system';
import Topbar from '../common/Topbar';
import Player from './Player';
import Chat from './Chat/Chat';
import { createConnection } from '../../utils/socket';
import { UserContext } from '../../contexts/UserContext';

function Room(props) {
	const [isHost, setHost] = useState(false);
	const [socket, setSocket] = useState(null);
	const { dispatch } = useContext(UserContext);

	let _isHost = false;
	let username = null;
	let _socket = null;

	useEffect(() => {
		console.log(props);
		init();
	}, []);

	const init = async () => {
		const hostId = props.location.state && props.location.state.hostId;

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
			console.log('not host');
		} else {
			_isHost = true;
			_socket = props.location.socket;
			console.log('host');
		}

		setHost(_isHost);
		setSocket(_socket);
		bindEvents();
	};

	const bindEvents = () => {
		if (!_socket) return;

		_socket.on('newMessage', (data) => {
			if (data.type === 'userJoin') {
				console.log('New User Joined', data.payload);
			} else if (data.type === 'userLeft') {
				console.log('User Left', data.payload);
			} else if (data.type === 'userMessage') {
				console.log('user message', data);
				dispatch({ type: 'UPDATE_MESSAGES', data });
			}
		});

		_socket.on('updateUserList', (userList) => {
			console.log('new user list', userList);
			dispatch({ type: 'UPDATE_USER_LIST', users: userList });
		});
	};

	return (
		<React.Fragment>
			<Topbar />
			<Container fluid style={{ margin: '0 3%' }}>
				<Row>
					<Col md={8}>
						<Player />
					</Col>
					<Col md={4}>
						<Chat socket={socket} />
					</Col>
				</Row>
			</Container>
		</React.Fragment>
	);
}

export default Room;
