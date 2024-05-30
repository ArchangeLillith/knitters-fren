import React from "react";

interface CardProps {
	text: string;
}

const Card = ({ text }: CardProps) => {
	return (
		<div>
			<h2>{text}</h2>
		</div>
	);
};

export default Card;
