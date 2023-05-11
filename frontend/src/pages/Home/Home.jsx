import { useEffect, useState } from "react";
import { formatToDollar } from "../../utils/helper.js";

import CreditCardDetails from "../../components/CreditCard/CreditCardDetails";
import Header from "../../components/Header/Header";
import TranscactionsStats from "../../components/TransactionsStats/TranscactionsStats";
import TransactionsCardMini from "../../components/TransactionsStats/TransactionsCardMini.jsx";

import styles from "./Home.module.scss";
import alert from "../../assets/img/alert.svg";
import { expenseStyles } from "../../utils/helper.js";

const Home = () => {
	const [totalExpenses, setTotalExpenses] = useState(0);
	const [totalIncome, setTotalIncome] = useState(0);
	const URL = import.meta.env.VITE_BACKEND_URL;

	const getStats = async () => {
		try {
			const response = await fetch(URL + "getTotalTransactions", {
				credentials: "include",
			});
			if (response.ok) {
				const data = await response.json();
				setTotalExpenses(formatToDollar(data.expense));
				setTotalIncome(formatToDollar(data.income));
			} else {
				throw new Error("Could not get info!");
			}
		} catch (error) {
			console.error(error);
		}
	};
	useEffect(() => {
		getStats();
	}, []);

	// if (!totalExpenses && !totalIncome) return;

	return (
		<section className={styles.Home}>
			<Header name profile />
			<CreditCardDetails />
			<h3>Total wallet</h3>
			<TranscactionsStats
				incomeAmount={totalIncome}
				expenseAmount={totalExpenses}
			/>
			<TransactionsCardMini
				img={alert}
				style={expenseStyles}
				amount="$6000"
				content="Monthly spending limit"
				options
			/>
		</section>
	);
};

export default Home;
