import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { navigateWithDelay } from "../../utils/helper";

// style import
import styles from "./RegisterForm.module.scss";

// component import
import Password from "../basic/password-input/Password";

const RegisterForm = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [agreedToTnC, setAgreedToTnC] = useState(false);
	const navigate = useNavigate();

	const url = import.meta.env.VITE_BACKEND_URL;

	const handleSubmit = async (e) => {
		e.preventDefault();

		const createAccount = fetch(url + "register", {
			credentials: "include",
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				account: { username, password, email, agreedToTnC },
			}),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Invalid mail or password");
				} else {
					return response.text();
				}
			})
			.then((data) => {
				console.log(data);
				navigateWithDelay(navigate, "/login", 1500);
			})
			.catch((error) => {
				console.error(error);
				throw new Error(error);
			});

		await toast.promise(createAccount, {
			loading: "Checking Credentials",
			success: "Perfect! You signed up!",
			error: (err) => {
				console.error(err);
				return "Could not register! SORRY!!!";
			},
		});
	};

	return (
		<section className={styles.RegisterForm}>
			<Toaster />
			<form onSubmit={handleSubmit}>
				<label htmlFor="username" hidden>
					Name
				</label>

				<input
					placeholder="Name"
					type="text"
					name="username"
					id="username"
					onChange={(e) => setUsername(e.target.value)}
				/>

				<label htmlFor="email" hidden>
					Email
				</label>
				<input
					placeholder="Email"
					type="email"
					name="email"
					id="email"
					onChange={(e) => setEmail(e.target.value)}
				/>
				<label htmlFor="password" hidden>
					Password
				</label>

				<Password onChange={(e) => setPassword(e.target.value)} />
				<div>
					<input
						type="checkbox"
						name="T&C"
						id="T&C"
						value={true}
						onChange={(e) => setAgreedToTnC(e.target.value)}
						required
					/>
					<label htmlFor="T&C">
						Agree to our<b> Terms and Service</b>
					</label>
				</div>
				<button type="submit">Register Now</button>
			</form>
		</section>
	);
};

export default RegisterForm;
