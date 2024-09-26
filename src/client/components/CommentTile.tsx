import dayjs from 'dayjs';
import React from 'react';

import { PatternComment } from '../utils/types';

const CommentTile = ({ comments }: { comments: PatternComment[] }) => {
	return (
		<>
			{comments.map(comment => (
				<div className="container container-fliud mx-auto w-80 my-3 px-5 py-3 rounded bg-soft d-flex flex-column">
					<div className="h5">{comment.username}</div>
					<div className="my-2">{comment.content}</div>
					<div className="align-self-end">
						<small>
							{dayjs(comment.created_at).format('MMMM D, YYYY h:mm A')}
						</small>
					</div>
				</div>
			))}
		</>
	);
};

export default CommentTile;
