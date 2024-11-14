import React from 'react';
import { RiLockLine } from 'react-icons/ri';

const LockIcon = ({ size }: { size: number }) => {
	// Using clamp to create a fluid size
	const clampedSize = `clamp(15px, ${size / 1.5}px, ${size}px)`;

	return (
		<div
			style={{
				display: 'inline-block',
				position: 'relative',
				marginLeft: '10px',
				paddingBottom: '4px',
			}}
		>
			<span
				className="tooltip-icon-lock"
				style={{
					fontSize: clampedSize,
				}}
			>
				<RiLockLine size={parseInt(clampedSize)} />
			</span>
			<div className="tooltip-text">
				This pattern is a paid pattern, only you can see this!
			</div>
		</div>
	);
};

export default LockIcon;
