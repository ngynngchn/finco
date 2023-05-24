import { formatDate, formatToDollar, mapEmoji } from "../../../utils/helper.js";

// style import
import styles from "./TransactionElement.module.scss";

function TransactionElement({ transaction }) {
	if (transaction)
		return (
			<article className={styles.TransactionElement}>
				{/* (1) Emoji for category */}
				<div
					className={styles.TransactionEmoji}
					style={{ backgroundColor: "var(--bg-100)" }}>
					<h3>{mapEmoji(transaction)}</h3>
				</div>
				{/* (2) Transaction description */}
				<div className={styles.TransactionDetails}>
					<h4>{transaction.category}</h4>
					<div className={styles.DateTime}>
						<p>{transaction.time}</p>
						<p>{formatDate(transaction.date)}</p>
					</div>
				</div>
				{/* (3) Transaction amount */}
				<p
					className={
						transaction.type === "expense" ? styles.negative : styles.positive
					}>
					{transaction.type === "expense"
						? "-" + formatToDollar(transaction.amount)
						: "+" + formatToDollar(transaction.amount)}
				</p>
			</article>
		);
}

export default TransactionElement;
