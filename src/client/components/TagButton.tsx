import React from "react";
import { useNavigate } from "react-router-dom";

const TagButton = ({ tag }) => {
	const navigate = useNavigate();
	const tagReroute = () => {
		navigate(`/search`, {
			state: { id: tag.id, name: tag.name },
		});
	};
	return (
		<button
			className="btn btn-primary m-2"
			key={`${tag.id}-tag-button`}
			value={tag.name}
			id={tag.id.toString()}
			onClick={tagReroute}
		>
			{tag.name}
		</button>
	);
};

export default TagButton;
