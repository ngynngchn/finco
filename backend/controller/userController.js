import { ObjectId } from "mongodb";
import { getDb } from "../utils/db.js";

const COL = "user";

const cardInfo = async (req, res) => {
	const userID = req.query.id;
	try {
		const db = await getDb();
		const result = await db
			.collection(COL)
			.findOne({ _id: new ObjectId(userID) });
		if (result === null) {
			throw new Error("Could not find user");
		} else {
			res.status(200).json(result.account.card).toString();
		}
	} catch (error) {
		console.error(error);
		res.status(400).json({ message: "Could not get data!" });
	}
};

const accountData = async (req, res) => {
	const userID = req.query.id;
	try {
		const db = await getDb();
		const result = await db
			.collection(COL)
			.findOne({ _id: new ObjectId(userID) });
		if (result === null) {
			throw new Error("Could not find user");
		} else {
			res.status(200).json(result.account).toString();
		}
	} catch (error) {
		console.error(error);
		res.status(400).json({ message: "Could not get data!" });
	}
};

export default {
	cardInfo,
	accountData,
};
