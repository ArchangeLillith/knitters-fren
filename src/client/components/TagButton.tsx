import React from "react";
import { useNavigate } from "react-router-dom";
import { Tag } from "../utils/types";

type TagButtonProps = {
	tag: Tag;
	selectedTags?: Tag[];
	tagToggle?: (tagButton: React.MouseEvent<HTMLButtonElement>) => void; // Optional function prop
};

const TagButton: React.FC<TagButtonProps> = ({
	tag,
	selectedTags,
	tagToggle = undefined,
}) => {
	const navigate = useNavigate();

	/**
	 * The baked in function to allow the user to click on the tag and be taken to the search page with that tag already selected
	 */
	const tagReroute = (e: React.MouseEvent<HTMLButtonElement>) => {
		const { id, value } = e.currentTarget as HTMLButtonElement;
		navigate(`/search`, {
			state: { id, name: value },
		});
	};

	const isSelected = selectedTags?.some(
		(selectedTag: Tag) => selectedTag.name === tag.name
	);

	const buttonClass = isSelected
		? "selected-tag btn btn-secondary"
		: "btn btn-primary";

	return (
		<button
			className={buttonClass}
			value={tag.name}
			id={tag.id.toString()}
			onClick={(e) => (tagToggle ? tagToggle(e) : tagReroute(e))}
		>
			{tag.name}
		</button>
	);
};

export default TagButton;
