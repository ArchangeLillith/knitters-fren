import { useEffect, useMemo, useRef } from 'react';

import useFetchData from './useFetchData';
import { PatternObject, SearchPageState } from '../utils/types'; // Adjust the import path if needed

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

	const fetchConfigs = useMemo(() => {
		if (!queryString) return [];

		const urlMap: Record<string, string> = {
			author: `/api/search/author/${queryString}`,
			content: `/api/search/content/${queryString}`,
			title: `/api/search/title/${queryString}`,
		};

		const url = urlMap[searchType];
		if (!url) return [];
		return [{ key: 'foundPatterns', url }];
	}, [queryString, searchType]);

	const { data, loading, error } = useFetchData<{
		foundPatterns: PatternObject[];
	}>(fetchConfigs);

	useEffect(() => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}

		timeoutRef.current = setTimeout(() => {
			if (queryString === '') {
				return;
			}
			console.log(`DATA from bouncer`, data);
			if (!loading && !error) {
				setPageState(prev => ({
					...prev,
					foundPatterns: data.foundPatterns,
					searchTriggered: true,
				}));
			} else if (error) {
				setPageState(prev => ({
					...prev,
					foundPatterns: [],
					searchTriggered: true,
				}));
			}
		}, 500); //The timing adjust for the debouncer~

		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, [queryString, searchType, setPageState]);
};
