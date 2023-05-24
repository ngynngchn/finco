import styles from "./TransactionCard.module.scss";

function TransactionCard({ amount, img, style, content, mini }) {
	return (
		<article
			/* select style depending on "mini" */
			className={mini ? ` ${styles.MiniCard}` : `${styles.TransactionCard}`}>
			<img src={img} alt="icon" style={style} />
			<p>{content}</p>
			<h4>
				{content.includes("Expense") || content == "Current" ? "-" : "+"}
				{amount}
			</h4>
		</article>
	);
}

export default TransactionCard;
