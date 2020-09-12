const generateServerMessage = (type, payload = {}) => {
	return {
		type,
		payload,
		timestamp: Date.now(),
	};
};

const generateUserMessage = (from, text) => {
	return {
		type: 'userMessage',
		from,
		text,
		timestamp: Date.now(),
	};
};

module.exports = { generateServerMessage, generateUserMessage };
