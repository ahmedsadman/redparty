import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { createConnection } from '../../utils/socket';
/* Connection establishement steps are defined in utils/webrtc.js */

function Room(props) {
	const [isHost, setHost] = useState(false);
	const [userList, setUserList] = useState([]);

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
		socket.on('new_connection', (data) => {
			console.log('new user connected', data);
		});
	};

	return <h1>Hello I am Room</h1>;
}

export default Room;
