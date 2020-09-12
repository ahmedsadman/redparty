export const userReducer = (state, action) => {
	switch (action.type) {
		case 'UPDATE_USER_LIST':
			return {
				...state,
				userList: action.users,
			};
		default:
			return state;
	}
};
