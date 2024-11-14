import React from 'react';

import DateSnippet from './DateSnippet';
import { PatternComment } from '../utils/types';

const CommentTile = ({ comments }: { comments: PatternComment[] }) => {
	return (
		<>
			{comments.map(comment => (
				<div
					key={`comment-${comment.id}-pattern-${comment.pattern_id}`}
					className="container container-fliud mx-auto w-80 my-3 px-5 py-3 rounded bg-soft d-flex flex-column"
				>
					<div className="h5">{comment.username}</div>
					<div className="my-2">{comment.content}</div>
					<div className="align-self-end">
						<DateSnippet createdAt={comment.created_at} />
					</div>
				</div>
			))}
		</>
	);
};

export default CommentTile;
