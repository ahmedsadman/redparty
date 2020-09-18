import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';
import YouTube from 'react-youtube';
import { SignalContext } from '../../contexts/SignalContext';

function Player(props) {
	const { videoId, socket } = props;
	const options = {
		width: '100%',
		height: '500px',
	};
	const { dispatch: signalDispatch, signalData } = useContext(SignalContext);

	const emitVideoState = (type, payload = {}) => {
		if (socket) {
			socket.emit('videoStateChange', { type, payload });
		}
	};

	useEffect(() => console.log('video play'), [signalData.playVideo]);
	useEffect(() => console.log('video pause'), [signalData.pauseVideo]);

	const onStateChange = (e) => {
		const { data } = e;

		/*
		When user seeks a video, the following events are fired in order
		Video paused (2) -> Video Ended (0) -> Video Playing (1)
		*/
		switch (data) {
			case 1:
				// PLAY
				console.log('video started playing');
				emitVideoState('PLAY', {
					currentTime: e.target.getCurrentTime(),
				});
				break;

			case 2:
				// PAUSE
				console.log('Video paused');
				emitVideoState('PAUSE');
				break;

			default:
				break;
		}
	};

	return (
		<StyledPlayer>
			{videoId ? (
				<YouTube
					videoId={videoId}
					opts={options}
					onStateChange={onStateChange}
				/>
			) : null}
		</StyledPlayer>
	);
}

const StyledPlayer = styled.div`
	margin-top: 30px;
	background-color: black;
	width: 100%;
	height: 500px;
`;

export default Player;
