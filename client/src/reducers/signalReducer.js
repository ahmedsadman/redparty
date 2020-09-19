export const signalReducer = (state, action) => {
	switch (action.type) {
		case 'SET_TRANSITION':
			return {
				...state,
				transition: action.transition,
			};
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
