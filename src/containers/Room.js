import React from 'react';
import Swal from 'sweetalert2';
import { createConnection } from '../utils/socket';
/* Connection establishement steps are defined in utils/webrtc.js */

class Room extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isHost: false,
			userList: [],
		};
		this.myConn = null;
		this.isHost = false;
		this.username = null;
		this.socket = null;
	}

	componentDidMount() {
		console.log(this.props);
		this.init();
	}

	async init() {
		const hostId =
			this.props.location.state && this.props.location.state.hostId;

		if (!hostId) {
			// Not a host
			// ask for username
			const username = await Swal.fire({
				title: 'Enter your display name',
				input: 'text',
				allowOutsideClick: false,
			});
			this.username = username.value;
			const roomId = this.props.match.params.id;
			this.socket = await createConnection(this.username, roomId);
			console.log('not host');
		} else {
			this.isHost = true;
			this.socket = this.props.location.socket;
			console.log('host');
		}

		// add myself to connection list and update states
		this.setState({ isHost: this.isHost });
		this.bindEvents();
	}

	bindEvents() {
		this.socket.on('new_connection', (data) => {
			console.log('new user connected', data);
		});
	}

	render() {
		return <h1>Hello I am Room</h1>;
	}
}

export default Room;
