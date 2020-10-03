import React, { useState } from 'react';
import styled from 'styled-components';
import { Label, Input, Button, Card } from '../common';
import { Col } from 'react-grid-system';

function CustomForm(props) {
	const { onSubmit, buttonLabel, header, loading } = props;
	return (
		<form onSubmit={onSubmit}>
			<Card padding='20px'>
				<Header>{header}</Header>
				{props.children}
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
					}}
				>
					<Button
						type='submit'
						style={{ alignSelf: 'center', marginTop: '30px' }}
						secondary
						isLoading={loading}
						disabled={loading}
					>
						{buttonLabel}
					</Button>
				</div>
			</Card>
		</form>
	);
}

const Forms = (props) => {
	const [hostDisplayName, setHostDisplayName] = useState('');
	const [videoUrl, setVideoUrl] = useState('');
	const [joinDisplayName, setJoinDisplayName] = useState('');
	const [joinUrl, setJoinUrl] = useState('');

	const _onHost = (e) => {
		e.preventDefault();
		props.onHost(hostDisplayName, videoUrl);
	};

	const _onJoin = (e) => {
		e.preventDefault();
		props.onJoin(joinDisplayName, joinUrl);
	};

	return (
		<React.Fragment>
			<Col md={3}>
				<CustomForm
					buttonLabel='Host'
					header='Start a party!'
					onSubmit={_onHost}
					loading={props.hostLoading}
				>
					<Controls>
						<Label htmlFor='username1'>Display Name</Label>
						<Input
							type='text'
							name='username1'
							value={hostDisplayName}
							onChange={(e) => setHostDisplayName(e.target.value)}
							id='name1'
							placeholder='John The Host'
							required
						/>
					</Controls>
					<Controls>
						<Label htmlFor='url'>Youtube URL</Label>
						<Input
							type='text'
							name='url'
							id='url'
							value={videoUrl}
							onChange={(e) => setVideoUrl(e.target.value)}
							placeholder='https://www.youtube.com/watch?v=zFhfksjf_mY'
							required
						/>
					</Controls>
				</CustomForm>
			</Col>
			<Col md={2} align='center'>
				<BigHeader>...Or...</BigHeader>
			</Col>
			<Col md={3}>
				<CustomForm
					buttonLabel='Join'
					header='Join existing one!'
					loading={props.loading}
					onSubmit={_onJoin}
				>
					<Controls>
						<Label htmlFor='username2'>Display Name</Label>
						<Input
							type='text'
							name='username2'
							value={joinDisplayName}
							onChange={(e) => setJoinDisplayName(e.target.value)}
							id='name2'
							placeholder='Dursley'
							required
						/>
					</Controls>
					<Controls>
						<Label htmlFor='url'>Join URL</Label>
						<Input
							type='text'
							name='url'
							id='url'
							value={joinUrl}
							onChange={(e) => setJoinUrl(e.target.value)}
							placeholder='redparty.netlify.app/room/asD2123f'
						/>
					</Controls>
				</CustomForm>
			</Col>
		</React.Fragment>
	);
};

const Controls = styled.div`
	display: flex;
	flex: 1;
	flex-direction: column;
	margin: 15px 0;
`;

const Header = styled.h1`
	margin: 0;
	padding: 0;
	font-weight: 500;
	margin-bottom: 50px;
	font-size: 2em;
	text-align: center;
`;

const BigHeader = styled.h1`
	font-weight: 300;
	font-size: 2.8em;
	margin-top: -50px;
`;

export default Forms;
