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
	const [userList, setUserList] = useState([]);
	const { dispatch } = useContext(UserContext);

	let myConn = null;
	let _isHost = false;
	let username = null;
	let socket = null;

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
			socket = await createConnection(username, roomId);
			console.log('not host');
		} else {
			_isHost = true;
			socket = props.location.socket;
			console.log('host');
		}

		// add myself to connection list and update states
		setHost(_isHost);
		bindEvents();
	};

	const bindEvents = () => {
		if (!socket) return;

		socket.on('newMessage', (data) => {
			if (data.type === 'userJoin') {
				console.log('New User Joined', data.payload);
			} else if (data.type === 'userLeft') {
				console.log('User Left', data.payload);
			}
		});

		socket.on('updateUserList', (userList) => {
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
						<Chat />
					</Col>
				</Row>
			</Container>
		</React.Fragment>
	);
}

export default Room;
