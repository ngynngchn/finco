import {
	expenseStyles,
	incomeStyles,
	formatToDollar,
	capitlaizeFirstLetter,
} from "../../../utils/helper.js";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// style import
import styles from "./CategoryReport.module.scss";

// component import
import Header from "../../../components/header/Header.jsx";
import DoughnutChart from "../../../components/charts/DoughnutChart.jsx";
import TransactionCard from "../../../components/transaction-stats/transaction-card/TransactionCard.jsx";
import DateRangePicker from "../../../components/basic/datepicker/DateRangePicker.jsx";
import CategorySearch from "../../../components/basic/category-search/CategorySearch.jsx";

// img import
import expenseIcon from "../../../assets/img/trending-down.svg";
import incomeIcon from "../../../assets/img/trending-up.svg";
import TransactionList from "../../../components/transaction-list/transaction-list/TransactionList.jsx";

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

	// intitial fetch and values to set
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
					configureCategories(Object.entries(data.transactions));
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

	// reconfiguration if dateRange or filterterm are changed
	useEffect(() => {
		configureCategories(filteredTransactions);
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

	const configureCategories = (transactionsObject) => {
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
		// neccessary for chart.js graph
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
			<Header profile back title={capitlaizeFirstLetter(params.type)} />
			{/* (1) Current income or expenses amount   */}
			<TransactionCard
				mini
				content="Current"
				style={params.type === "expense" ? expenseStyles : incomeStyles}
				img={params.type === "expense" ? expenseIcon : incomeIcon}
				amount={formatToDollar(totalSum)}
			/>

			<div className={styles.scrollable}>
				{/* (2) Graph */}
				<div className={styles.graph}>
					{graphData && <DoughnutChart type={graphData} />}
				</div>
				{/* (3) Date selection */}
				<DateRangePicker
					startDateChange={(date) =>
						setDateRange({ ...dateRange, start: date })
					}
					endDateChange={(date) => setDateRange({ ...dateRange, end: date })}
					dateRange={dateRange}
				/>
				{/* (3) Category search */}
				<CategorySearch
					onChange={(event) => setFilterTerm(event.target.value)}
					value={filterTerm}
				/>
				{/* (4) List to display transactions/ filtered transactions */}
				<TransactionList filteredTransactions={filteredTransactions} />
			</div>
		</section>
	);
}

export default CategoryReport;
