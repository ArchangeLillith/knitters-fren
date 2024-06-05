import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useState } from "react";
import CheckoutForm from "../components/CheckoutForm";
interface DonateProps {}

const Donate = (props: DonateProps) => {
	const [donation, setDonation] = useState({
		amount: "",
		show: true,
		clientSecret: "",
	});

	const stripePromise = loadStripe(
		"pk_test_51NNc06BccRIZFQw0XCcSM5W6wSHEgEunvo5TMC3Tkx2qvGzDNoJ0AVrGy9jQEfOTJueCvQ3kZuyeDcucS4Qhaf1m00MPus0QqQ"
	);

	const handlePaymentCreation = async (
		e: React.MouseEvent<HTMLButtonElement>
	) => {
		e.preventDefault();
		try {
			const res = await fetch("http://localhost:3000/api/payment", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ amount: Number(donation.amount) }),
			});

			if (!res) {
				throw new Error("res not ok");
			}
			const { clientSecret } = await res.json();

			setDonation((prev) => ({ ...prev, show: false, clientSecret }));
		} catch (error) {
			console.log(`error`, error);
		}
	};

	if (donation.show) {
		return (
			<main className="container">
				<section className="row">
					<div className="col-6">
						<form action="">
							<input
								placeholder="Amount"
								type="text"
								className="form-control"
								value={donation.amount}
								onChange={(e) =>
									setDonation((prev) => ({ ...prev, amount: e.target.value }))
								}
							/>
							<button
								className="btn btn-primary mt-3"
								onClick={handlePaymentCreation}
							>
								Donate
							</button>
						</form>
					</div>
				</section>
			</main>
		);
	} else {
		return (
			<main className="container">
				<section className="row">
					<div className="col-6">
						<Elements
							stripe={stripePromise}
							options={{ clientSecret: donation.clientSecret }}
						>
							<CheckoutForm />
						</Elements>
					</div>
				</section>
			</main>
		);
	}
};

export default Donate;
