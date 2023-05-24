import styles from "./Register.module.scss";
import { Link } from "react-router-dom";

import RegisterForm from "../../../components/register/RegisterForm.jsx";
import Header from "../../../components/header/Header";

const Register = () => {
	return (
		<section className={styles.Register}>
			<Header />
			<h1>Create an account</h1>
			<p>Never miss a payment again with our finance tracking app.</p>
			<RegisterForm />
			<p>
				Already have an account? <Link to="/login">Sign in</Link>
			</p>
		</section>
	);
};

export default Register;
