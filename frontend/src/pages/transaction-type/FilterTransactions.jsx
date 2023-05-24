import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import styles from "./FilterTransactions.module.scss";

import Header from "../../components/header/Header.jsx";
import DateRangePicker from "../../components/Basic/datepicker/DateRangePicker.jsx";
import CategorySearch from "../../components/Basic/category-search/CategorySearch";
import FilteredList from "../../components/transaction-list/transaction-filter/FilteredList";

const FilterTransactions = () => {
	const [transactions, setTransactions] = useState([]);
	const [filterTerm, setFilterTerm] = useState("");
	const [dateRange, setDateRange] = useState({
		start: null,
		end: null,
	});

	const params = useParams();

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
					transaction.type === params.type &&
					transaction.category
						.toLowerCase()
						.includes(filterTerm.toLowerCase()) &&
					(!dateRange.start || new Date(transaction.date) >= dateRange.start) &&
					(!dateRange.end || new Date(transaction.date) <= dateRange.end)
			)
		)
		.map(([key, array]) => [
			key,
			array
				.filter(
					(transaction) =>
						transaction.type === params.type &&
						transaction.category
							.toLowerCase()
							.includes(filterTerm.toLowerCase()) &&
						(!dateRange.start ||
							new Date(transaction.date) >= dateRange.start) &&
						(!dateRange.end || new Date(transaction.date) <= dateRange.end)
				)
				.sort((a, b) => new Date(b.date) - new Date(a.date)), // Sort types by date
		]);

	filteredTransactions.sort((a, b) => new Date(b[0]) - new Date(a[0]));

	if (!transactions) return;

	return (
		<section className={styles.Transactions}>
			<Header back profile title={"All " + params.type} />
			<DateRangePicker
				startDateChange={(date) => setDateRange({ ...dateRange, start: date })}
				endDateChange={(date) => setDateRange({ ...dateRange, end: date })}
				dateRange={dateRange}
			/>
			<CategorySearch
				onChange={(event) => setFilterTerm(event.target.value)}
				value={filterTerm}
			/>
			<FilteredList filteredTransactions={filteredTransactions} weekday />
		</section>
	);
};

export default FilterTransactions;
