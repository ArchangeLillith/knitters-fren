import dayjs from 'dayjs';
import React from 'react';
import { Link } from 'react-router-dom';

import { PatternObject } from '../../utils/types';
import AssociatedTagList from '../AssociatedTagList';
import Container from '../Container';

interface SearchResultsProps {
	foundPatterns: PatternObject[];
}

const SearchResults = ({ foundPatterns }: SearchResultsProps) => {
	return (
		<Container bottomPadding={0}>
			{foundPatterns.map((pattern, index) => {
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
										to={`/patterns/${pattern.id}`}
									>
										{pattern.title}
									</Link>
									<p key={`pattern-card-para-${pattern.id}`}>
										{pattern.content.slice(0, 300)}...
									</p>
								</div>
								<div className="h-80">
									<br />
									<AssociatedTagList tags={pattern.tags} />
									<small className="ms-auto">
										{dayjs(pattern.created_at).format('MMMM D, YYYY')}
									</small>
								</div>
							</div>
						</div>
					</div>
				);
			})}
		</Container>
	);
};

export default SearchResults;
