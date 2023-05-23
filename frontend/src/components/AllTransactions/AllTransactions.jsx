import SingleTransaction from "../TransactionList/SingleTransaction.jsx";
import { useState } from "react";

import styles from "./AllTransactions.module.scss";
import DateRangePicker from "../Basic/datepicker/DateRangePicker.jsx";

const TransactionList = ({ transactions }) => {
	const [dateRange, setDateRange] = useState({
		start: null,
		end: null,
	});
	const filterTransactions = () => {
		if (dateRange.start && dateRange.end) {
			const filteredTransactions = transactions.filter(([date]) => {
				const transactionDate = new Date(date);
				return (
					transactionDate >= dateRange.start &&
					// 86400000 represents a day in ms
					transactionDate <= new Date(dateRange.end.getTime() + 86400000)
				);
			});
			return filteredTransactions;
		}
		return transactions;
	};

	if (!transactions) return;
	return (
		<div className={styles.TransactionContainer}>
			<DateRangePicker
				startDateChange={(date) => setDateRange({ ...dateRange, start: date })}
				endDateChange={(date) => setDateRange({ ...dateRange, end: date })}
				dateRange={dateRange}
			/>

			<div className={styles.List}>
				{filterTransactions().map(([date, array]) => (
					<div key={date}>
						{array.map((transaction, index) => (
							<SingleTransaction transaction={transaction} key={index} />
						))}
					</div>
				))}
			</div>
		</div>
	);
};

export default TransactionList;
