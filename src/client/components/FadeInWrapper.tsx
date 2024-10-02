import React, { useState, useEffect } from 'react';

interface FadeInWrapperProps {
	children: React.ReactNode;
}

const FadeInWrapper: React.FC<FadeInWrapperProps> = ({ children }) => {

	return (
		
			{children}
		</div>
	);
};

export default FadeInWrapper;
