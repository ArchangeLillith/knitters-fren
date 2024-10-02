/* eslint-disable react/no-unescaped-entities */
import React from 'react';

import Container from '../components/Container';

const Gallery = () => {
	return (
		<Container>
			<div
				className="w-60 bg-white rounded my-5 m-auto d-flex align-items-center"
				id="404-container"
			>
				<div className="display-6 p-2">
					Nanachi is working hard to make this page for you~
					<br />
					<br /> But she needs a nap, come back later to see if she's finshed
					it!
				</div>
				<img
					style={{ width: '500px' }}
					src="/images/sleeping-with-mitty.png"
					alt="sleeping..."
					className="sleeping-nanachi "
				/>
			</div>
		</Container>
	);
};

export default Gallery;
