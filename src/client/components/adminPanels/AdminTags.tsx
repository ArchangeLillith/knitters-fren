import React from "react";
import { AdminState } from "../../utils/types";

const AdminTags: React.FC<{ adminState: AdminState }> = ({ adminState }) => {
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
					<table>
						<tbody>
							<tr>
								<th>Name</th>
								<th>ID</th>
							</tr>
							{adminState.tags?.map((tag) => (
								<tr key={tag.id}>
									<td>{tag.name}</td>
									<td>{tag.id}</td>

									<td>
										<button>Delete</button>
									</td>
									<td>
										<button>Update</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
};

export default AdminTags;
