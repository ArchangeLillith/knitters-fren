import React from "react";
import { AdminState } from "../../utils/types";
import dayjs from "dayjs";

const Comments: React.FC<{ adminState: AdminState }> = ({ adminState }) => {
	return (
		<>
			<h2 className="accordion-header">
				<button
					className="accordion-button collapsed"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#panelsStayOpen-collapseSix"
					aria-expanded="false"
					aria-controls="panelsStayOpen-collapseSix"
				>
					Comments
				</button>
			</h2>
			<div
				id="panelsStayOpen-collapseSix"
				className="accordion-collapse collapse"
			>
				<div className="accordion-body">
					<table className="table">
						<thead>
							<tr>
								<th scope="col">Username</th>
								<th scope="col">Content</th>
								<th scope="col">Pattern</th>
								<th scope="col">Date</th>
							</tr>
						</thead>
						<tbody>
							{adminState.comments?.map((comment) => (
								<tr key={comment.id}>
									<td scope="row">{comment.username}</td>
									<td>{comment.content}</td>
									<td>{comment.pattern_id}</td>
									<td>
										{dayjs(comment.created_at).format("MMMM D, YYYY h:mm A")}
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

export default Comments;
