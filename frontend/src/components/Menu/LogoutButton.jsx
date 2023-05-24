import { userStore } from "../../utils/userStore.js";
import { useNavigate } from "react-router-dom";

// component import
import Button from "../../components/menu/MenuButton.jsx";

// img import
import logout from "../../assets/img/logout.svg";

const LogoutButton = () => {
	const url = import.meta.env.VITE_BACKEND_URL;
	const navigate = useNavigate();

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
				navigate("/");
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
