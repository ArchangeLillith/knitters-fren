import React, { useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { PiYarnLight } from 'react-icons/pi';
import { Link } from 'react-router-dom';

const Footer = () => {
	const [simpleFooter, setSimpleFooter] = useState(false);

	useEffect(() => {
		const isLargeScreen = window.innerWidth <= 992; // Bootstrap 'lg' breakpoint
		setSimpleFooter(isLargeScreen);
	}, []);

	if (simpleFooter) {
		return (
			<footer className="footer fixed-bottom justify-content-center align-items-center bg-muted d-flex">
				<img
					src="https://knitters-fren.s3.ca-central-1.amazonaws.com/website-images/nanachi-footer-hang.png"
					style={{ height: '50px' }}
					alt="Footer nanchi"
				/>
			</footer>
		);
	}

	return (
		<footer className="footer fixed-bottom justify-content-center align-items-center bg-muted d-flex">
			<img
				src="https://knitters-fren.s3.ca-central-1.amazonaws.com/website-images/nanachi-footer-hang.png"
				style={{ height: '100px' }}
				alt="Footer nanchi"
			/>
			<div className="text-center mx-5 w-100">
				<div>
					<ul
						className="mb-2 mb-lg-0 justify-content-center align-items-center bg-muted d-flex list-unstyled"
						style={{ fontFamily: 'Garamond, serif', fontSize: '18px' }}
					>
						<li className="nav-item mx-2" style={{ color: '#e78686' }}>
							<Link
								to="/"
								className="primary-link text-decoration-none"
								aria-current="page"
							>
								Home
							</Link>
						</li>
						<li className="nav-item mx-2" style={{ color: '#e78686' }}>
							<Link
								to="/patterns"
								className="primary-link text-decoration-none"
							>
								Patterns
							</Link>
						</li>
						<li className="nav-item mx-2" style={{ color: '#e78686' }}>
							<Link
								to="/patterns/new"
								className="primary-link text-decoration-none"
							>
								Create a Pattern
							</Link>
						</li>
						<li className="nav-item mx-2" style={{ color: '#e78686' }}>
							<Link to="/gallery" className="primary-link text-decoration-none">
								Gallery
							</Link>
						</li>
					</ul>
				</div>
				<span className="muted text-white small fw-lighter fst-italic">
					Developed by Aria Walford for personal use, images from{' '}
					<a
						target="_blank"
						className="image-credit"
						href="https://www.pixiv.net/en/users/13981606/illustrations"
						rel="noreferrer"
					>
						this creator
					</a>
				</span>
				<div className="justify-content-center align-items-center d-flex px-0">
					<div className="rounded-circle px-1" style={{ color: '#b45b5b' }}>
						<FaHeart />
					</div>
					<div className="rounded-circle px-1" style={{ color: '#b45b5b' }}>
						<PiYarnLight />
					</div>
					<div className="rounded-circle px-1" style={{ color: '#b45b5b' }}>
						<FaHeart />
					</div>
					<div className="rounded-circle px-1" style={{ color: '#b45b5b' }}>
						<PiYarnLight />
					</div>
					<div className="rounded-circle px-1" style={{ color: '#b45b5b' }}>
						<FaHeart />
					</div>
				</div>
			</div>
			<div style={{ color: 'transparent' }} className="select-none">
				styling div and sentance
			</div>
		</footer>
	);
};

export default Footer;
