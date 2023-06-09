import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// style import
import styles from "./Onboarding.module.scss";

// component import
import SplashScreen from "../../components/onboarding/SplashScreen/SplashScreen.jsx";
import WelcomeScreen from "../../components/onboarding/welcome-screen/WelcomeScreen.jsx";

// img import
import bankcard from "../../assets/img/bankcard.svg";
import giftcard from "../../assets/img/giftcard.svg";

const Onboarding = () => {
	const [activeSplash, setActiveSplash] = useState(true);
	const [next, setNext] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const interval = setInterval(() => {
			setActiveSplash(false);
		}, 5000);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className={styles.Onboarding}>
			{activeSplash && <SplashScreen />}

			<WelcomeScreen
				img={giftcard}
				title="Organize your
		  spending"
				subtitle="Say goodbye to chaotic finances and start your journey to financial freedom with Finco."
				button="Get Started"
				onclick={() => navigate("/register")}
			/>
			<WelcomeScreen
				img={bankcard}
				title="Track your spend and income"
				subtitle="With Finco, you always know exactly how much money you're spending and what it's being spent on."
				button="Next"
				skip
				next={next}
				onclick={() => setNext(true)}
			/>
		</div>
	);
};

export default Onboarding;
