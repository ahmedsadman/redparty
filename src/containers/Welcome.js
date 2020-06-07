import React from 'react';
import { createConnection } from '../utils/socket';
import WelcomeView from '../components/Welcome/WelcomeView';

class Welcome extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			canRedirectToRoom: false,
			username: '',
		};
	}

	onInputChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	redirectToRoom = async () => {
		// use socket id as room address
		const socket = await createConnection(this.state.username);
		this.props.history.push({
			pathname: `/room/${socket.id}`,
			state: { hostId: socket.id, username: this.state.username },
			socket,
		});
	};

	render() {
		return (
			<WelcomeView
				username={this.state.username}
				onInputChange={this.onInputChange}
				redirectToRoom={this.redirectToRoom}
			/>
		);
	}
}

export default Welcome;
