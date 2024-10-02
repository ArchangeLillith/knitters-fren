import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import AllTagsContainer from '../components/AllTagsContainer';
import useFetchData from '../hooks/useFetchData';
import patternService from '../services/pattern';
import patternTags from '../services/pattern-tags';
import { Pattern, PatternObject, Tag } from '../utils/types';

const UpdatePattern = () => {
	const { id } = useParams<string>();
	const navigate = useNavigate();
	const [pattern, setPattern] = useState<Pattern | undefined>(undefined);
	const [title, setTitle] = useState<string>('');
	const [content, setContent] = useState<string>('');
	const [selectedTags, setSelectedTags] = useState<{
		tagsActive: boolean;
		selectedTags: Tag[];
	}>({ tagsActive: false, selectedTags: [] });

	// Memoize the fetch configuration to prevent re-renders causing unnecessary re-fetches
	const fetchConfigs = useMemo(
		() => [{ key: 'patternObject', url: `/api/patterns/${id}` }],
		[id]
	);

	const { data, loading, error } = useFetchData<{
		patternObject: PatternObject;
		tags: Tag[];
	}>(fetchConfigs, false);

	useEffect(() => {
		console.log(`DATA`, data);
		if (!data || !data.patternObject) return;
		const fetchedPattern: PatternObject = data.patternObject;
		const fetchedAssociatedTags: Tag[] = data.patternObject.tags;
		console.log(`Fetched ass`, data.patternObject.tags);

		setPattern(fetchedPattern);
		setTitle(fetchedPattern.title);
		setContent(fetchedPattern.content);
		setSelectedTags({
			tagsActive: fetchedAssociatedTags.length > 0,
			selectedTags: fetchedAssociatedTags,
		});
	}, [data]);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>; // Display error message from the hook
	}

	const handleUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (!id || !pattern) return;

		const patternDTO = {
			id,
			title,
			content,
		};

		patternService.updatePattern(id, patternDTO);

		const tagIds = selectedTags.selectedTags.map(tag => tag.id);
		if (tagIds.length > 0) {
			patternTags
				.addNewTags({ pattern_id: pattern.id, tag_ids: tagIds })
				.then(() => navigate(`/patterns/${id}`))
				.catch(() => console.log(`ERROR`));
		}
	};

	console.log(`SelectedTags Updates`, selectedTags);

	return (
		<div className="container bg-soft rounded p-4 my-5">
			<form className="mb-5">
				<div className="display-6">Edit your Pattern:</div>
				<div className="form-group flex-grow-1 d-flex flex-column">
					<textarea
						required
						maxLength={100}
						value={title}
						onChange={e => setTitle(e.target.value)}
						className="w-100 rounded my-2 py-1 text-large"
						id="pattern-title"
						placeholder="Title..."
					/>
				</div>
				<textarea
					className="w-100 rounded my-4"
					rows={15}
					name="content"
					required
					maxLength={10000}
					value={content}
					onChange={e => setContent(e.target.value)}
				/>
				<div>
					<label htmlFor="tags">Choose your tags:</label>
					<AllTagsContainer
						selectedTags={selectedTags}
						setSelectedTags={setSelectedTags}
					/>
				</div>
				<button className="btn btn-primary" onClick={handleUpdate}>
					Update the pattern~
				</button>
			</form>
			<img
				src="https://knitters-fren.s3.ca-central-1.amazonaws.com/website-images/drawing-nanachi.png"
				style={{
					position: 'absolute',
					top: '70%',
					right: '4%',
					width: '250px',
				}}
				alt="Nanachi"
			/>
		</div>
	);
};

export default UpdatePattern;
