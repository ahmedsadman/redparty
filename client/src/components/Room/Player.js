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

	const emitVideoState = (type, payload = {}, delayOffset = 0) => {
		if (socket && !signalData.transition) {
			console.log('Emitting video state', type);
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
			signalDispatch({ type: 'SET_TRANSITION', transition: false });
		}
	};

	useEffect(onVideoPlay, [signalData.playVideo]);
	useEffect(onVideoPause, [signalData.pauseVideo]);

	useEffect(() => {
		if (!player.current) return;
		const _player = player.current.getInternalPlayer();
		_player.seekTo(0);
		_player.stopVideo();
		console.log('video change trigerred xcv xcv xc v');
		signalDispatch({ type: 'SET_TRANSITION', transition: false });
	}, [videoId]);

	const onStateChange = (e) => {
		const { data } = e;
		const _player = player.current && player.current.getInternalPlayer();
		/*
		When user seeks a video, the following events are fired in order
		Video paused (2) -> Video Playing (1)
		*/
		switch (data) {
			case -1:
				console.log('Case -1 Video unstarted');
				break;

			case 0:
				console.log('Case 0 Video Ended');

			case 1:
				// PLAY
				console.log('Case 1 Video Play');
				signalDispatch({ type: 'SET_TRANSITION', transition: false });
				_player && _player.playVideo();

				emitVideoState(
					'PLAY',
					{
						currentTime: e.target.getCurrentTime(),
					},
					150
				);
				break;

			case 2:
				// PAUSE
				console.log('Case 2 Video paused');
				emitVideoState('PAUSE');
				break;

			case 3:
				console.log('Case 3 Bufferring');
				break;

			case 5:
				console.log('Case 5 Video Cued');
				signalDispatch({ type: 'SET_TRANSITION', transition: false });
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
