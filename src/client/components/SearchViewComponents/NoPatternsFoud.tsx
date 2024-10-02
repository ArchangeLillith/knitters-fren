/* eslint-disable react/no-unescaped-entities */
import React from 'react';

import Container from '../Container';

const NoPatternsFound = () => {
	return (
		<Container bottomPadding={0}>
			<div className="d-flex flex-column m-auto align-items-center">
				<p className="lead">
					Sorry, Nanachi looked through the archives and no patterns exist
					within those parameters. Please search for something else, she'd be
					happy to assist!
				</p>
				<img
					src="/images/book-nanachi.png"
					alt="book-nanachi"
					style={{
						width: '300px',
					}}
				/>
			</div>
		</Container>
	);
};

export default NoPatternsFound;
