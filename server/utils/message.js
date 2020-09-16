const { v4: uuid } = require('uuid');

const generateServerMessage = (type, payload = {}) => {
	return {
		id: uuid(),
		type,
		payload,
		timestamp: Date.now(),
	};
};

const generateUserMessage = (from, userId, text) => {
	return {
		id: uuid(),
		type: 'userMessage',
		userId,
		from,
		text,
		timestamp: Date.now(),
	};
};

module.exports = { generateServerMessage, generateUserMessage };
