import { useEffect, useState } from "react";
import DoughnutChart from "../../components/Charts/DoughnutChart";
import Header from "../../components/header/Header";
import SingleTransaction from "../../components/TransactionList/SingleTransaction";
import TransactionCard from "../../components/transaction-stats/TransactionCard";
import img from "../../assets/img/trending-up.svg";
import { formatToDollar, incomeStyles } from "../../utils/helper";
import styles from "./Report.module.scss";
import DateRangePicker from "../../components/Basic/datepicker/DateRangePicker";

function CategoryReport() {
	const url = import.meta.env.VITE_BACKEND_URL;
	const [transactions, setTransactions] = useState([]);
	const [income, setIncome] = useState(null);
	const [totalIncome, setTotalIncome] = useState(null);
	const [categories, setCategories] = useState(null);
	const [dateRange, setDateRange] = useState({
		start: null,
		end: null,
	});

	useEffect(() => {
		const getTransactions = async () => {
			try {
				const response = await fetch(url + "transactions?type=income", {
					credentials: "include",
				});
				if (response.ok) {
					const data = await response.json();
					let cat = {};
					data.transactions.forEach((transaction) => {
						if (!cat.hasOwnProperty(transaction.category)) {
							cat[transaction.category] = +transaction.amount;
						} else {
							cat[transaction.category] += +transaction.amount;
						}
					});
					let income = {
						labels: Object.keys(cat),
						data: Object.values(cat),
						type: "income",
					};
					setIncome(income);
					setTransactions(data.transactions);
					setTotalIncome(data.total);
					setCategories(cat);
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
		const filteredTransactions = transactions.filter((transaction) => {
			const transactionDate = new Date(transaction.date);
			const { start: startDate, end: endDate } = dateRange;
			return (
				(!startDate || transactionDate >= startDate) &&
				(!endDate || transactionDate <= new Date(endDate.getTime() + 86400000))
			);
		});
		let cat = {};
		filteredTransactions.forEach((transaction) => {
			if (!cat.hasOwnProperty(transaction.category)) {
				cat[transaction.category] = +transaction.amount;
			} else {
				cat[transaction.category] += +transaction.amount;
			}
		});
		let income = {
			labels: Object.keys(cat),
			data: Object.values(cat),
			type: "income",
		};
		setIncome(income);
		setTotalIncome(calculateTotalExpenses(filteredTransactions));
		setCategories(cat);
	}, [dateRange]);

	const calculateTotalExpenses = (filteredTransactions) => {
		return filteredTransactions.reduce((total, transaction) => {
			return total + parseFloat(transaction.amount);
		}, 0);
	};

	if (!transactions) return;

	return (
		<section className={styles.Expenses}>
			<Header profile back title="Income" />
			<TransactionCard
				mini
				content="Current"
				img={img}
				style={incomeStyles}
				amount={formatToDollar(totalIncome)}
			/>

			<div className={styles.scrollable}>
				<div className={styles.graph}>
					{income && <DoughnutChart type={income} />}
				</div>
				<div className={styles.sticky}>
					<DateRangePicker
						startDateChange={(date) =>
							setDateRange({ ...dateRange, start: date })
						}
						endDateChange={(date) => setDateRange({ ...dateRange, end: date })}
						dateRange={dateRange}
					/>
				</div>
				<div className={styles.container}>
					{transactions
						.filter((transaction) => {
							const transactionDate = new Date(transaction.date);
							return (
								(!dateRange.start || transactionDate >= dateRange.start) &&
								(!dateRange.end ||
									transactionDate <=
										new Date(dateRange.end.getTime() + 86400000))
							);
						})
						.sort((a, b) => new Date(b.date) - new Date(a.date))
						.map((transaction) => (
							<SingleTransaction
								transaction={transaction}
								key={transaction.id}
							/>
						))}
				</div>
			</div>
		</section>
	);
}

export default CategoryReport;
