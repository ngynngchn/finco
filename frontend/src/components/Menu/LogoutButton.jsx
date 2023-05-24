import Button from "../../components/menu/MenuButton.jsx";
import logout from "../../assets/img/logout.svg";
import { userStore } from "../../utils/userStore.js";

const LogoutButton = () => {
	const url = import.meta.env.VITE_BACKEND_URL;

	const clearStorage = () => {
		userStore.setState({ userID: null, username: null, userPic: null });
		console.log("Cleared Storage");
	};

	const handleLogout = async () => {
		try {
			const response = await fetch(url + "logout", {
				method: "POST",
				credentials: "include",
			});
			if (response.ok) {
				clearStorage();
				window.location.href = "/";
			} else {
				throw new Error("Logout failed");
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Button onClick={handleLogout} img={logout} alt="logout">
			Logout
		</Button>
	);
};

export default LogoutButton;
