import React from "react";
import Container from "../components/Container";
interface HomeProps {}

const Home = (props: HomeProps) => {
	return (
		<div>
			<Container>
				<div className="">
					<h1>Knitters Fren</h1>
					<img
						alt="site-logo-sleeping-nanachi"
						src={require("../assets/Nanachi-logo.jpg")}
					/>
				</div>
			</Container>
		</div>
	);
};

export default Home;
