import { useEffect, useState } from "react";
import { userStore } from "../../utils/userStore.js";
import { formatToDollar } from "../../utils/helper.js";

import styles from "./Report.module.scss";

import TransactionList from "../../components/transaction-list/TransactionList.jsx";
import Header from "../../components/header/Header.jsx";
import MultiAxis from "../../components/charts/MultiAxis";
import TranscactionsStats from "../../components/transaction-stats/TranscactionsStats";

const Report = () => {
	const [transactions, setTransactions] = useState([]);
	const [total, setTotal] = useState({ income: 0, expense: 0 });

	const URL = import.meta.env.VITE_BACKEND_URL;

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

	return (
		<section className={styles.Report}>
			<Header profile title="Report" />
			<TranscactionsStats
				mini
				incomeAmount={formatToDollar(total.income)}
				expenseAmount={formatToDollar(total.expense)}
				expensePath="/report/expense"
				incomePath="/report/income"
				expenseContent={"Total Expense"}
				incomeContent={"Total Income"}
			/>
			<div className={styles.scrollable}>
				<div className={styles.graph}>
					<MultiAxis transactions={transactions} />
				</div>
				<div className={styles.sticky}>
					<h3>Total Transactions</h3>
				</div>
				<TransactionList transactions={transactions} />
			</div>
		</section>
	);
};

export default Report;
