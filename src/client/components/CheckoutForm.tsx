import {
	PaymentElement,
	useStripe,
	useElements,
} from "@stripe/react-stripe-js";
import React from "react";

interface CheckoutFormProps {}

const CheckoutForm = (props: CheckoutFormProps) => {
	const stripe = useStripe();
	const elements = useElements();

	const handleDonateSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (!stripe || !elements) return;
		const { error } = await stripe.confirmPayment({
			elements,
			confirmParams: {
				return_url: `${window.location.origin}/thanks`,
			},
		});
		if (error.type === "card_error" || error.type === "validation_error") {
			console.log(`error`, error.message);
		} else {
			console.log(`unexpected error`);
		}
	};

	return (
		<div>
			<PaymentElement />
			<button onClick={handleDonateSubmit} className="btn btn-secondary">
				Donate!
			</button>
		</div>
	);
};

export default CheckoutForm;
