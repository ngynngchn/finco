import { useState } from "react";

import styles from "./TransactionList.module.scss";

import DateRangePicker from "../basic/datepicker/DateRangePicker.jsx";
import CategorySearch from "../basic/category-search/CategorySearch";
import FilteredList from "./transaction-filter/FilteredList";

const TransactionList = ({ transactions }) => {
	const [filterTerm, setFilterTerm] = useState("");
	const [dateRange, setDateRange] = useState({
		start: null,
		end: null,
	});

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
		])
		.sort((a, b) => new Date(b[0]) - new Date(a[0]));

	if (!transactions) return;

	return (
		<div className={styles.TransactionList}>
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
		</div>
	);
};

export default TransactionList;
