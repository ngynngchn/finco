import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// pages
import Onboarding from "./pages/onboarding/Onboarding.jsx";
import Home from "./pages/home/Home.jsx";
import Auth from "./pages/authentication/Auth.jsx";
import Register from "./pages/authentication/register/Register.jsx";
import Login from "./pages/Authentication/login/Login.jsx";
import Menu from "./pages/menu/Menu.jsx";
import Setup from "./pages/setup/Setup.jsx";
import Transactions from "./pages/transactions/Transactions.jsx";
import AddTransactions from "./pages/add-transactions/AddTransactions.jsx";
import FilterTransactions from "./pages/transaction-type/FilterTransactions.jsx";
import Report from "./pages/report/Report.jsx";
import CategoryReport from "./pages/report/category-report/CategoryReport.jsx";
import FAQ from "./pages/menu/FAQ.jsx";
// import AnimatedOnboarding from "./AnimatedOnboarding";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/onboarding" element={<Onboarding />} />
					<Route element={<Auth />}>
						<Route path="/" element={<Home />} />
						<Route path="/menu" element={<Menu />} />
						<Route path="/faq" element={<FAQ />} />
						<Route path="/add-transaction" element={<AddTransactions />} />
						<Route path="/transactions" element={<Transactions />} />
						<Route
							path="/transactions/:type"
							element={<FilterTransactions />}
						/>
						<Route path="/report" element={<Report />} />
						<Route path="/report/:type" element={<CategoryReport />} />
						<Route path="/setup" element={<Setup />} />
					</Route>
					<Route path="*" element={<h1>Not Found</h1>} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
