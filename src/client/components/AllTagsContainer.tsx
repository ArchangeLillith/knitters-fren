import React, { useMemo } from 'react';

import TagButton from './TagButton';
import useFetchData from '../hooks/useFetchData';
import { SearchPageState, AddPatternPageState, Tag } from '../utils/types';

type AllTagsContainer = {
	selectedTags: Tag[];
	setSelectedTags:
		| React.Dispatch<React.SetStateAction<SearchPageState>>
		| React.Dispatch<React.SetStateAction<AddPatternPageState>>;
};

const AllTagsContainer: React.FC<AllTagsContainer> = ({
	selectedTags,
	setSelectedTags,
}) => {
	const fetchConfigs = useMemo(() => [{ key: 'tags', url: '/api/tags' }], []);
	const { data, loading, error } = useFetchData<{ tags: Tag[] }>(fetchConfigs);

	if (loading) {
		return <div>Loading...</div>;
	}
	if (error) {
		return <div>Error</div>;
	}

	const tagToggle = (tagButton: React.MouseEvent<HTMLButtonElement>) => {
		const { id, value } = tagButton.currentTarget;
		const numericId = parseInt(id, 10);
		const updatedSelectedTags = selectedTags.some(tag => tag.id === numericId)
			? selectedTags.filter(tag => tag.id !== numericId)
			: [...selectedTags, { id: numericId, name: value }];
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
						selectedTags={selectedTags}
						tagToggle={tagToggle}
					/>
				</div>
			))}
		</div>
	);
};

export default AllTagsContainer;
