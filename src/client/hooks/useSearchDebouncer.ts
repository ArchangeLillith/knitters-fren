import { useEffect, useRef } from 'react';

import searchService from '../services/search';
import { SearchFunction, PatternObject, SearchPageState } from '../utils/types'; // Adjust the import path if needed

interface useSearchDebouncerProps {
	pageState: SearchPageState;
	setPageState: React.Dispatch<React.SetStateAction<SearchPageState>>;
}

/**
 *🌈⭐ The debouncer ⭐🌈
 **/
export const useSearchDebouncer = ({
	pageState,
	setPageState,
}: useSearchDebouncerProps) => {
	const { queryString, searchType } = pageState;
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}

		timeoutRef.current = setTimeout(() => {
			if (queryString === '') {
				return;
			}

			const searchFunctions: { [key: string]: SearchFunction } = {
				tag: () => Promise.resolve([]),
				author: searchService.findByAuthor,
				content: searchService.findByContent,
				title: searchService.findByTitle,
			};

			const searchFunction = searchFunctions[searchType];

			if (searchFunction) {
				searchFunction(queryString)
					.then((patterns: PatternObject[]) => {
						console.log(`Patterns`, patterns);
						if (patterns.length === 0) {
							setPageState(prev => ({
								...prev,
								foundPatterns: [],
								searchTriggered: true,
							}));
						} else {
							setPageState(prev => ({
								...prev,
								foundPatterns: patterns,
								searchTriggered: true,
							}));
						}
					})
					.catch(() => {
						setPageState(prev => ({
							...prev,
							foundPatterns: [],
							searchTriggered: true,
						}));
					});
			}
		}, 500); //The timing adjust for the debouncer~

		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, [queryString, searchType, setPageState]);
};
