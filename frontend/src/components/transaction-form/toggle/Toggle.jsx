import React from "react";
import style from "./Toggle.module.scss";
import { transactionStore } from "../../../utils/transactionStore";

function Toggle({ onchange }) {
	const type = transactionStore.getState().transactionType;
	return (
		<div className={style.Toggle}>
			<input
				type="radio"
				name="type"
				id="expense"
				value="expense"
				onChange={onchange}
				checked={type == "expense"}
			/>
			<label htmlFor="expense">Expense</label>
			<input
				type="radio"
				name="type"
				id="income"
				value="income"
				onChange={onchange}
				checked={type == "income"}
			/>
			<label htmlFor="income">Income</label>
		</div>
	);
}

export default Toggle;
