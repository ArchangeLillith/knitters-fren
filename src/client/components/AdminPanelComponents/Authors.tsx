import React, { Dispatch, SetStateAction } from "react";
import { AdminState } from "../../utils/types";
import authorService from "../../services/author";
import { GiThorHammer } from "react-icons/gi";
import Modal from "../Modal";

//Refactor if I'm only using that banned author state internally, maybe we should pull it out of the admin state???

interface AuthorsProps {
	adminState: AdminState;
	setAdminState: Dispatch<SetStateAction<AdminState>>;
}

const Authors: React.FC<AuthorsProps> = ({ adminState, setAdminState }) => {
	const banHammer = (banButton: React.MouseEvent<HTMLButtonElement>) => {
		const target = banButton.currentTarget; // Use currentTarget for better reliability
		setAdminState((prev) => ({
			...prev,
			showModal: true,
			banAuthor: {
				id: target.id,
				username: target.name,
			},
		}));
	};
	const closeModal = () => {
		setAdminState((prev) => ({ ...prev, showModal: false }));
	};

	const banAuthor = async () => {
		const banned = await authorService.banAuthor(adminState.banAuthor.id);
		console.log(`BANND`, banned);
		if (banned.affectedRows > 0) {
			alert(adminState.banAuthor.username + " has been BANNED");
			setAdminState((prev) => ({
				...prev,
				banAuthor: { id: "", username: "" },
				showModal: false,
			}));
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
					{adminState.authors?.map((author) => (
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
				{adminState.showModal && adminState.banAuthor.id !== "" && (
					<Modal>
						<div className="align-self-center h3 text-color-light">
							You've chosen to call upon Nanachi to ban...
						</div>
						<div className="d-flex flex-row align-items-center justify-content-center">
							<div className="d-flex flex-column background-light">
								<div className="align-self-end h4">
									<i>{adminState.banAuthor.username}</i>
								</div>
							</div>
							<img
								style={{ width: "300px", marginRight: "0px" }}
								src="/images/nanachi-ban-hammer.png"
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
