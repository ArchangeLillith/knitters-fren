import React from 'react';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
	optional?: boolean;
}

const Container = ({ children }: ContainerProps) => {
	return (
		<section
			className="container"
			style={{ fontFamily: "Garamond, serif", paddingBottom: "150px" }}
		>
			{children}
		</section>
	);
};

export default Container;
