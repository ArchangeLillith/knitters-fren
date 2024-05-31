import React from "react";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
	optional?: boolean;
}

const Container = ({ children, ...rest }: ContainerProps) => {
	return <section className="container">{children}</section>;
};

export default Container;
