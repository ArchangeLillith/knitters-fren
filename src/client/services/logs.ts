import baseService from './base';

const getAllLogs = async () => {
	const logs = await baseService.get(`/api/logs`);
	return logs;
};

export default {
	getAllLogs,
};
