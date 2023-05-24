import styles from "./Transactions.module.scss";
import { useState, useEffect } from "react";
import { formatToDollar } from "../../utils/helper.js";
import TranscactionsStats from "../../components/transaction-stats/TranscactionsStats";
import Header from "../../components/header/Header.jsx";
import TransactionList from "../../components/transaction-list/TransactionList";

const Transactions = () => {
	const [total, setTotal] = useState({ income: 0, expense: 0 });
	const [transactions, setTransactions] = useState([]);
	const URL = import.meta.env.VITE_BACKEND_URL;

	// const getStats = async () => {
	// 	try {
	// 		const response = await fetch(URL + "getTotalTransactions", {
	// 			credentials: "include",
	// 		});
	// 		if (response.ok) {
	// 			const data = await response.json();
	// 			setTotalExpenses(formatToDollar(data.expense));
	// 			setTotalIncome(formatToDollar(data.income));
	// 		} else {
	// 			throw new Error("Could not get info!");
	// 		}
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// };
	// useEffect(() => {
	// 	getStats();
	// }, []);

	useEffect(() => {
		const getTransactions = async () => {
			const response = await fetch(URL + "getAllTransactions", {
				credentials: "include",
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await response.json();
			setTransactions(data);

			const total = { income: 0, expense: 0 };
			Object.entries(data).forEach(([key, value]) => {
				value.forEach((transaction) => {
					transaction.type == "income"
						? (total.income += +transaction.amount)
						: (total.expense += +transaction.amount);
				});
			});
			setTotal(total);
		};
		getTransactions();
	}, []);
	if (!transactions) return;

	return (
		<section className={styles.Transactions}>
			<Header profile title="All Transactions" />

			<TranscactionsStats
				incomeAmount={formatToDollar(total.income)}
				expenseAmount={formatToDollar(total.expense)}
				expensePath="/transactions/expense"
				incomePath="/transactions/income"
				expenseContent={"Total Expense"}
				incomeContent={"Total Income"}
				mini
			/>
			<TransactionList transactions={transactions} />
		</section>
	);
};

export default Transactions;
