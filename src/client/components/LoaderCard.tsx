import React, { useState, useEffect } from "react";

interface LoaderCardProps {
	length?: number;
}

const LoaderCard = ({ length }: LoaderCardProps) => {
	const [blankLoader, setBlankLoader] = useState<boolean>(true);

	//This is going to set the state after 500ms, but if the real meat of our website has been loaded, this isn't actually mounted so the state it's trying to update doesn't exist, leading to this component never being rendered.
	//This solves the ugly flicker of this component if the load goes really fast
	useEffect(() => {
		const timer = setTimeout(() => {
			setBlankLoader(false);
		}, 500);

		//Cleanup to clear the timer if the load takes faster than the 500ms
		return () => {
			clearTimeout(timer);
		};
	}, []);

	if (blankLoader) return <div></div>;
	return (
		<div className="flex flex-col items-center justify-center min-h-screen px-2 lg:px-0 ">
			{Array(length)
				.fill("")
				.map((_, index) => (
					<div
						key={`loader-card-${index}`}
						className="w-full mb-5 shadow-xl card bg-base-100"
					>
						<div className="card-body">
							<progress className="w-2/3" value="0" max="100"></progress>
							<progress className="w-1/3" value="0" max="100"></progress>
							<progress className="w-full" value="0" max="100"></progress>
							<progress className="w-1/2" value="0" max="100"></progress>
							<progress className="w-1/4" value="0" max="100"></progress>
							<progress className="w-2/3" value="0" max="100"></progress>
						</div>
					</div>
				))}
		</div>
	);
};

export default LoaderCard;
