import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { userStore } from "../../../utils/userStore";
import toast, { Toaster } from "react-hot-toast";
import { navigateWithDelay } from "../../../utils/helper.js";

// style import
import styles from "./Login.module.scss";

// component import
import Password from "../../../components/basic/password-input/Password.jsx";
import Header from "../../../components/header/Header.jsx";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const url = import.meta.env.VITE_BACKEND_URL;
	const navigate = useNavigate();

	//* userStore
	const setBudget = userStore((state) => state.setBudget);
	const setUser = (value) => userStore.getState().setUserID(value);
	const setUsername = (value) => userStore.getState().setUsername(value);
	const setUserPic = (value) => userStore.getState().setUserPic(value);

	const login = async (event) => {
		event.preventDefault();

		const loginUser = fetch(url + "login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},

			body: JSON.stringify({
				account: {
					email: email,
					password: password,
				},
			}),
			credentials: "include",
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Invalid mail or password");
				} else {
					return response.json();
				}
			})
			.then((user) => {
				setUser(user.id);
				setUsername(user.user);
				setBudget(user.budget);
				if (user.pic) {
					setUserPic(url + user.pic);
					navigateWithDelay(navigate, "/", 2000);
				} else {
					navigateWithDelay(navigate, "/setup", 2000);
				}
			})
			.catch((err) => {
				console.error(err);
				throw new Error(err);
			});

		await toast.promise(loginUser, {
			loading: "Checking Credentials",
			success: "Perfect! You logged in!",
			error: (err) => {
				console.error(err);
				return "Please try again :(";
			},
		});
	};

	return (
		<section className={styles.Login}>
			<Toaster />
			<Header />
			<h1>Welcome back</h1>
			<p>Never miss a payment again with our finance tracking app.</p>
			<form onSubmit={login}>
				<label>
					<input
						type="email"
						name="email"
						value={email}
						onChange={(event) => setEmail(event.target.value)}
						placeholder="Email"
						required
					/>
					<span hidden>Email</span>
				</label>
				<label>
					<Password
						value={password}
						onChange={(event) => setPassword(event.target.value)}
					/>
					<span hidden>Password</span>
				</label>
				{/* <Link>Forgot password?</Link> */}
				<button type="submit">Login</button>
			</form>
			<p>
				Don`t have an account ? <Link to="/register">Sign up</Link>
			</p>
		</section>
	);
};

export default Login;
