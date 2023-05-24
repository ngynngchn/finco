import { useState } from "react";
// style import
import styles from "./TransactionFilter.module.scss";
// component import
import DateRangePicker from "../basic/datepicker/DateRangePicker.jsx";
import CategorySearch from "../basic/category-search/CategorySearch.jsx";
import TransactionList from "./transaction-list/TransactionList";

const TransactionFilter = ({ transactions, weekday }) => {
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
		<div className={styles.TransactionFilter}>
			{/* (1) Date selection */}
			<DateRangePicker
				startDateChange={(date) => setDateRange({ ...dateRange, start: date })}
				endDateChange={(date) => setDateRange({ ...dateRange, end: date })}
				dateRange={dateRange}
			/>
			{/* (2) Category search */}
			<CategorySearch
				onChange={(event) => setFilterTerm(event.target.value)}
				value={filterTerm}
			/>
			{/* (3) List */}
			<TransactionList
				filteredTransactions={filteredTransactions}
				weekday={weekday}
			/>
		</div>
	);
};

export default TransactionFilter;
