import { useEffect, useRef, useState } from "react";
import { userStore } from "../../utils/userStore.js";

// style import
import styles from "./CreditCardDetails.module.scss";

//img import
import chip from "../../assets/img/chip.svg";
import check from "../../assets/img/check.svg";
import danger from "../../assets/img/danger.svg";
import alert from "../../assets/img/alert.svg";

function CreditCardDetails() {
	const url = import.meta.env.VITE_BACKEND_URL;
	const [cardInfo, setCardInfo] = useState({});
	const [validCC, setValidCC] = useState(true);
	const userID = userStore((state) => state.userID);

	const messageRef = useRef();

	useEffect(() => {
		const getCreditCardInfo = async () => {
			try {
				const result = await fetch(url + "getCardInfo?id=" + userID, {
					credentials: "include",
				});
				if (result.ok) {
					const data = await result.json();

					let date = new Intl.DateTimeFormat("en-US", {
						year: "2-digit",
						month: "2-digit",
					}).format(new Date(data.expDate));

					let cardNumber = data.cardNumber.substr(-4);
					if (new Date(data.expDate) > new Date()) {
						setValidCC(true);
					} else {
						setValidCC(false);
						if (!messageRef.current.open) {
							messageRef.current.showModal();
						}
					}
					setCardInfo({ cardNumber: cardNumber, expDate: date });
				} else {
					const message = await result.json();
					throw new Error(message);
				}
			} catch (error) {
				console.error(error);
			}
		};
		getCreditCardInfo();
	}, []);

	if (!cardInfo) return;

	return (
		<div className={styles.CreditCard}>
			<div
				className={styles.verification}
				style={{
					background: validCC ? "var(--positive-col)" : "var(--danger-col)",
				}}>
				<p>{validCC ? "valid" : "invalid"} </p>
				<img src={validCC ? check : danger} alt="verification icon" />
			</div>
			<div className={styles.container}>
				<p>Credit Card</p>
				<h5>
					<span>•••• •••• ••••</span> {cardInfo.cardNumber}
				</h5>
				<img src={chip} alt="chip" width="50px" />
				<h6>{cardInfo.expDate}</h6>
			</div>
			<dialog ref={messageRef}>
				<div>
					<img src={alert} alt="alert" />
				</div>
				<h3>
					Your credit card has expired! <br></br>
					Contact your provider ASAP!
					<button
						onClick={() => {
							messageRef.current.close();
						}}>
						GOT IT!
					</button>
				</h3>
			</dialog>
		</div>
	);
}

export default CreditCardDetails;
