import React from "react";
import Container from "../components/Container";
import Card from "../components/Card";
interface HomeProps {}

const Home = (props: HomeProps) => {
	return (
		<div>
			<Container>
				<div className="d-inline-flex p-2 bd-highlight justify-content-between">
					<img
						alt="site-logo-sleeping-nanachi"
						src="/images/Nanachi-logo.png"
						className="w-25"
					/>
					<div id="featured-patterns">
						<Card text="This is the Featured Section"></Card>
					</div>
				</div>
			</Container>
		</div>
	);
};

export default Home;
