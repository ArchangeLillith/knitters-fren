import React from "react";
import { useNavigate } from "react-router-dom";
const TagButton = ({ tag }) => {
	const navigate = useNavigate();

	/**
	 * The baked in function to allow the user to click on the tag and be taken to the search page with that tag already selected
	 */
	const tagReroute = () => {
		navigate(`/search`, {
			state: { id: tag.id, name: tag.name },
		});
	};

	return (
		<button
			className="btn btn-primary m-2"
			value={tag.name}
			id={tag.id}
			onClick={tagReroute}
		>
			{tag.name}
		</button>
	);
};

export default TagButton;
