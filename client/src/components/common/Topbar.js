import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'react-grid-system';
import { colors } from '../../config/colors';

const Topbar = (props) => (
	<Row nogutter>
		<Col xs={12}>
			<StyledBar>
				<img
					src='/redparty-logo.svg'
					alt='logo'
					width='auto'
					height='25px'
					style={{ marginRight: '8px' }}
				/>
				<span style={{ color: colors.primaryColor }}>RED</span>
				&nbsp;PARTY
			</StyledBar>
		</Col>
	</Row>
);

const StyledBar = styled.div`
	display: flex;
	flex: 1;
	height: 8vh;
	box-shadow: 2px 2px 5px #ddd;
	align-items: center;
	justify-content: center;
	font-size: 1.8em;
	font-weight: 800;
`;

export default Topbar;
