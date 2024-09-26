import dayjs from 'dayjs';
import React from 'react';
import { Link } from 'react-router-dom';

import { PatternObject } from '../../utils/types';
import AssociatedTagList from '../AssociatedTagList';

interface SearchResultsProps {
	foundPatterns: PatternObject[];
}

const SearchResults = ({ foundPatterns }: SearchResultsProps) => {
	return (
		<div>
			{foundPatterns.map((object, index) => {
				return (
					<div
						className="border rounded w-100 bg-soft m-2 border-pink"
						key={`patternCard-${index}`}
					>
						<div className="my-2 mx-4 d-flex">
							<div className="m-2 d-flex flex-column">
								<div>
									<Link
										className="font-color-primary text-decoration-none"
										style={{ fontSize: '25px' }}
										to={`/patterns/${object.pattern.id}`}
									>
										{object.pattern.title}
									</Link>
									<p key={`pattern-card-para-${object.pattern.id}`}>
										{object.pattern.content.slice(0, 300)}...
									</p>
								</div>
								<div className="h-80">
									<br />
									<AssociatedTagList tags={object.tags} />
									<small className="ms-auto">
										{dayjs(object.pattern.created_at).format('MMMM D, YYYY')}
									</small>
								</div>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default SearchResults;
