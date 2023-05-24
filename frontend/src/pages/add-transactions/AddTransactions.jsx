import { useNavigate } from "react-router-dom";
import { categories, navigateWithDelay } from "../../utils/helper.js";
import { transactionStore } from "../../utils/transactionStore.js";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

// style import
import styles from "./AddTransactions.module.scss";

// component import
import CreditCardDetails from "../../components/CreditCard/CreditCardDetails.jsx";
import TransactionForm from "../../components/transaction-form/TransactionForm.jsx";
import Toggle from "../../components/transaction-form/toggle/Toggle.jsx";
import Header from "../../components/header/Header.jsx";

function AddTransactions() {
	const currentType = transactionStore.getState().transactionType;
	const setCurrentType = (value) =>
		transactionStore.getState().setTransactionType(value);
	const [type, setType] = useState(currentType);
	const [selectedCategory, setCategory] = useState(
		categories[`${type}`][0].name
	);

	const url = import.meta.env.VITE_BACKEND_URL;

	const navigate = useNavigate();

	const addTransaction = async (event) => {
		event.preventDefault();

		const form = new FormData(event.target);

		form.append("type", type);
		form.delete("search");

		if (form.get("category") == null) {
			form.append("category", selectedCategory);
		}
		const transactionFetch = fetch(url + "addTransaction", {
			method: "POST",
			credentials: "include",
			body: form,
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Invalid input!");
				} else {
					return response.text();
				}
			})
			.then((message) => {
				console.log(message);
				return message;
			})
			.catch((err) => {
				console.error(err);
				throw new Error("Could not add transaction.");
			});

		await toast.promise(transactionFetch, {
			loading: "Submitting..",
			success: (message) => {
				console.log(message);
				return `Added ${type}!`;
			},
			error: (err) => {
				console.error(err.message);
				return `Could not add ${type}.`;
			},
		});
		navigateWithDelay(navigate, `/transactions/${type}`, 1500);
	};

	const handleChange = (e) => {
		setCurrentType(e.target.value);
		setType(e.target.value);
	};

	return (
		<section className={styles.AddTransactions}>
			<Header back profile title="Add Transactions" />
			<Toggle onchange={handleChange} />
			<CreditCardDetails />
			<TransactionForm handleSubmit={addTransaction} type={type} />
			<Toaster />
		</section>
	);
}

export default AddTransactions;
