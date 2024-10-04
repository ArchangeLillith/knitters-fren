import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import PatternDetails from '../components/AddPatternComponents/PatternDetails';
import PatternLink from '../components/AddPatternComponents/PatternLink';
import PatternPaid from '../components/AddPatternComponents/PatternPaid';
import PatternTitle from '../components/AddPatternComponents/PatternTitle';
import AllTagsContainer from '../components/AllTagsContainer';
import { AuthContext } from '../components/AuthComponents/AuthProvider';
import AuthWrapper from '../components/AuthComponents/AuthWrapper';
import Container from '../components/Container';
import patternService from '../services/pattern';
import patternTags from '../services/pattern-tags';
import {
	Pattern,
	AddPatternPageState as PageState,
	NewPattern,
} from '../utils/types';

//Refactor we could add a loading state! Thisis nice in prod, we won't see it in dev prob, but it's good UX
const AddPattern = () => {
	const navigate = useNavigate();
	const { authState } = useContext(AuthContext);

	//Initialize state
	const [state, setState] = useState<PageState>({
		title: '',
		paid: 'false',
		content: '',
		link: '',
		selectedTags: [],
		tagsActive: false,
	});

	//Create the DTO
	const newPatternDTO: NewPattern = {
		id: uuidv4(),
		title: state.title,
		content: state.content,
		author_id: authState.authorData?.id || '',
		link: state.link,
		paid: state.paid,
	};

	/**
	 * @param submitButton - The submit button clicked to fire the submission of the pattern
	 * Formats the data of the tags into what the backend expects and throws a request to the server to add the pattern to the patterns table. If this succeeds, then the tags are added associated with the newly created patternId into the pattern_tags table. Then the page nevigates to the pattern that was just created.
	 */
	const handleSubmit = async (
		submitButton: React.MouseEvent<HTMLButtonElement>
	) => {
		submitButton.preventDefault();
		const newArr = state.selectedTags.map(tag => tag.id);
		let patternId: string;
		try {
			const pattern: Pattern =
				await patternService.addNewPattern(newPatternDTO);
			console.log(`Pattern,`, pattern);
			patternId = pattern.id;
			if (newArr.length > 0) {
				console.log(`Adding tags because there are some:`, newArr);
				patternTags.addNewTags({ pattern_id: patternId, tag_ids: newArr });
			}
			navigate(`/patterns/${patternId}`);
		} catch (error) {
			alert(error);
		}
	};

	return (
		<AuthWrapper>
			<Container bottomPadding={10}>
				<img
					src="https://knitters-fren.s3.ca-central-1.amazonaws.com/website-images/teacup-nanachi.png"
					alt="teacup-nanachi"
					style={{
						width: '250px',
						position: 'absolute',
						right: '1%',
						top: '12%',
					}}
				/>
				<form className="d-flex flex-column mt-4 pt-4">
					<div className="form-group d-flex flex-column">
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
							selectedTags={state.selectedTags}
							setSelectedTags={setState}
						/>
					</div>
					<div className="d-flex justify-content-center align-items-center">
						<button
							className="btn btn-primary py-1 w-25 my-3"
							onClick={handleSubmit}
						>
							Add Pattern~
						</button>
					</div>
				</form>
			</Container>
		</AuthWrapper>
	);
};

export default AddPattern;
