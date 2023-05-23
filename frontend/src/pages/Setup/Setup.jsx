import styles from "./Setup.module.scss";
import SetupForm from "../../components/SetupForm/SetupForm.jsx";
import Header from "../../components/header/Header";

const Setup = () => {
	return (
		<section className={styles.Setup}>
			<Header title="Setup your account" />
			<SetupForm />
		</section>
	);
};

export default Setup;
