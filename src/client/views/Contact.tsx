import React, { useState } from "react";
import contactService from "../services/contact";

interface ContactProps {}

const Contact = (props: ContactProps) => {
	const [data, setData] = useState({
		from: "",
		subject: "",
		message: "",
	});

	const handleChanges = (
		e: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>
	) => {
		setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		try {
			console.log(data);
			const response = await contactService.sendEmail(data);
			const msg = await response.json();
			console.log(`mgs`, msg);
			setData({
				from: "",
				subject: "",
				message: "",
			});
		} catch (error) {
			console.log(`ERRRO`, error);
		}
	};
	return (
		<div className="container">
			<div className="row justify-content-center">
				<div className="col-12 col-md-6">
					<form>
						<input
							className="form-control"
							name="from"
							placeholder="Your Name..."
							value={data.from}
							onChange={handleChanges}
						/>
						<input
							className="form-control"
							name="subject"
							placeholder="Subject..."
							value={data.subject}
							onChange={handleChanges}
						/>
						<textarea
							className="form-control"
							name="message"
							placeholder="Message..."
							rows={5}
							value={data.message}
							onChange={handleChanges}
						/>
						<button className="btn btn-primary" onClick={handleSubmit}>
							Contact me
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Contact;
