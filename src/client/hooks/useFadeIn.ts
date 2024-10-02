import { useState, useEffect } from 'react';

export const useFadeIn = (delay: number) => {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsVisible(true);
		}, delay);

		return () => clearTimeout(timer); // Clean up the timer if the component unmounts
	}, [delay]);

	return isVisible;
};
