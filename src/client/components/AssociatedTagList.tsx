import React, { useEffect, useState } from 'react';
import { FaCaretDown, FaCaretRight } from 'react-icons/fa';

import TagButton from './TagButton';
import { Tag } from '../utils/types';

interface TagListProps {
	tags: Tag[];
}

const TagList: React.FC<TagListProps> = ({ tags }) => {
	console.log(`Associated tag list:`, tags);

	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const isLargeScreen = window.innerWidth >= 992; // Bootstrap 'lg' breakpoint
		setIsVisible(isLargeScreen);
	}, []);

	// Function to toggle visibility
	const toggleVisibility = () => {
		setIsVisible(!isVisible);
	};
	return (
		<div className="tag-list-container">
			{/* Caret button to toggle visibility, only shown on mobile */}
			<button
				className="d-lg-none caret-toggle btn btn-link show-tags-link"
				onClick={toggleVisibility}
				aria-label="Toggle Tags"
			>
				{isVisible ? (
					<>
						<FaCaretDown /> Hide Tags
					</>
				) : (
					<>
						<FaCaretRight /> Show Tags
					</>
				)}
			</button>

			{/* Tag buttons, visibility controlled by isVisible state */}
			<div className={`tag-buttons ${isVisible ? '' : 'hidden'}`}>
				{tags.length > 0 &&
					tags.map(tag => (
						<div
							className="m-1 d-inline-flex btn-group"
							role="group"
							aria-label="Basic checkbox toggle button group"
							key={`${tag.id}-container`}
						>
							<TagButton tag={tag} key={tag.id} />
						</div>
					))}
			</div>
		</div>
	);
};

export default TagList;
