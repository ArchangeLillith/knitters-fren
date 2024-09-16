import baseService from "./base";

const getAllLogs = async () => {
	try {
		const logs = await baseService.get(`/api/logs`);
		return logs;
	} catch (error) {
		throw error;
	}
};

export default {
	getAllLogs,
};
