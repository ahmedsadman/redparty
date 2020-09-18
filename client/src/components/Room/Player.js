import React, { useEffect, useContext, createRef } from 'react';
import styled from 'styled-components';
import YouTube from 'react-youtube';
import { SignalContext } from '../../contexts/SignalContext';

function Player(props) {
	let player = createRef();
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

	const onVideoPlay = () => {
		if (player.current) {
			const _player = player.current.getInternalPlayer();
			_player.seekTo(signalData.playVideo || 0);
			_player.playVideo();
		}
	};

	const onVideoPause = () => {
		if (player.current) {
			const _player = player.current.getInternalPlayer();
			_player.pauseVideo();
		}
	};

	useEffect(onVideoPlay, [signalData.playVideo]);
	useEffect(onVideoPause, [signalData.pauseVideo]);

	const onStateChange = (e) => {
		const { data } = e;
		const _player = player.current && player.current.getInternalPlayer();
		/*
		When user seeks a video, the following events are fired in order
		Video paused (2) -> Video Playing (1)
		*/
		switch (data) {
			case 1:
				// PLAY
				console.log('video started playing');
				emitVideoState('PLAY', {
					currentTime: e.target.getCurrentTime(),
				});
				_player && _player.playVideo();
				break;

			case 2:
				// PAUSE
				console.log('Video paused');
				emitVideoState('PAUSE', {
					currentTime: e.target.getCurrentTime(),
				});
				_player && _player.pauseVideo();
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
					ref={player}
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
