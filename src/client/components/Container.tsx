import React, { useEffect, useState } from 'react';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
	optional?: boolean;
}

const Container = ({ children }: ContainerProps) => {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsVisible(true);
		}, 50); // Slight delay to ensure all content is mounted

		return () => clearTimeout(timer);
	}, []);

	return (
		<div
			className={`fade-in-wrapper container ${isVisible ? 'visible' : ''}`}
			style={{ fontFamily: 'Garamond, serif', paddingBottom: '150px' }}
		>
			{children}
		</div>
	);
};

export default Container;
