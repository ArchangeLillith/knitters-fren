import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaGooglePlus } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

interface FooterProps {}

const Footer = (props: FooterProps) => {
	return (
		<footer className="footer fixed-bottom justify-content-center align-items-center bg-muted d-flex">
			<img
				src="/images/nanachi-footer-hang.png"
				style={{ height: "100px" }}
				alt="Footer Image"
			/>
			<div className="text-center mx-5 w-100">
				<div className="justify-content-center align-items-center d-flex px-0">
					<div className="rounded-circle px-1" style={{ color: "#b45b5b" }}>
						<FaYoutube />
					</div>
					<div className="rounded-circle px-1" style={{ color: "#b45b5b" }}>
						<FaInstagram />
					</div>
					<div className="rounded-circle px-1" style={{ color: "#b45b5b" }}>
						<FaFacebook />
					</div>
					<div className="rounded-circle px-1" style={{ color: "#b45b5b" }}>
						<FaGooglePlus />
					</div>
					<div
						className="rounded-circle px-1 my-1"
						style={{ color: "#b45b5b" }}
					>
						<FaTwitter />
					</div>
				</div>
				<div>
					<ul
						className="mb-2 mb-lg-0 justify-content-center align-items-center bg-muted d-flex list-unstyled"
						style={{ fontFamily: "-moz-initial" }}
					>
						<li className="nav-item mx-2" style={{ color: "#e78686" }}>
							<Link to="/" className="primary-link" aria-current="page">
								Home
							</Link>
						</li>
						<li className="nav-item mx-2" style={{ color: "#e78686" }}>
							<Link to="/patterns" className="primary-link">
								Patterns
							</Link>
						</li>
						<li className="nav-item mx-2" style={{ color: "#e78686" }}>
							<Link to="/patterns/new" className="primary-link">
								Create a Pattern
							</Link>
						</li>
						<li className="nav-item mx-2" style={{ color: "#e78686" }}>
							<Link to="/gallery" className="primary-link">
								Gallery
							</Link>
						</li>
						<li className="nav-item mx-2" style={{ color: "#e78686" }}>
							<Link to="/donate" className="primary-link">
								Donate
							</Link>
						</li>
					</ul>
				</div>
				<span className="muted text-white small fw-lighter fst-italic">
					Developed by Aria Walford for Covalence labs and personal use
				</span>
			</div>
			<div style={{ color: "transparent" }} className="select-none">
				styling div and sentance
			</div>
		</footer>
	);
};

export default Footer;
