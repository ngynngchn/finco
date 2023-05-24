import { useEffect, useState } from "react";
import { expenseStyles, formatToDollar } from "../../utils/helper.js";

// component import
import CreditCardDetails from "../../components/CreditCard/CreditCardDetails.jsx";
import Header from "../../components/header/Header.jsx";
import TranscactionsStats from "../../components/transaction-stats/TranscactionsStats.jsx";
import BudgetCard from "../../components/transaction-stats/BudgetCard.jsx";
import BalanceCard from "../../components/transaction-stats/balance-card/BalanceCard.jsx";

// style import
import styles from "./Home.module.scss";

// image import
import alert from "../../assets/img/alert.svg";

const Home = () => {
	const [totalExpenses, setTotalExpenses] = useState(0);
	const [totalIncome, setTotalIncome] = useState(0);
	const url = import.meta.env.VITE_BACKEND_URL;

	const getStats = async () => {
		try {
			const response = await fetch(url + "getTotalTransactionsByMonth", {
				credentials: "include",
			});
			if (response.ok) {
				const data = await response.json();
				setTotalExpenses(formatToDollar(data.totalExpense));
				setTotalIncome(formatToDollar(data.totalIncome));
			} else {
				const data = await response.text();
				throw new Error(data);
			}
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getStats();
	}, []);

	return (
		<section className={styles.Home}>
			<Header name profile />
			<CreditCardDetails />
			<h3>Your monthly stats</h3>
			<BalanceCard />
			<TranscactionsStats
				incomeAmount={totalIncome}
				expenseAmount={totalExpenses}
				expensePath="/report/expense"
				incomePath="/report/income"
				incomeContent="Monthly Income"
				expenseContent="Monthly Expense"
			/>
			<BudgetCard
				img={alert}
				style={expenseStyles}
				content="Monthly spending limit"
				options
			/>
		</section>
	);
};

export default Home;
