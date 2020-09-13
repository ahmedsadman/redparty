const generateServerMessage = (type, payload = {}) => {
	return {
		type,
		payload,
		timestamp: Date.now(),
	};
};

const generateUserMessage = (from, id, text) => {
	return {
		type: 'userMessage',
		id,
		from,
		text,
		timestamp: Date.now(),
	};
};

module.exports = { generateServerMessage, generateUserMessage };
