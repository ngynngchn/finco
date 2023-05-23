import { useEffect, useState } from "react";
import "./TransactionList.css";
import styles from "./TransactionList.module.scss";
import { formatToWeekday } from "../../utils/helper.js";
import SingleTransaction from "./SingleTransaction.jsx";
import DateRangePicker from "../Basic/datepicker/DateRangePicker";

const TransactionList = () => {
	const [transactions, setTransactions] = useState([]);
	const [categoryFilter, setCategoryFilter] = useState("");
	const [dateRange, setDateRange] = useState({
		start: null,
		end: null,
	});

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

			const sortedTransactions = Object.entries(data).sort(
				(a, b) => new Date(b[0]) - new Date(a[0])
			);

			setTransactions(sortedTransactions);
		};

		getTransactions();
	}, []);

	const filterTransactions = () => {
		let filteredTransactions = transactions;
		if (dateRange.start && dateRange.end) {
			filteredTransactions = filteredTransactions.filter(([date]) => {
				const transactionDate = new Date(date);
				return (
					transactionDate >= dateRange.start &&
					transactionDate <= new Date(dateRange.end.getTime() + 86400000)
				);
			});
		}
		if (categoryFilter) {
			filteredTransactions = filteredTransactions.filter(([_, array]) =>
				array.some((transaction) =>
					transaction.category
						.toLowerCase()
						.includes(categoryFilter.toLowerCase())
				)
			);
		}
		return filteredTransactions;
	};
	return (
		<article className={styles.TransactionList}>
			<DateRangePicker
				startDateChange={(date) => setDateRange({ ...dateRange, start: date })}
				endDateChange={(date) => setDateRange({ ...dateRange, end: date })}
				dateRange={dateRange}
			/>

			<div className={styles.CategoryFilterContainer}>
				<input
					type="text"
					placeholder="Filter by category"
					value={categoryFilter}
					onChange={(e) => setCategoryFilter(e.target.value)}
				/>
			</div>

			{filterTransactions().length > 0 ? (
				filterTransactions().map(([date, array]) => (
					<div className={styles.TransactionContainer} key={date}>
						<h3>{formatToWeekday(date)}</h3>
						<h2>{date}</h2>
						{array.map((transaction, index) => (
							<SingleTransaction transaction={transaction} key={index} />
						))}
					</div>
				))
			) : (
				<p className={styles.Sorry}>Sorry, category not found.</p>
			)}
		</article>
	);
};

export default TransactionList;
