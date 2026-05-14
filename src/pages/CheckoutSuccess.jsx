import { Link } from "react-router";

const CheckoutSuccess = () => {
	return (
		<div className="checkout-success-page">
			<h2>Thank you for your purchase!</h2>

			<p>Your floats are on the way to your next pool party.</p>

			<Link className='contine-shopping' to="/products">Continue Shopping</Link>
		</div>
	);
};

export default CheckoutSuccess;
