export const userReducer = (state, action) => {
	switch (action.type) {
		case 'UPDATE_USERNAME':
			return {
				...state,
				username: action.username,
			};
		case 'UPDATE_VIDEO_ID':
			return {
				...state,
				videoId: action.videoId,
			};
		case 'UPDATE_USER_LIST':
			return {
				...state,
				userList: action.users,
			};
		case 'UPDATE_MESSAGES':
			const { id, from, text, timestamp } = action.data;
			return {
				...state,
				messages: [
					...state.messages,
					{
						id,
						from,
						text,
						timestamp,
					},
				],
			};
		default:
			return state;
	}
};
