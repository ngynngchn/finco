import { getDb } from "../utils/db.js"
import { createToken } from "../utils/create-token.utils.js"

const login = async (req, res) => {
	try {
		const db = await getDb()
		const foundUser = await db.collection("finco").findOne({ email: req.body.email, password: req.body.password })
		if (!foundUser) {
			throw new Error("user not found, try again")
		}
		const token = createToken(foundUser._id, foundUser.role)
		res.cookie("t0k3n", token, {
			secure: true,
			httpOnly: true,
		})

		res.send("logged in")
	} catch (error) {
		console.log("userController-login: ", error)
		res.status(500).end()
	}
}

const auth = async (req, res) => {
	try {
		console.log("userClaims", req.userClaims)
		// const db = await getDB()
		// const sub = await db.collection("finco").findOne({ _id: req.userClaims.sub })
		res.status(200).json(req.userClaims.sub)
	} catch (error) {
		res.status(500).end()
	}
}

export default {
	login,
	auth,
}
