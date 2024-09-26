import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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
	const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
	const [allTags, setAllTags] = useState<Tag[]>([
		{ id: 0, name: 'Loading...' },
	]);

	// Memoize the fetch configuration to prevent re-renders causing unnecessary re-fetches
	const fetchConfigs = useMemo(
		() => [
			{ key: 'patternObject', url: `/api/patterns/${id}` },
			{ key: 'tags', url: `/api/tags/` },
		],
		[id]
	);

	const { data, loading, error } = useFetchData<{
		patternObject: PatternObject;
		tags: Tag[];
	}>(fetchConfigs);

	useEffect(() => {
		if (!data || !data.patternObject || !data.tags) return;
		const fetchedPattern: Pattern = data.patternObject.pattern;
		const fetchedAssociatedTags: Tag[] = data.patternObject.tags;
		const fetchedTags: Tag[] = data.tags;

		setAllTags(fetchedTags);
		setPattern(fetchedPattern);
		setTitle(fetchedPattern.title);
		setContent(fetchedPattern.content);
		setSelectedTags(fetchedAssociatedTags);
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

		const tagIds = selectedTags.map(tag => tag.id);
		if (tagIds.length > 0) {
			patternTags
				.addNewTags({ pattern_id: pattern.id, tag_ids: tagIds })
				.then(() => navigate(`/patterns/${id}`))
				.catch(() => console.log(`ERROR`));
		}
		navigate(`/patterns/${id}`);
	};

	const tagToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
		// eslint-disable-next-line no-shadow
		const { id, name } = e.target;
		setSelectedTags(prevTags => {
			const tagIndex = prevTags.findIndex(tag => tag.name === name);
			if (tagIndex === -1) {
				return [...prevTags, { id: parseInt(id), name }];
			} else {
				return prevTags.filter(tag => tag.name !== name);
			}
		});
	};

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
					<div
						id="tags-div"
						className="form-control-lg form-control flex-grow-1 bg-soft border-0"
					>
						{allTags.map((tag: Tag) => (
							<div
								className="m-1 d-inline-flex btn-group border-0"
								role="group"
								aria-label="Basic checkbox toggle button group"
								key={`${tag.id}-container`}
							>
								<div className={`tags-container-${tag.name}`}>
									<input
										type="checkbox"
										checked={selectedTags.some(
											selectedTag => selectedTag.name === tag.name
										)}
										className="btn-check"
										id={`${tag.id}`}
										autoComplete="off"
										onChange={tagToggle}
										name={tag.name}
									/>
									<label
										className="btn btn-outline-primary"
										htmlFor={`${tag.id}`}
									>
										{tag.name}
									</label>
								</div>
							</div>
						))}
					</div>
				</div>
				<button className="btn btn-primary" onClick={handleUpdate}>
					Update the pattern~
				</button>
			</form>
			<img
				src="/images/drawing-nanachi.png"
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
