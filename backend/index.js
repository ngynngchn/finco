import "./utils/config.js";
import express from "express";
import cors from "cors";
import multer from "multer";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authController from "./controller/authController.js";

import { verifyToken, encryptPassword } from "./middleware/authMiddleware.js";

import userController from "./controller/userController.js";
import {
	addTransaction,
	getAllTransactions,
	getTotalTransactionsByMonth,
	setBudget,
	getTotalExpensesByMonth,
	getTransactionsFiltereredByType,
	getTotalSumOfTransactions,
} from "./controller/transactionsController.js";

const server = express();
const PORT = process.env.PORT;
const upload = multer({ dest: "./img" });

// * ===== BODY PARSER ======
// enabling cors
server.use(cors({ origin: true, credentials: true }));
// for JSON
server.use(express.json());
// for cookies
server.use(cookieParser());
// for files and form fields add multer
server.use("/img", express.static("./img"));

// * ===== LOGGER ======
server.use(morgan("dev"));

//* ====== ROUTES ======

//* user routes
server.get("/getCardInfo", userController.cardInfo);
server.get("/getAllAccountData", userController.accountData);

//* transaction routes
server.post("/addTransaction", upload.none(), verifyToken, addTransaction);
server.post("/setBudget", verifyToken, setBudget);

server.get("/getTotalTransactions", verifyToken, getTotalSumOfTransactions);

server.get(
	"/getTotalTransactionsByMonth",
	verifyToken,
	getTotalTransactionsByMonth
);

server.get("/transactions", verifyToken, getTransactionsFiltereredByType);

server.get("/getTotalExpensesByMonth", verifyToken, getTotalExpensesByMonth);

server.get("/getAllTransactions", verifyToken, getAllTransactions);

//* auth routes

//! register route needs validation of password and email
server.post("/register", encryptPassword, authController.register);
server.post("/login", encryptPassword, authController.login);
server.post("/logout", authController.logout);
server.get("/auth", verifyToken, authController.authenticate);
server.post("/setup", upload.single("profileImage"), authController.setup);

// server.post("/register", encryptPassword, async (req, res) => {
// 	const db = await getDb();
// 	const result = await db.collection("finco").insertOne(req.body);
// 	res.json(result);
// });

// * ===== SERVER ======
server.listen(PORT, () => console.log("I am listening to PORT:", PORT));
