import styles from "./TransactionElement.module.scss";
import { formatToDollar, mapEmoji } from "../../../utils/helper.js";

function TransactionElement({ transaction }) {
	if (transaction)
		return (
			<article className={styles.TransactionElement}>
				<div
					className={styles.TransactionImage}
					style={{ backgroundColor: "var(--bg-100)" }}>
					<h3>{mapEmoji(transaction)}</h3>
				</div>
				<div className={styles.TransactionDetails}>
					<h4>{transaction.category}</h4>
					<div className={styles.DateTime}>
						<p>{transaction.time}</p>
						<p>{transaction.date}</p>
					</div>
				</div>
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
