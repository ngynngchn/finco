import { useState, useEffect } from "react";
// zustand store
import { userStore } from "../../../utils/userStore.js";
// style import
import styles from "./BalanceCard.module.scss";
import { formatToDollar } from "../../../utils/helper.js";

const BalanceCard = () => {
	const [balance, setBalance] = useState(0);
	const url = import.meta.env.VITE_BACKEND_URL;
	const userID = userStore((state) => state.userID);

	useEffect(() => {
		const getMonthlyBalance = async () => {
			try {
				const result = await fetch(
					url + "getTotalTransactionsByMonth?id=" + userID,
					{
						credentials: "include",
					}
				);
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
