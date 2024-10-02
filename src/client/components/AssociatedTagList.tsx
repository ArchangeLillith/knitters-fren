import React from 'react';

import TagButton from './TagButton';
import { Tag } from '../utils/types';

interface TagListProps {
	tags: Tag[];
}
const TagList: React.FC<TagListProps> = ({ tags }) => {
	return (
		<div className="d-flex align-items-end h-auto">
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
	);
};

export default TagList;
