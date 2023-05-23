import { useNavigate } from "react-router-dom";
// Import styles and images
import styles from "./Menu.module.scss";
import feather from "../../assets/img/feather.svg";
import bell from "../../assets/img/bell.svg";
import help from "../../assets/img/helpcircle.svg";
import settings from "../../assets/img/settings.svg";

// Import components
import Header from "../../components/header/Header";
import LogoutButton from "../../components/menu/LogoutButton";
import Button from "../../components/menu/MenuButton.jsx";

const Menu = () => {
	const navigate = useNavigate();

	return (
		<main className={styles.Menu}>
			<Header name profileMenu />
			<Button img={feather} alt="wallet">
				My Wallet
			</Button>

			<div>
				<Button img={bell} alt="notification">
					Notification
				</Button>
				<Button
					onClick={() => navigate("/setup")}
					img={settings}
					alt="settings">
					Settings
				</Button>
				<Button onClick={() => navigate("/faq")} img={help} alt="help">
					FAQ
				</Button>
			</div>

			<LogoutButton />
		</main>
	);
};

export default Menu;
