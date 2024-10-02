import React, { useState } from 'react';

import commentService from '../../services/comments';
import { AuthState, PatternComment, PatternObject } from '../../utils/types';

interface CommentFormProps {
	authState: AuthState;
	id: string;
	pattern: PatternObject;
	setComments: (value: React.SetStateAction<PatternComment[]>) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({
	authState,
	id,
	pattern,
	setComments,
}) => {
	const [content, setContent] = useState<string>('');
	const handleCommentSubmit = (
		submitButton: React.MouseEvent<HTMLButtonElement>
	) => {
		submitButton.preventDefault();
		if (!authState.authorData?.id || !id) return;
		commentService.addNewComment(pattern.id, authState.authorData.id, content);

		//needed, we can't use a hook here so we have to use the comment service one
		commentService
			.getAllCommentsByPattern(id)
			.then(result => setComments(result))
			.catch();
		setContent('');
	};

	return (
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
	);
};

export default CommentForm;
