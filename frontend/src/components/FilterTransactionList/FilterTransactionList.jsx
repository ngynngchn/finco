import { useState, useEffect } from "react";
import styles from "./FilterTransactionList.module.scss";

import DateRangePicker from "../Basic/datepicker/DateRangePicker.jsx";
import CategorySearch from "../Basic/category-search/CategorySearch.jsx";
import FilteredList from "../TransactionList/FilteredList";

const FilterTransactionList = () => {
	const [transactions, setTransactions] = useState([]);
	const [filterTerm, setFilterTerm] = useState("");
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
			setTransactions(data);
		};
		getTransactions();
	}, []);

	const filteredTransactions = Object.entries(transactions)
		.filter(([key, array]) =>
			array.some(
				(transaction) =>
					transaction.category
						.toLowerCase()
						.includes(filterTerm.toLowerCase()) &&
					(!dateRange.start || new Date(transaction.date) >= dateRange.start) &&
					(!dateRange.end || new Date(transaction.date) <= dateRange.end)
			)
		)
		.map(([key, array]) => [
			key,
			array.filter(
				(transaction) =>
					transaction.category
						.toLowerCase()
						.includes(filterTerm.toLowerCase()) &&
					(!dateRange.start || new Date(transaction.date) >= dateRange.start) &&
					(!dateRange.end || new Date(transaction.date) <= dateRange.end)
			),
		]);

	filteredTransactions.sort((a, b) => new Date(b[0]) - new Date(a[0]));

	if (!transactions) return;

	return (
		<section className={styles.Transactions}>
			<DateRangePicker
				startDateChange={(date) => setDateRange({ ...dateRange, start: date })}
				endDateChange={(date) => setDateRange({ ...dateRange, end: date })}
				dateRange={dateRange}
			/>
			<CategorySearch
				onChange={(event) => setFilterTerm(event.target.value)}
				value={filterTerm}
			/>
			<FilteredList filteredTransactions={filteredTransactions} />
		</section>
	);
};

export default FilterTransactionList;
