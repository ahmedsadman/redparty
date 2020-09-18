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
				pauseVideo: Math.round(action.currentTime),
			};
		default:
			break;
	}
};
