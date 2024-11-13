import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react';

import { useSearchDebouncer } from '../../hooks/useSearchDebouncer';
import { SearchPageState as PageState } from '../../utils/types';

interface StringSearchPanelProps {
	pageState: PageState;
	setPageState: Dispatch<SetStateAction<PageState>>;
}

const StringSearchPanel: React.FC<StringSearchPanelProps> = ({
	pageState,
	setPageState,
}) => {
	const inputRef = useRef<HTMLInputElement>(null);

	/**
	 * Use 🌈⭐ The debouncer ⭐🌈 custom hook
	 */
	useSearchDebouncer({ pageState, setPageState });

	/**
	 * Focusing on the box on render of box
	 */
	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, []);

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			e.preventDefault(); // Prevent form submission on Enter
		}
	};

	const queryStringChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setPageState(prev => ({
			...prev,
			queryString: e.target.value,
		}));
	};

	return (
		<>
			<form>
				<div className="d-flex flex-column justify-content-center align-items-center form-group">
					<h1 className="text-center mt-5 font-color-primary">
						What do you want to find?
					</h1>
					<input
						ref={inputRef}
						className="w-25 form-control"
						onChange={queryStringChange}
						onKeyDown={handleKeyDown}
						value={pageState.queryString}
						placeholder="Start typing!"
					></input>
				</div>
			</form>
		</>
	);
};

export default StringSearchPanel;
