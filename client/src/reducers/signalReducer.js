export const signalReducer = (state, action) => {
	switch (action.type) {
		case 'PLAY_VIDEO':
			return {
				...state,
				playVideo: Math.round(action.currentTime),
			};
		case 'PAUSE_VIDEO':
			return {
				...state,
				pauseVideo: action.timestamp,
			};
		default:
			break;
	}
};
