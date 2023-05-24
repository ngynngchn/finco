import styles from "./Transactions.module.scss";
import { useState, useEffect } from "react";
import { formatToDollar } from "../../utils/helper.js";
import TranscactionsStats from "../../components/transaction-stats/TranscactionsStats";
import Header from "../../components/header/Header.jsx";
import TransactionFilter from "../../components/transaction-list/TransactionFilter";

const Transactions = () => {
	const [total, setTotal] = useState({ income: 0, expense: 0 });
	const [transactions, setTransactions] = useState([]);
	const url = import.meta.env.VITE_BACKEND_URL;

	useEffect(() => {
		const getTransactions = async () => {
			const response = await fetch(url + "getAllTransactions", {
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

			<TransactionFilter transactions={transactions} weekday />
		</section>
	);
};

export default Transactions;
