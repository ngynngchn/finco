import { useEffect, useState } from "react";
import { formatToDollar } from "../../utils/helper.js";

// style import
import styles from "./Report.module.scss";

// component import
import TransactionFilter from "../../components/transaction-list/TransactionFilter.jsx";
import Header from "../../components/header/Header.jsx";
import MultiAxis from "../../components/charts/MultiAxis.jsx";
import TranscactionsStats from "../../components/transaction-stats/TranscactionsStats.jsx";

const Report = () => {
	const [transactions, setTransactions] = useState([]);
	const [total, setTotal] = useState({ income: 0, expense: 0 });

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
			// initial set of income or expense
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
				{/* (2) Graph */}
				<div className={styles.graph}>
					<MultiAxis transactions={transactions} />
				</div>
				<h3>Total Transactions</h3>

				{/* (3) Transaction filter and display here */}
				<TransactionFilter transactions={transactions} />
			</div>
		</section>
	);
};

export default Report;
