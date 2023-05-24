import { useNavigate } from "react-router-dom";
// stlye import
import styles from "./Menu.module.scss";

// img import
import feather from "../../assets/img/feather.svg";
import bell from "../../assets/img/bell.svg";
import help from "../../assets/img/helpcircle.svg";
import settings from "../../assets/img/settings.svg";

// component import
import Header from "../../components/header/Header.jsx";
import LogoutButton from "../../components/menu/LogoutButton.jsx";
import Button from "../../components/menu/MenuButton.jsx";

const Menu = () => {
	const navigate = useNavigate();

	return (
		<main className={styles.Menu}>
			<Header name profileMenu />
			{/* (1) No function yet */}
			<Button img={feather} alt="wallet">
				My Wallet
			</Button>

			<div>
				{/* (2) No function yet */}
				<Button img={bell} alt="notification">
					Notification
				</Button>
				{/* (3) Open Settings page */}
				<Button
					onClick={() => navigate("/setup")}
					img={settings}
					alt="settings">
					Settings
				</Button>
				{/* (4) Open FAQ page */}
				<Button onClick={() => navigate("/faq")} img={help} alt="help">
					FAQ
				</Button>
			</div>

			{/* (5) Click to logout */}
			<LogoutButton />
		</main>
	);
};

export default Menu;
