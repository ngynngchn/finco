import { getDb } from "../utils/db.js";
import { createToken } from "../utils/token.js";
import { ObjectId } from "mongodb";

const COL = "user";

const register = async (req, res) => {
	const email = req.body.account.email;
	console.log(email);
	try {
		const db = await getDb();

		// check if user already exists
		const user = await db
			.collection(COL)
			.findOne({ account: { email: email } });
		console.log(user);
		if (user == null) {
			await db.collection(COL).insertOne(req.body);
			res.status(200).send("Successfully registered");
		} else {
			res.status(401).send("Invalid email or password");
		}
	} catch (error) {
		console.error("Error occurred during registration:", error);
		res.status(500).send("Internal server error");
	}
};

const logout = async (req, res) => {
	res.clearCookie("t0k3n").sendStatus(200);
};

const setup = async (req, res) => {
	try {
		const { cardNumber, expDate, _id, budget } = req.body;

		const db = await getDb();
		const updateFields = {};
		if (cardNumber && cardNumber.length === 19) {
			updateFields["account.card.cardNumber"] = cardNumber;
		}
		if (expDate && new Date(expDate) > new Date()) {
			updateFields["account.card.expDate"] = expDate;
		}
		if (req.file) {
			updateFields["account.profileImage"] = req.file.path;
		}
		if (budget && parseFloat(budget) > 0) {
			updateFields["account.budget"] = parseFloat(budget);
		}
		const result = await db.collection(COL).findOneAndUpdate(
			{ _id: new ObjectId(_id) },
			{
				$set: {
					...updateFields,
				},
			},
			{ returnDocument: "after" }
		);

		res.status(200).json(result.value);
	} catch (err) {
		console.log(err);
		res.status(500).end();
	}
};

const login = async (req, res) => {
	try {
		const db = await getDb();
		const foundUser = await db.collection(COL).findOne({
			"account.email": req.body.account.email,
			"account.password": req.body.account.password,
		});
		if (!foundUser) {
			throw new Error("user not found, try again");
		}
		const token = createToken(foundUser._id, foundUser.role);
		res.cookie("t0k3n", token, {
			secure: true,
			httpOnly: true,
		});
		res.status(200).json({
			id: foundUser._id,
			user: foundUser.account.username,
			pic: foundUser.account.profileImage,
			budget: foundUser.account.budget,
		});
	} catch (error) {
		console.log("userController-login: ", error);
		res.status(500).end();
	}
};

const authenticate = async (req, res) => {
	try {
		res.status(200).json(req.userClaims.sub);
	} catch (error) {
		res.status(500).end();
	}
};

export default {
	register,
	login,
	logout,
	authenticate,
	setup,
};
