import { ObjectId } from "mongodb";
import { getDb } from "../utils/db.js";
import { getCurrentMonthStart, getCurrentMonthEnd } from "../utils/helper.js";

const COL = "user";

export const addTransaction = async (req, res) => {
	const userID = req.userClaims.sub;
	const transaction = req.body;
	try {
		if (+transaction.amount <= 0) {
			throw new Error("Invalid input");
		} else {
			const db = await getDb();
			const response = await db
				.collection(COL)
				.findOneAndUpdate(
					{ _id: new ObjectId(userID) },
					{ $push: { [`transactions.${transaction.date}`]: transaction } },
					{ returnDocument: "after" }
				);
			res.status(200).send("Added transaction successsfully");
		}
	} catch (error) {
		console.error(error.message);
		res.status(400).send(error.message);
	}
};

export const getAllTransactions = async (req, res) => {
	const userID = req.userClaims.sub;
	try {
		const db = await getDb();
		const result = await db
			.collection(COL)
			.findOne({ _id: new ObjectId(userID) });
		if (result === null) {
			throw new Error("Could not find user");
		} else {
			res.status(200).json(result.transactions).toString();
		}
	} catch (error) {
		console.error(error);
		res.status(400).json({ message: "Could not get data!" });
	}
};

export const getTransactionsFiltereredByType = async (req, res) => {
	const user = req.userClaims.sub;
	const type = req.query.type;
	try {
		const db = await getDb();
		const result = await db
			.collection(COL)
			.findOne({ _id: new ObjectId(user) });
		if (result == null) {
			throw new Error("Could not find user");
		} else {
			let allTransactions = result.transactions;
			let subject = { transactions: {}, total: 0 };
			Object.entries(allTransactions).forEach(([key, value]) => {
				value.forEach((transaction) => {
					if (transaction.type == type) {
						if (subject.transactions.hasOwnProperty(key)) {
							subject.transactions[key].push(transaction);
							subject.total += +transaction.amount;
						} else {
							subject.transactions[key] = [transaction];
							subject.total += +transaction.amount;
						}
					}
				});
			});
			res.status(200).json(subject);
		}
	} catch (error) {
		console.log(error);
		res.status(400).send(error.message);
	}
};

export const getTotalSumOfTransactions = async (req, res) => {
	try {
		const db = await getDb();
		const result = await db
			.collection(COL)
			.findOne({ _id: new ObjectId(req.userClaims.sub) });
		if (result.hasOwnProperty("transactions")) {
			const total = { income: 0, expense: 0 };
			Object.entries(result.transactions).forEach(([key, value]) => {
				value.forEach((transaction) => {
					transaction.type == "income"
						? (total.income += +transaction.amount)
						: (total.expense += +transaction.amount);
				});
			});
			res.status(200).json(total);
		} else {
			throw new Error("You don't have any transactions yet");
		}
	} catch (error) {
		console.error(error);
		res.status(400).send("Something went wrong");
	}
};

export const getTotalTransactionsByMonth = async (req, res) => {
	try {
		const db = await getDb();
		const result = await db
			.collection(COL)
			.findOne({ _id: new ObjectId(req.userClaims.sub) });
		const currentMonthStart = getCurrentMonthStart();
		const currentMonthEnd = getCurrentMonthEnd();
		if (result.hasOwnProperty("transactions")) {
			let totalIncome = 0;
			let totalExpense = 0;
			Object.entries(result.transactions).forEach(([key, value]) => {
				value.forEach((transaction) => {
					const transactionDate = new Date(transaction.date);
					if (
						transactionDate >= currentMonthStart &&
						transactionDate <= currentMonthEnd
					) {
						if (transaction.type === "income") {
							totalIncome += +transaction.amount;
						} else if (transaction.type === "expense") {
							totalExpense += +transaction.amount;
						}
					}
				});
			});

			const total = totalIncome - totalExpense;
			res.status(200).json({ total, totalIncome, totalExpense });
		} else {
			throw new Error("You don't have any transactions");
		}
	} catch (error) {
		res.status(400).send(error.message);
	}
};

export const setBudget = async (req, res) => {
	const userID = req.query.id;
	const { budget } = req.body; // Extract the budget value from the request body
	try {
		const db = await getDb();
		const response = await db.collection(COL).findOneAndUpdate(
			{ _id: new ObjectId(userID) },
			{ $set: { "account.budget": budget } }, // Update the budget field directly with the extracted value
			{ returnDocument: "after" }
		);
		res.status(200).json({ budget: budget });
	} catch (error) {
		console.error(error);
		res.status(400).send("Something went wrong");
	}
};

export const getTotalExpensesByMonth = async (req, res) => {
	try {
		const db = await getDb();
		const result = await db
			.collection(COL)
			.findOne({ _id: new ObjectId(req.userClaims.sub) });

		const currentMonthStart = getCurrentMonthStart();
		const currentMonthEnd = getCurrentMonthEnd();
		if (result.hasOwnProperty("transactions")) {
			let totalExpense = 0;
			Object.entries(result.transactions).forEach(([key, value]) => {
				value.forEach((transaction) => {
					const transactionDate = new Date(transaction.date);
					if (
						transactionDate >= currentMonthStart &&
						transactionDate <= currentMonthEnd &&
						transaction.type === "expense"
					) {
						totalExpense += +transaction.amount;
					}
				});
			});

			res.status(200).json(totalExpense);
		} else {
			throw new Error("You don't have any expenes yet");
		}
	} catch (error) {
		console.error(error.message);
		res.status(400).send(error.message);
	}
};
