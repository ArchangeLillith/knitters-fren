import React from "react";

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
				<span className="muted text-white">
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
