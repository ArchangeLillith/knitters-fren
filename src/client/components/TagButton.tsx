import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Tag } from '../utils/types';

type TagButtonProps = {
	tag: Tag;
	SelectedDTO?: { selectedTags: Tag[]; tagsActive: boolean };
	tagToggle?: (tagButton: React.MouseEvent<HTMLButtonElement>) => void; // Optional function prop
};

const TagButton: React.FC<TagButtonProps> = ({
	tag,
	SelectedDTO,
	tagToggle = undefined,
}) => {
	const navigate = useNavigate();
	const selectedTags = SelectedDTO?.selectedTags;

	/**
	 * The baked in function to allow the user to click on the tag and be taken to the search page with that tag already selected
	 */
	const tagReroute = (e: React.MouseEvent<HTMLButtonElement>) => {
		const { id, value } = e.currentTarget as HTMLButtonElement;
		navigate(`/search`, {
			state: { id, name: value },
		});
	};

	console.log('Selected tags (type):', typeof selectedTags);
	console.log('Selected tags (value):', selectedTags);
	const isSelected = selectedTags?.some(
		(selectedTag: Tag) => selectedTag.name === tag.name
	);

	const buttonClass = isSelected
		? 'selected-tag btn btn-secondary tag-button'
		: 'btn btn-primary tag-button';

	return (
		<button
			className={buttonClass}
			value={tag.name}
			id={tag.id.toString()}
			onClick={e => (tagToggle ? tagToggle(e) : tagReroute(e))}
		>
			{tag.name}
		</button>
	);
};

export default TagButton;
