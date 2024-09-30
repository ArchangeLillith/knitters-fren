import React from 'react';
import { RiLockLine } from 'react-icons/ri';

const LockIcon = ({ size }: { size: number }) => {
	return (
		<div
			style={{
				display: 'inline-block',
				position: 'relative',
				marginLeft: '10px',
			}}
		>
			<span className="tooltip-icon-lock">
				<RiLockLine size={size} />
			</span>
			<div className="tooltip-text">
				This pattern is a paid pattern, only you can see this!
			</div>
		</div>
	);
};

export default LockIcon;
