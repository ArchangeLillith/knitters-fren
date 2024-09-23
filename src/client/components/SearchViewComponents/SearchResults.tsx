import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { PatternObject, Tag } from '../../utils/types';
import TagButton from '../TagButton';

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
										style={{ fontSize: "25px" }}
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

									<div className="d-flex align-items-end h-auto">
										{object.tags.map((tag) => (
											<TagButton tag={tag} />
										))}
										<small className="ms-auto">
											{dayjs(object.pattern.created_at).format("MMMM D, YYYY")}
										</small>
									</div>
								</div>
							</div>
						</div>
					</div>
					// <div key={object.pattern.id} className="card">
					// 	<h2>{object.pattern.title}</h2>
					// 	<div className="tags">
					// 		{object.tags.map((tag) => (
					// 			<span key={tag.id} className="tag">
					// 				{tag.name}
					// 			</span>
					// 		))}
					// 	</div>
					// </div>
				);
			})}
		</div>
	);
};

// return foundPatterns.map((pattern, i) => {
// 	const tags = tagsByPattern?[pattern.id] || []
// 	return(
//
// )})};

export default SearchResults;
