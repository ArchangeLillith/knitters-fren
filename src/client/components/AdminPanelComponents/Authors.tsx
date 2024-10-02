/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import { GiThorHammer } from 'react-icons/gi';

import authorService from '../../services/author';
import { AdminPageProps } from '../../utils/types';
import Modal from '../Modal';

const Authors: React.FC<AdminPageProps> = ({ state, setState }) => {
	const [banTarget, setBanTarget] = useState<{
		id: string;
		username: string;
	}>({ id: '', username: '' });

	/**
	 *
	 * @param banButton - ban button next to author
	 * Grabs user from button context and adds to the state, then calls to parent state to change visibility of modal
	 */
	const banHammer = (banButton: React.MouseEvent<HTMLButtonElement>) => {
		const { id, name } = banButton.currentTarget;
		setBanTarget({ id, username: name });
		setState(prev => ({ ...prev, showModal: true }));
	};

	const closeModal = () => {
		setState(prev => ({ ...prev, showModal: false }));
	};

	/**
	 * On confirm of ban, awaits the database call to do backend ban author stuff (reassigns their patterns to a 'BannedAuthor' profile and then populates a banned table with their information). If sucessful, alerts that the author has been banned and closes the modal
	 */
	const banAuthor = async () => {
		if (!banTarget) {
			return;
		}
		try {
			const banned = await authorService.banAuthor(banTarget.id);
			if (banned.affectedRows > 0) {
				alert(`${banTarget.username} has been BANNED`);
				setBanTarget({ id: '', username: '' });
				setState(prev => ({
					...prev,
					showModal: false,
				}));
			}
		} catch (error) {
			console.error('Failed to ban author:', error);
		}
	};

	return (
		<>
			<h2 className="accordion-header">
				<button
					className="accordion-button collapsed"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#panelsStayOpen-collapseFour"
					aria-expanded="false"
					aria-controls="panelsStayOpen-collapseFour"
				>
					Authors
				</button>
			</h2>
			<div
				id="panelsStayOpen-collapseFour"
				className="accordion-collapse collapse"
			>
				<div className="accordion-body">
					{state.authors?.map(author => (
						<div
							key={`wrapper-for-${author.id}`}
							className="d-flex flex-row align-items-center justify-content-center"
						>
							<div key={`${author.id}-text`} className="h3">
								{author.username}
							</div>
							<button
								key={`${author.id}-button`}
								id={author.id}
								name={author.username}
								onClick={banHammer}
							>
								<GiThorHammer />
							</button>
						</div>
					))}
				</div>
				{state.showModal && banTarget.id !== '' && (
					<Modal>
						<div className="align-self-center h3 text-color-light">
							You've chosen to call upon Nanachi to ban...
						</div>
						<div className="d-flex flex-row align-items-center justify-content-center">
							<div className="d-flex flex-column background-light">
								<div className="align-self-end h4">
									<i>{banTarget.username}</i>
								</div>
							</div>
							<img
								style={{ width: '300px', marginRight: '0px' }}
								src="https://knitters-fren.s3.ca-central-1.amazonaws.com/website-images/nanachi-ban-hammer.png"
								alt="banning!"
								className="ban-hammer-nanachi "
							/>
						</div>
						<button
							className="button btn-primary modal-button mb-3"
							onClick={banAuthor}
						>
							Good job Nanachi~!
						</button>
						<button
							className="button btn-primary modal-button"
							onClick={closeModal}
						>
							Wrong one Nanachi. Nanchi.... Wait, hold on a sec, Nanachi DON'T
							SWI-
						</button>
					</Modal>
				)}
			</div>
		</>
	);
};

export default Authors;
