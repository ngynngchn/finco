import {
	expenseStyles,
	incomeStyles,
	formatToDollar,
} from "../../utils/helper.js";
import { useEffect, useState } from "react";

import Header from "../../components/header/Header";
import DoughnutChart from "../../components/charts/DoughnutChart";
import TransactionCard from "../../components/transaction-stats/TransactionCard";
import DateRangePicker from "../../components/basic/datepicker/DateRangePicker";
import CategorySearch from "../../components/basic/category-search/CategorySearch";
import FilteredList from "../../components/transaction-list/transaction-filter/FilteredList";

import expenseIcon from "../../assets/img/trending-down.svg";
import incomeIcon from "../../assets/img/trending-up.svg";
import styles from "./CategoryReport.module.scss";
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from "react-router-dom";

function CategoryReport() {
	const url = import.meta.env.VITE_BACKEND_URL;
	const params = useParams();

	const [transactions, setTransactions] = useState([]);
	const [graphData, setGraphData] = useState(null);
	const [totalSum, setTotalSum] = useState(null);
	const [filterTerm, setFilterTerm] = useState("");
	const [dateRange, setDateRange] = useState({
		startDate: null,
		endDate: null,
	});

	useEffect(() => {
		const getTransactions = async () => {
			try {
				const response = await fetch(url + "transactions?type=" + params.type, {
					credentials: "include",
				});
				if (response.ok) {
					const data = await response.json();
					setTransactions(data.transactions);
					setTotalSum(data.total);
					setUpCategories(Object.entries(data.transactions));
				} else {
					const message = await response.text();
					throw new Error(message);
				}
			} catch (error) {
				console.log(error);
			}
		};
		getTransactions();
	}, []);

	useEffect(() => {
		setUpCategories(filteredTransactions);
	}, [dateRange, filterTerm]);

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

	const setUpCategories = (transactionsObject) => {
		let categories = {};
		let total = 0;
		transactionsObject.forEach(([date, transactions]) => {
			transactions.map((transaction) => {
				if (!categories.hasOwnProperty(transaction.category)) {
					categories[transaction.category] = +transaction.amount;
					total += +transaction.amount;
				} else {
					categories[transaction.category] += +transaction.amount;
					total += +transaction.amount;
				}
			});
		});
		let data = {
			labels: Object.keys(categories),
			data: Object.values(categories),
			type: params.type,
		};
		setGraphData(data);
		setTotalSum(total);
	};

	if (!transactions) return;

	return (
		<section className={styles.CategoryReport}>
			<Header profile back title={params.type} />
			<TransactionCard
				mini
				content="Current"
				style={params.type === "expense" ? expenseStyles : incomeStyles}
				img={params.type === "expense" ? expenseIcon : incomeIcon}
				amount={formatToDollar(totalSum)}
			/>
			<div className={styles.scrollable}>
				<div className={styles.graph}>
					{graphData && <DoughnutChart type={graphData} />}
				</div>
				<DateRangePicker
					startDateChange={(date) =>
						setDateRange({ ...dateRange, start: date })
					}
					endDateChange={(date) => setDateRange({ ...dateRange, end: date })}
					dateRange={dateRange}
				/>
				<CategorySearch
					onChange={(event) => setFilterTerm(event.target.value)}
					value={filterTerm}
				/>

				<FilteredList filteredTransactions={filteredTransactions} />
			</div>
		</section>
	);
}

export default CategoryReport;
