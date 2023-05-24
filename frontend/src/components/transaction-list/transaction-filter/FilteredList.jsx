import { formatToWeekday } from "../../../utils/helper";
import styles from "./FilteredList.module.scss";
import TransactionElement from "../transaction-element/TransactionElement";
function FilteredList({ filteredTransactions, weekday }) {
	console.log(filteredTransactions);
	return (
		<article className={styles.FilteredList}>
			{filteredTransactions.length === 0 ? (
				<p>Sorry, no entries found</p>
			) : (
				filteredTransactions.map(([date, transactions]) => (
					<div className={styles.TransactionContainer} key={date}>
						{weekday && (
							<>
								<p>{formatToWeekday(date)}</p>
								<h3>{date}</h3>
							</>
						)}
						{transactions.map((transaction, index) => (
							<TransactionElement transaction={transaction} key={index} />
						))}
					</div>
				))
			)}
		</article>
	);
}

export default FilteredList;
