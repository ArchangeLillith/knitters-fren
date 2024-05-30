import React from "react";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
	optional?: boolean;
}

const Container = ({ children, ...rest }: ContainerProps) => {
	return <section className="container-fluid pl-4">{children}</section>;
};

export default Container;
