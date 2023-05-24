import { categories } from "../../utils/helper.js";
import { useEffect, useState } from "react";
import { transactionStore } from "../../utils/transactionStore.js";

// style import
import styles from "./TransactionForm.module.scss";

// img import
import forward from "../../assets/img/forward.svg";
// component import
import CategoryList from "./category-list/CategoryList";

function TransactionForm({ handleSubmit, type, handleAmount }) {
	const currentType = transactionStore.getState().transactionType;
	const [open, setOpen] = useState(null);
	// default category is the first element of the categories map of each type
	const [category, setCategory] = useState(categories[`${type}`][0].name);

	const handleCategory = (event) => {
		setCategory(event.target.value);
		setOpen(false);
	};

	useEffect(() => {
		setOpen(null);
		setCategory(categories[`${type}`][0].name);
	}, [currentType, type]);

	return (
		<div className={styles.TransactionForm}>
			<form onSubmit={handleSubmit}>
				{/* (1) Amount input field */}
				<label htmlFor="amount">
					<p>$</p>
					<input
						type="number"
						name="amount"
						id="amount"
						step=".01"
						placeholder="0.00"
						required
						onChange={handleAmount}
					/>
				</label>

				{/* (2) Category selection */}
				<label htmlFor="category">Category</label>
				<button
					onClick={() => setOpen(true)}
					className={styles.CategoryButton}
					type="button"
					value={category}>
					{category} <img src={forward} alt="arrow" />
				</button>

				<CategoryList
					onClick={handleCategory}
					open={open}
					onclick={() => setOpen(false)}
					currentType={type}
				/>

				{/* (3) Time selection */}
				<div>
					<label htmlFor="date">Date</label>
					<label htmlFor="time">Time</label>
					<input
						type="text"
						name="date"
						id="date"
						required
						placeholder="dd/mm/yyyy"
						onMouseOver={(e) => {
							e.currentTarget.type = "date";
							e.currentTarget.focus();
						}}
					/>
					<input
						type="text"
						name="time"
						id="time"
						placeholder="hh/mm"
						required
						onMouseOver={(e) => {
							e.currentTarget.type = "time";
							e.currentTarget.focus();
						}}
					/>
				</div>

				{/* (4) Submit */}
				<button type="submit">Add {type}</button>
			</form>
		</div>
	);
}

export default TransactionForm;
