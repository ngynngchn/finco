import { useState, useEffect } from "react";
import { userStore } from "../../utils/userStore.js";
import styles from "./FilterTransactionList.module.scss";
import circle from "../../assets/img/bg.svg";

const FilterTransactionList = () => {
    const [transactions, setTransactions] = useState([]);
    const [filterTerm, setFilterTerm] = useState("");
    const userID = userStore((state) => state.userID);

    const URL = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        const getTransactions = async () => {
            const response = await fetch(URL + "getAllTransactions?id=" + userID, {
                credentials: "include",
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            setTransactions(data);
        };
        getTransactions();
    }, []);

    const handleFilterChange = (event) => {
        setFilterTerm(event.target.value);
    };

    const filteredTransactions = Object.entries(transactions).filter(
        ([key, array]) =>
            array.some((transaction) =>
                transaction.category.toLowerCase().includes(filterTerm.toLowerCase())
            )
    );

    return (
        <section>
            <div>
                <label>
                    Filter by Category:
                    <input
                        type="text"
                        value={filterTerm}
                        onChange={handleFilterChange}
                        placeholder="Enter category name"
                    />
                </label>
            </div>
            <article className={styles.TransactionList}>
                {filteredTransactions.length === 0 ? (
                    <p>Nothing found</p>
                ) : (
                    filteredTransactions.map(([key, array]) => (
                        <div className={styles.TransactionContainer} key={key}>
                            <h1>{key}</h1>
                            {array
                                .filter((transaction) =>
                                    transaction.category
                                        .toLowerCase()
                                        .includes(filterTerm.toLowerCase())
                                )
                                .map((transaction, index) => (
                                    <div
                                        className={styles.SingleTransaction}
                                        key={index}
                                    >
                                        <img
                                            src={circle}
                                            alt=""
                                            className={styles.TransactionImage}
                                        />
                                        <div className={styles.TransactionDetails}>
                                            <h4>{transaction.category}</h4>
                                            <div className={styles.DateTime}>
                                                <p>{transaction.time}</p>
                                                <p>{transaction.date}</p>
                                            </div>
                                        </div>
                                        <p
                                            className={
                                                transaction.type === "expense"
                                                    ? "red"
                                                    : "green"
                                            }
                                        >
                                            {`$${transaction.amount}`}
                                        </p>
                                    </div>
                                ))}
                        </div>
                    ))
                )}
            </article>
        </section>
    );
};

export default FilterTransactionList;