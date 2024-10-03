import dayjs from 'dayjs';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

import AssociatedTagList from '../components/AssociatedTagList';
import { AuthContext } from '../components/AuthComponents/AuthProvider';
import CommentTile from '../components/CommentTile';
import Container from '../components/Container';
import CommentForm from '../components/PatternComponents/CommentForm';
import FavIcon from '../components/PatternComponents/FavIcon';
import LockIcon from '../components/PatternComponents/LockIcon';
import useFetchData from '../hooks/useFetchData';
import patternService from '../services/pattern';
import { PatternComment, PatternObject, loadingPattern } from '../utils/types';

const PatternDetails = () => {
	const { authState } = useContext(AuthContext);
	const { id } = useParams();
	const navigate = useNavigate();
	const [author, setAuthor] = useState<string>('');
	const [comments, setComments] = useState<PatternComment[]>([]);
	const [pattern, setPattern] = useState<PatternObject>(loadingPattern);

	type FetchDataResponse = {
		patternObject: PatternObject[];
		comments: PatternComment[];
	};

	const fetchConfigs = useMemo(
		() => [
			{ key: 'patternObject', url: `/api/patterns/${id}` },
			{ key: 'comments', url: `/api/comments/${id}` },
		],
		[id]
	);

	const { data, loading, error } =
		useFetchData<FetchDataResponse>(fetchConfigs);

	useEffect(() => {
		console.log('Fetched pattern:', data);
		if (!data || !data.patternObject) return;
		const fetchedPattern = data.patternObject;
		setPattern(fetchedPattern[0]);
		setAuthor(fetchedPattern[0].username);
		setComments(data.comments);
	}, [data]);

	/**
	 * This is a one stop shop for deletion of a pattern. It calls the delete function for the joint table as well, because you can't delete the pattern without first cleaing the joint table anyways
	 */
	const handleDelete = () => {
		if (!id) return;
		patternService
			.destroyPattern(id)
			.then(() => navigate('/patterns'))
			.catch(e => alert(e));
	};

	if (loading) return;
	if (error) return;

	return (
		id && (
			<Container>
				<div className="container container-fliud mx-auto w-80 my-3 px-5 py-3 rounded bg-soft">
					{pattern && (
						<div className="my-2 mx-4">
							<div className="m-2">
								{/* Title and Icons */}
								<div className="d-flex flex-row justify-content-between align-items-center">
									<div className="d-flex flex-row align-items-center">
										<div className="display-4 my-3">{pattern.title}</div>
										{pattern.paid === 'true' && <LockIcon size={30} />}
									</div>
									{authState.authenticated && (
										<FavIcon patternId={pattern.id} size={30} />
									)}
								</div>

								{/* Pattern PDF Link */}
								{pattern.link !== '' && (
									<object
										width="100%"
										height="1000"
										data={pattern.link}
										type="application/pdf"
										aria-label="pattern pdf"
									></object>
								)}

								{/* Pattern Content */}
								<p key={`pattern-card-para-${pattern.id}`}>{pattern.content}</p>
								<small>Author: {author}</small>
								<small
									className="m-2"
									key={`pattern-card-created-at-${pattern.id}`}
								>
									<i>
										Submitted:{' '}
										{dayjs(pattern.created_at).format('MMMM D, YYYY')}
									</i>
								</small>
								<br />

								{/* Associated Tags */}
								{pattern.tags && <AssociatedTagList tags={pattern.tags} />}

								{/* Author Actions (Delete / Update Buttons) */}
								{pattern.author_id === authState.authorData?.id && (
									<div className="ms-auto">
										<button
											onClick={handleDelete}
											className="btn btn-outline-primary btn-border mx-3 p-2"
										>
											Delete
										</button>
										<Link
											to={`/patterns/${id}/update`}
											className="btn btn-outline-primary btn-border p-2"
										>
											Update~
										</Link>
									</div>
								)}
							</div>
						</div>
					)}
				</div>

				{/* Comment Section */}
				<CommentForm
					authState={authState}
					id={id}
					setComments={setComments}
					pattern={pattern}
				/>
				<CommentTile comments={comments} />
			</Container>
		)
	);
};

export default PatternDetails;
