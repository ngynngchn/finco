import { useState, useEffect } from "react";
import { formatToDollar } from "../../../utils/helper.js";

// style import
import styles from "./BalanceCard.module.scss";

const BalanceCard = () => {
	const [balance, setBalance] = useState(0);
	const url = import.meta.env.VITE_BACKEND_URL;

	useEffect(() => {
		const getMonthlyBalance = async () => {
			try {
				const result = await fetch(url + "getTotalTransactionsByMonth", {
					credentials: "include",
				});
				if (result.ok) {
					const data = await result.json();
					setBalance(data.total);
				} else {
					const message = await result.text();
					throw new Error(message);
				}
			} catch (error) {
				console.log(error);
			}
		};
		getMonthlyBalance();
	});

	return (
		<div className={styles.BalanceCard}>
			<p>Disposable income</p>
			<h4>{formatToDollar(balance)}</h4>
		</div>
	);
};

export default BalanceCard;
