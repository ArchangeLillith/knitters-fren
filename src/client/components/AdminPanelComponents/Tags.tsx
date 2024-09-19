import React from "react";
import { AdminState } from "../../utils/types";

const Tags: React.FC<{ adminState: AdminState }> = ({ adminState }) => {
	return (
		<>
			<h2 className="accordion-header">
				<button
					className="accordion-button collapsed"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#panelsStayOpen-collapseThree"
					aria-expanded="false"
					aria-controls="panelsStayOpen-collapseThree"
				>
					Tags
				</button>
			</h2>
			<div
				id="panelsStayOpen-collapseThree"
				className="accordion-collapse collapse"
			>
				<div className="accordion-body">
					<div className="d-flex flex-wrap justify-content-start">
						{adminState.tags?.map((tag) => (
							<div
								key={tag.id}
								className="tag-card p-2 m-2 border  tag-tile"
								style={{ width: "150px", textAlign: "center" }}
							>
								<p>{tag.name}</p>
								<small>ID: {tag.id}</small>
								<div className="mt-2">
									<button className="btn btn-primary btn-sm mx-1">
										Update
									</button>
									<button className="btn btn-danger btn-sm mx-1">Delete</button>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default Tags;
