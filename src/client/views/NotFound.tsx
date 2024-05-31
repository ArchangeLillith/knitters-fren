import React from "react";

interface NotFoundProps {}

const NotFound = (props: NotFoundProps) => {
	return (
		<div
			className="container mx-auto w-50 bg-white rounded my-5"
			id="404-container"
		>
			<div className="display-3">Sorry, this page doesn't exist</div>
			<img
				style={{ width: "250px" }}
				src="/images/404.gif"
				alt="loading..."
				className="404-nanachi "
			/>
		</div>
	);
};

export default NotFound;
