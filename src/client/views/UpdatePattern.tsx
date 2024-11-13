import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import PatternDetails from '../components/AddPatternComponents/PatternDetails';
import PatternLink from '../components/AddPatternComponents/PatternLink';
import PatternPaid from '../components/AddPatternComponents/PatternPaid';
import PatternTitle from '../components/AddPatternComponents/PatternTitle';
import AllTagsContainer from '../components/AllTagsContainer';
import useFetchData from '../hooks/useFetchData';
import patternService from '../services/pattern';
import patternTags from '../services/pattern-tags';
import {
	loadingPattern,
	PatternObject,
	Tag,
	PatternModificationState,
} from '../utils/types';

const UpdatePattern = () => {
	const { id } = useParams<string>();
	const navigate = useNavigate();

	//Initialize state
	const [originalPattern, setOriginalPattern] =
		useState<PatternObject>(loadingPattern);
	const [state, setState] = useState<PatternModificationState>({
		title: '',
		paid: 'false',
		content: '',
		link: '',
		selectedTags: [],
		tagsActive: false,
	});
	const [selectedDTO, setSelectedDTO] = useState<{
		tagsActive: boolean;
		selectedTags: Tag[];
	}>({ tagsActive: false, selectedTags: [] });

	// Memoize the fetch configuration to prevent re-renders causing unnecessary re-fetches
	const fetchConfigs = useMemo(
		() => [{ key: 'patternObject', url: `/api/patterns/${id}` }],
		[id]
	);

	const { data, loading, error } = useFetchData<{
		patternObject: PatternObject[];
	}>(fetchConfigs, false);

	useEffect(() => {
		if (!data || !data.patternObject) return;
		console.log(`DATA`, data);
		const fetchedPattern: PatternObject = data.patternObject[0];
		const fetchedAssociatedTags: Tag[] = data.patternObject[0].tags;
		if (fetchedPattern.paid === undefined) {
			fetchedPattern.paid = 'false';
		}
		setOriginalPattern(fetchedPattern);
		setState({
			title: fetchedPattern.title,
			paid: fetchedPattern.paid,
			content: fetchedPattern.content,
			link: fetchedPattern.link,
			selectedTags: fetchedAssociatedTags,
			tagsActive: fetchedAssociatedTags.length > 0,
		});
		setSelectedDTO({
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
		if (!id || !state || !originalPattern) return;
		const patternDTO: PatternObject = {
			...originalPattern,
			title: state.title,
			paid: state.paid || 'false',
			content: state.content,
			link: state.link,
			tags: state.selectedTags,
		};
		patternService.updatePattern(id, patternDTO);

		const tagIds = selectedDTO.selectedTags.map(tag => tag.id);
		if (tagIds.length > 0) {
			patternTags
				.addNewTags({ pattern_id: patternDTO.id, tag_ids: tagIds })
				.then(() => navigate(`/patterns/${id}`))
				.catch(() => console.log(`ERROR`));
		}
	};

	return (
		<div className="container bg-soft rounded p-4 my-5">
			<form className="d-flex flex-column pt-4">
				<div className="form-group d-flex flex-column">
					<div className="display-6">Edit your Pattern:</div>
					<PatternTitle state={state} setState={setState} />
					<div className="d-flex flex-row w-100">
						<PatternLink state={state} setState={setState} />
						<PatternPaid state={state} setState={setState} />
					</div>
				</div>
				<PatternDetails state={state} setState={setState} />
				<div>
					<label htmlFor="tags">Choose your tags:</label>

					<AllTagsContainer
						SelectedDTO={selectedDTO}
						setSelectedTags={setSelectedDTO}
					/>
				</div>
				<div className="d-flex justify-content-center align-items-center">
					<button className="btn btn-primary" onClick={handleUpdate}>
						Update the pattern~
					</button>
				</div>
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
