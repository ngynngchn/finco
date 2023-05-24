import { Link, useLocation } from "react-router-dom";

// style import
import styles from "./Navigation.module.scss";

// img import
import {
	addActive,
	add,
	home,
	homeActive,
	transactionsActive,
	transactions,
	reportActive,
	report,
} from "../../assets/img/navigation/navigation-icons.js";

const Navigation = () => {
	const location = useLocation();

	return (
		<nav className={styles.Navigation}>
			<Link to="/">
				{location.pathname === "/" ? (
					<img src={homeActive} alt="Home" />
				) : (
					<img src={home} alt="Home" />
				)}
			</Link>
			<Link to="/transactions">
				{location.pathname.includes("/transactions") ? (
					<img src={transactionsActive} alt="Transactions" />
				) : (
					<img src={transactions} alt="Transactions" />
				)}
			</Link>

			<Link to="/add-transaction">
				{location.pathname === "/add-transaction" ? (
					<img src={addActive} alt="Add Transaction" />
				) : (
					<img src={add} alt="Add Transaction" />
				)}
			</Link>
			<Link to="/report">
				{location.pathname.includes("/report") ? (
					<img src={reportActive} alt="Report" />
				) : (
					<img src={report} alt="Report" />
				)}
			</Link>
		</nav>
	);
};

export default Navigation;
