import { useNavigate } from "react-router-dom";
import { userStore } from "../../utils/userStore.js";

// style import
import styles from "./Header.module.scss";

// img import
import backIcon from "../../assets/img/back.svg";
import logoIcon from "../../assets/img/logo.svg";

function Header({ name, back, profile, profileMenu, title }) {
	const navigate = useNavigate();
	const username = userStore((state) => state.username);
	const pic = userStore((state) => state.userPic);

	return (
		<header className={styles.Header}>
			{name ? (
				<section>
					<p>Welcome back,</p>
					<h3>{username}</h3>
				</section>
			) : back ? (
				/* go back to last page  */
				<img
					width="25px"
					onClick={() => navigate(-1)}
					src={backIcon}
					alt="back"
				/>
			) : (
				/* show finco icon and navigate to home*/
				<img
					src={logoIcon}
					alt="logo"
					width="45px"
					onClick={() => navigate("/")}
				/>
			)}

			<h1>{title}</h1>
			{profile && (
				/* show profile image and navigate to menu*/

				<img
					onClick={() => navigate("/menu")}
					src={pic}
					alt="profile"
					width="45px"
					height="45px"
				/>
			)}
			{profileMenu && (
				/* show profile image and navigate to home*/

				<img
					onClick={() => navigate("/")}
					src={pic}
					alt="profileMenu"
					width="45px"
					height="45px"
				/>
			)}
		</header>
	);
}

export default Header;
