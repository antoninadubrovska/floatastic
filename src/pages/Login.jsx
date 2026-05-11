import { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router";

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
			<h1>Admin Login</h1>

			<form onSubmit={handleSubmit}>
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

				<button type="submit">Log in</button>
			</form>

			{error && <p>{error}</p>}
		</div>
	);
};

export default Login;
