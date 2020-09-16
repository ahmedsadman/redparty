import React from 'react';
import styled from 'styled-components';
import YouTube from 'react-youtube';

function Player(props) {
	const { videoId } = props;
	const options = {
		width: '100%',
		height: '500px',
	};

	return (
		<StyledPlayer>
			{videoId ? <YouTube videoId={videoId} opts={options} /> : null}
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
