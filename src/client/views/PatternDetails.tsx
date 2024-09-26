import dayjs from 'dayjs';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { RiLockLine } from 'react-icons/ri';
import { useNavigate, useParams, Link } from 'react-router-dom';

import { AuthContext } from '../components/AuthComponents/AuthProvider';
import CommentTile from '../components/CommentTile';
import TagButton from '../components/TagButton';
import useFetchData from '../hooks/useFetchData';
import commentService from '../services/comments';
import patternService from '../services/pattern';
import { loadingPattern } from '../utils/patterns.utils';
import { Pattern, PatternComment, Tag } from '../utils/types';

const PatternDetails = () => {
	const { authState } = useContext(AuthContext);
	const { id } = useParams();
	const navigate = useNavigate();
	const [author, setAuthor] = useState<string>('');
	const [tags, setTags] = useState<Tag[] | null>([]);
	const [content, setContent] = useState<string>('');
	const [comments, setComments] = useState<PatternComment[]>([]);
	const [pattern, setPattern] = useState<Pattern>(loadingPattern);

	type FetchDataResponse = {
		tags: Tag[];
		pattern: Pattern;
		comments: PatternComment[];
	};

	const fetchConfigs = useMemo(
		() => [
			{ key: 'tags', url: `/api/pattern_tags/${id}` },
			{ key: 'pattern', url: `/api/patterns/${id}` },
			{ key: 'comments', url: `/api/comments/${id}` },
		],
		[]
	);

	const { data, loading, error } =
		useFetchData<FetchDataResponse>(fetchConfigs);

	useEffect(() => {
		if (!data || !data.pattern) return;
		console.log(`data`, data);

		setPattern(data.pattern);
		setAuthor(data.pattern.username);
		setTags(data.tags);
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

	const handleCommentSubmit = (
		submitButton: React.MouseEvent<HTMLButtonElement>
	) => {
		submitButton.preventDefault();
		if (!authState.id || !id) return;
		commentService.addNewComment(pattern.id, authState.id, content);
		//needed, we can't use a hook here so we have to use the comment service one
		commentService
			.getAllCommentsByPattern(id)
			.then(result => setComments(result))
			.catch();
		setContent('');
	};

	if (loading) <p>Loadig....</p>;
	if (error) <p>error....</p>;

	return (
		<>
			<div className="container container-fliud mx-auto w-80 my-3 px-5 py-3 rounded bg-soft">
				{pattern && (
					<div
						className="my-2 mx-4"
						key={`pattern-card-outer-wrapper-${pattern.id}`}
					>
						<div className="m-2" key={`pattern-card-inner-${pattern.id}`}>
							<div className="d-flex flex-row justify-content-between align-items-center">
								<div
									className="display-4 my-3"
									key={`pattern-card-h3-${pattern.id}`}
								>
									{pattern.title}
								</div>
								{pattern.paid === 'true' && (
									<div
										style={{
											display: 'inline-block',
											position: 'relative',
											marginRight: '30px',
										}}
									>
										<span className="tooltip-icon-lock">
											<RiLockLine size={30} />
										</span>
										<div className="tooltip-text">
											This pattern is a paid pattern, only you can see this!
										</div>
									</div>
								)}
							</div>
							{pattern.link !== '' && (
								<object
									width="100%"
									height="1000"
									data={pattern.link}
									type="application/pdf"
								>
									{' '}
								</object>
							)}
							<p key={`pattern-card-para-${pattern.id}`}>{pattern.content}</p>
							<small>Author: {author}</small>
							<small
								className="m-2"
								key={`pattern-card-created-at-${pattern.id}`}
							>
								<i>
									Submitted: {dayjs(pattern.created_at).format('MMMM D, YYYY')}
								</i>
							</small>
							<br />
							<div className="d-flex mb-3">
								{tags && (
									<>
										{tags.map((tag: Tag) => (
											<div
												className="m-1 d-inline-flex btn-group"
												role="group"
												aria-label="Basic checkbox toggle button group"
												key={`${tag.id}-container`}
											>
												<TagButton tag={tag} />
											</div>
										))}
									</>
								)}

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
							</div>
						</div>
					</div>
				)}
			</div>
			<div className="container container-fliud mx-auto w-80 my-3 px-5 py-3 rounded bg-soft">
				<form>
					<label htmlFor="comment-area">Comment:</label>
					<textarea
						value={content}
						onChange={event => setContent(event.target.value)}
						className="form-control"
						id="comment-area"
						rows={4}
					/>
					<button onClick={handleCommentSubmit}>Submit</button>
				</form>
			</div>
			<CommentTile comments={comments} />
		</>
	);
};

export default PatternDetails;
