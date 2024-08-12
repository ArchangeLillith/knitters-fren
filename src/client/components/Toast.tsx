import React from "react";
import { toast } from "react-toastify";
import { BsCheck2Circle, BsXOctagon } from "react-icons/bs";

interface TemplateToastProps {
	icon: any;
	message: string;
}
const TemplateToast = ({ icon, message }: TemplateToastProps) => {
	return (
		<div className="flex items-center">
			{icon}
			<span className="m1-6">{message}</span>
		</div>
	);
};

const success = (message: string) => {
	toast.success(
		<TemplateToast
			message={message}
			icon={<BsCheck2Circle className="text-4x1" />}
		/>,
		{
			className: "border-1-8 border-primary",
			bodyClassName: "background-soft",
			progressClassName: "white",
		}
	);
};
const failure = (message: string) => {
	toast.success(
		<TemplateToast
			message={message}
			icon={<BsXOctagon className="text-4x1" />}
		/>,
		{
			className: "border-1-8 border-soft",
			bodyClassName: "background-primary",
			progressClassName: "white",
			style: { color: "white" },
		}
	);
};
const Toast = {
	success,
	failure,
};

export default Toast;
