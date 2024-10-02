import { useEffect, useMemo, useRef, useState } from 'react';

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
	const [debouncedQuery, setDebouncedQuery] = useState('');

	// Create the fetch config only when the debouncedQuery is available
	const fetchConfigs = useMemo(() => {
		// Ensure no fetch when debouncedQuery is empty
		if (!debouncedQuery) return [];

		const urlMap: Record<string, string> = {
			author: `/api/search/author/${debouncedQuery}`,
			content: `/api/search/content/${debouncedQuery}`,
			title: `/api/search/title/${debouncedQuery}`,
		};

		const url = urlMap[searchType];
		return url ? [{ key: 'foundPatterns', url }] : [];
	}, [debouncedQuery, searchType]);

	// Only call useFetchData if the fetchConfigs have content
	const { data, loading, error } = useFetchData<{
		foundPatterns: PatternObject[];
	}>(fetchConfigs.length > 0 ? fetchConfigs : null); // Ensure fetchConfigs is null when there's no query

	// Debouncing effect for setting the debounced query
	useEffect(() => {
		// Reset the debounced query if the input is cleared
		if (!queryString || queryString.trim() === '') {
			setDebouncedQuery(''); // Reset the debounced query to stop further fetches
			return;
		}

		// Clear existing timeout if it's still running
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}

		// Set a new timeout for the debouncer
		timeoutRef.current = setTimeout(() => {
			setDebouncedQuery(queryString); // The call that we're debouncing
		}, 500); // The timing handler for the debouncer

		// Cleanup the timeout
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, [queryString]);

	// Effect to handle the response once the data is fetched
	useEffect(() => {
		if (debouncedQuery === '') return; // Prevent fetching if no debounced query

		// Only update the page state when the fetch is done and there is no error
		if (!loading && data && !error) {
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
	}, [debouncedQuery, data, loading, error, setPageState]); // Respond to changes in fetch results
};
