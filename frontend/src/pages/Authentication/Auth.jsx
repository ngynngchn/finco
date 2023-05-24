import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { userStore } from "../../utils/userStore.js";
// component import
import Navigation from "../../components/navigation/Navigation.jsx";
import SplashScreen from "../../components/onboarding/SplashScreen/SplashScreen.jsx";
import { navigateWithDelay } from "../../utils/helper.js";

const Auth = () => {
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();

	const url = import.meta.env.VITE_BACKEND_URL;
	const setUser = (value) => userStore.getState().setUserID(value);

	const clearStorage = () =>
		userStore.setState({ userID: null, username: null, userPic: null });

	useEffect(() => {
		(async () => {
			const response = await fetch(url + "auth", { credentials: "include" });
			if (response.ok) {
				setIsLoading(false);
				const user = await response.json();
				setUser(user);
				// return;
			} else {
				try {
					const response = await fetch(url + "logout", {
						method: "POST",
						credentials: "include",
					});
					if (response.ok) {
						clearStorage();
						navigateWithDelay(navigate, "/onboarding", 1500);
					} else {
						throw new Error("Logout failed");
					}
				} catch (error) {
					console.log(error);
				}

				clearStorage();
				navigateWithDelay(navigate, "/onboarding", 1500);
			}
		})();
	}, []);

	if (isLoading) {
		return <SplashScreen />;
	}

	return (
		<div className="layout">
			<div className="content">
				<Outlet />
			</div>
			<div className="nav">
				<Navigation />
			</div>
		</div>
	);
};

export default Auth;
