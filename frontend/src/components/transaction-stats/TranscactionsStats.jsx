import { incomeStyles, expenseStyles } from "../../utils/helper.js";
import styles from "./TransactionsStats.module.scss";
import { Link } from "react-router-dom";

// img import
import trendingUp from "../../assets/img/trending-up.svg";
import trendingDown from "../../assets/img/trending-down.svg";
// component import
import TransactionCard from "./transaction-card/TransactionCard";

function TranscactionsStats({
	incomeAmount,
	expenseAmount,
	mini,
	incomePath,
	expensePath,
	incomeContent,
	expenseContent,
}) {
	return (
		<div className={styles.TranscactionsStats}>
			<Link to={incomePath}>
				<TransactionCard
					amount={incomeAmount}
					img={trendingUp}
					style={incomeStyles}
					content={incomeContent}
					mini={mini}
				/>
			</Link>

			<Link to={expensePath}>
				<TransactionCard
					amount={expenseAmount}
					img={trendingDown}
					style={expenseStyles}
					content={expenseContent}
					mini={mini}
				/>
			</Link>
		</div>
	);
}

export default TranscactionsStats;
