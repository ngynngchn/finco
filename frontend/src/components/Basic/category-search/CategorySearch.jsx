import React from "react";
import styles from "./CategorySearch.module.scss";

function CategorySearch({ onChange, value }) {
	return (
		<label className={styles.CategorySearch}>
			<input
				type="text"
				value={value}
				onChange={onChange}
				placeholder="Search for category"
			/>
		</label>
	);
}

export default CategorySearch;
