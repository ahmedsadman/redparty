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

	const getCurrentPlayer = () => {
		if (player.current) return player.current.getInternalPlayer();
		else return null;
	};

	const emitVideoState = (type, payload = {}, delayOffset = 0) => {
		setTimeout(() => {
			if (socket && !signalData.transition) {
				console.log('Emitting video state', type);
				socket.emit('videoStateChange', { type, payload });
			}
		}, 500 + delayOffset);
	};

	const onVideoPlay = () => {
		const player = getCurrentPlayer();
		if (!player) return;
		player.seekTo(signalData.playVideo || 0);
		player.playVideo();
	};

	const onVideoPause = () => {
		const player = getCurrentPlayer();
		if (!player) return;

		player.pauseVideo();
		if (signalData.videoChanging) {
			signalDispatch({ type: 'SET_TRANSITION', transition: false });
			signalDispatch({
				type: 'VIDEO_CHANGING',
				videoChanging: false,
			});
		}
	};

	const loadNewVideo = () => {
		const player = getCurrentPlayer();
		if (!player) return;

		player.seekTo(0);
		player.stopVideo();
		signalDispatch({ type: 'SET_TRANSITION', transition: false });
	};

	useEffect(onVideoPlay, [signalData.playVideo]);
	useEffect(onVideoPause, [signalData.pauseVideo]);
	useEffect(loadNewVideo, [videoId]);

	const onStateChange = (e) => {
		const { data } = e;
		const player = getCurrentPlayer();
		if (!player) return;

		switch (data) {
			case -1:
				console.log('Case -1 Video unstarted');
				break;

			case 0:
				console.log('Case 0 Video Ended');
				break;

			case 1:
				// PLAY
				console.log('Case 1 Video Play');
				signalDispatch({ type: 'SET_TRANSITION', transition: false });
				player.playVideo();

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
				signalDispatch({ type: 'SET_TRANSITION', transition: false });
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
