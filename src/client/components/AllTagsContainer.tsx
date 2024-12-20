import React, { useMemo } from 'react';

import TagButton from './TagButton';
import useFetchData from '../hooks/useFetchData';
import { Tag, SetSelectedTags } from '../utils/types';

type AllTagsContainer = {
	SelectedDTO?: {
		tagsActive: boolean;
		selectedTags: Tag[];
	};
	setSelectedTags: SetSelectedTags;
};

const AllTagsContainer: React.FC<AllTagsContainer> = ({
	SelectedDTO,
	setSelectedTags,
}) => {
	const selectedTags = SelectedDTO ? SelectedDTO.selectedTags : [];
	console.log(`All Tags:`, selectedTags);
	const fetchConfigs = useMemo(() => [{ key: 'tags', url: '/api/tags' }], []);
	const { data, loading, error } = useFetchData<{ tags: Tag[] }>(fetchConfigs);

	if (loading) {
		return;
	}
	if (error) {
		return;
	}

	const tagToggle = (tagButton: React.MouseEvent<HTMLButtonElement>) => {
		tagButton.preventDefault();
		const { id, value } = tagButton.currentTarget;
		const numericId = parseInt(id, 10);
		console.log(`numericId: ${numericId}, value: ${value}`); // Check if the values are correct
		console.log(`Seelected before filter`, selectedTags);
		const updatedSelectedTags = selectedTags.some(tag => tag.id === numericId)
			? selectedTags.filter(tag => tag.id !== numericId)
			: [...selectedTags, { id: numericId, name: value }];
		console.log(`Selected after filter`, selectedTags);
		//Yeah i could type this but it's a HUGE pain and prob not worth it
		setSelectedTags(prev => ({
			...prev,
			selectedTags: updatedSelectedTags,
			tagsActive: updatedSelectedTags.length > 0,
		}));
	};

	return (
		<div
			id="tags-div"
			className="form-control-lg form-control flex-grow-1 bg-soft"
		>
			{data.tags.map((tag: Tag) => (
				<div
					className="m-1 d-inline-flex btn-group"
					role="group"
					aria-label="Basic checkbox toggle button group"
					key={`${tag.id}-container`}
				>
					<TagButton
						tag={tag}
						SelectedDTO={SelectedDTO}
						tagToggle={tagToggle}
					/>
				</div>
			))}
		</div>
	);
};

export default AllTagsContainer;
