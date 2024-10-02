import { useState, useEffect } from 'react';

import baseService from '../services/base';

type FetchConfig = {
	key: string;
	url: string;
};

const useFetchData = <T extends Record<string, unknown>>(
	configs: FetchConfig[] | null,
	authLoading?: boolean
) => {
	console.log(`useFetch enterede`);
	const [data, setData] = useState<T>({} as T);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<null | string>(null);

	useEffect(() => {
		// Only fetch if authLoading is false
		if (authLoading || configs === null) {
			setLoading(true); // Optional: you can set the loading state explicitly here
			return; // Do not proceed with fetch if auth is still loading
		}

		const fetchData = async () => {
			try {
				const responses = await Promise.all(
					configs.map(config => baseService.get(config.url))
				);

				const fetchedData = configs.reduce((acc, config, index) => {
					(acc as Record<string, unknown>)[config.key] = responses[index];
					return acc;
				}, {} as T);
				console.log(`Fetched data in fetch`, fetchedData);
				setData(fetchedData);
			} catch (err) {
				console.log(`ERROR in fetch,`, err);
				setError('Failed to load data');
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, [configs, authLoading]);

	return { data, loading, error };
};

export default useFetchData;
