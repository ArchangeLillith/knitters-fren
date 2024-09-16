import React from "react";
import { AdminState } from "../../utils/types";
import dayjs from "dayjs";

const AdminLogs: React.FC<{ adminState: AdminState }> = ({ adminState }) => {
	return (
		<>
			<h2 className="accordion-header">
				<button
					className="accordion-button collapsed"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#panelsStayOpen-collapseOne"
					aria-expanded="false"
					aria-controls="panelsStayOpen-collapseOne"
				>
					Most Recent Activity Log
				</button>
			</h2>
			<div
				id="panelsStayOpen-collapseOne"
				className="accordion-collapse collapse"
			>
				<div className="accordion-body">
					<table>
						<thead>
							<tr>
								<th>Responsible Party</th>
								<th>Action</th>
								<th>Details</th>
								<th>Date</th>
							</tr>
						</thead>
						<tbody>
							{adminState.filteredLogs?.map((log) => (
								<tr key={log.id}>
									<td>{log.user_id}</td>
									<td>{log.action}</td>
									<td>{log.details}</td>
									<td>{dayjs(log.created_at).format("MMMM D, YYYY")}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
};

export default AdminLogs;
