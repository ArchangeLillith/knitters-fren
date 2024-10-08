import dayjs from 'dayjs';
import React from 'react';

import { AdminPageState } from '../../utils/types';

const Logs: React.FC<{ state: AdminPageState }> = ({ state }) => {
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
					<table className="table">
						<thead>
							<tr>
								<th scope="col">Responsible Party</th>
								<th scope="col">Action</th>
								<th scope="col">Details</th>
								<th scope="col">Date</th>
							</tr>
						</thead>
						<tbody>
							{state.filteredLogs?.map(log => (
								<tr key={log.id}>
									<td>{log.user_id}</td>
									<td>{log.action}</td>
									<td>{log.details}</td>
									<td>{dayjs(log.created_at).format('MMMM D, YYYY')}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
};

export default Logs;
