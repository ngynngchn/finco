import React from "react";
import { formatToWeekday } from "../../utils/helper";
import SingleTransaction from "./SingleTransaction";

import styles from "./TransactionList.module.scss";

function FilteredList({ filteredTransactions }) {
	return (
		<article className={styles.FilteredList}>
			{filteredTransactions.length === 0 ? (
				<p>Sorry, no entries found</p>
			) : (
				filteredTransactions.map(([date, transactions]) => (
					<div className={styles.TransactionContainer} key={date}>
						<p>{formatToWeekday(date)}</p>
						<h1>{date}</h1>
						{transactions.map((transaction, index) => (
							<SingleTransaction transaction={transaction} key={index} />
						))}
					</div>
				))
			)}
		</article>
	);
}

export default FilteredList;
