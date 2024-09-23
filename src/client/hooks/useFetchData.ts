import { useState, useEffect } from 'react';

import baseService from '../services/base';

type FetchConfig = {
	key: string;
	url: string;
};

const useFetchData = <T extends Record<string, unknown>>(
	configs: FetchConfig[]
) => {
	const [data, setData] = useState<T>({} as T);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<null | string>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const responses = await Promise.all(
					configs.map(config => baseService.get(config.url))
				);

				const fetchedData = configs.reduce((acc, config, index) => {
					(acc as Record<string, unknown>)[config.key] = responses[index];
					return acc;
				}, {} as T);

				setData(fetchedData);
			} catch (err) {
				console.error(err);
				setError('Failed to load data');
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [configs]);

	return { data, loading, error };
};

export default useFetchData;
