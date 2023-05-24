//style import
import styles from "./TransactionList.module.scss";
import { formatDate, formatToWeekday } from "../../../utils/helper.js";

// component import
import TransactionElement from "../transaction-element/TransactionElement.jsx";

function TransactionList({ filteredTransactions, weekday }) {
	return (
		<section className={styles.TransactionList}>
			{filteredTransactions.length === 0 ? (
				/* (1) Nothing found message */
				<p>Sorry, no entries found</p>
			) : (
				filteredTransactions.map(([date, transactions]) => (
					/* (2) Element displaying transaction information */
					<div className={styles.TransactionContainer} key={date}>
						{weekday && (
							<>
								<p>{formatToWeekday(date)}</p>
								<h3>{formatDate(date)}</h3>
							</>
						)}
						{transactions.map((transaction, index) => (
							<TransactionElement transaction={transaction} key={index} />
						))}
					</div>
				))
			)}
		</section>
	);
}

export default TransactionList;
