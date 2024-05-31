import { useState } from "react";

export const useForm = <T = any>(initialValues: any) => {
	const [values, setValues] = useState<T>(initialValues);

	const handleChanges = (
		e: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>
	) => {
		setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const reset = () => setValues(initialValues);

	return {
		values,
		setValues,
		handleChanges,
		reset,
	};
};
