import { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router";
import { Link } from 'react-router'

const Login = () => {
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await loginUser(email, password);

			navigate("/admin");
		} catch (error) {
			setError("Wrong email or password");
			console.error(error);
		}
	};

	return (
		<div className="login-page">
			<h2>Admin Login</h2>

			<div>
				<form className="login-controls" onSubmit={handleSubmit}>
					<input
						type="email"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>

					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>

					<button className="login-submit" type="submit">
						Log in
					</button>

					<Link className="link-go-back" to="/products">
						Back to products
					</Link>
				</form>

				{error && <p>{error}</p>}
			</div>
		</div>
	);
};

export default Login;
