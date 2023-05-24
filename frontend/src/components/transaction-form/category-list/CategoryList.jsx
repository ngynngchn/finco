import { categories } from "../../../utils/helper.js";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// style import
import styles from "./CategoryList.module.scss";

// img import
import forward from "../../../assets/img/forward.svg";
import search from "../../../assets/img/search.svg";
import back from "../../../assets/img/back.svg";

function CategoryList({ onClick, open, onclick, currentType }) {
	const [type, setType] = useState(currentType);
	const inputRef = useRef();
	const searchRef = useRef();
	const [filteredCategories, setFilteredCategories] = useState(
		categories[`${type}`]
	);

	useEffect(() => {
		setType(currentType);
		filterCategories();
	}, [currentType, type]);

	const filterCategories = () => {
		const searchQuery = searchRef.current.value.toLowerCase();
		const filtered = categories[`${type}`].filter((category) =>
			category.name.toLowerCase().includes(searchQuery)
		);
		setFilteredCategories(filtered);
	};

	return (
		<div
			className={
				open
					? `${styles.moveIn} ${styles.CategoryList}`
					: open === null
					? `${styles.CategoryList}`
					: `${styles.CategoryList} ${styles.moveOut}`
			}>
			{/* (1) Head of category list */}
			<div className={styles.Head}>
				<button onClick={onclick}>
					<img src={back} alt="back" />
				</button>
				<h2>Choose a Category</h2>
				<label htmlFor="search">
					<img src={search} alt="search icon" />
					<input
						className="collapsed"
						type="search"
						name="search"
						ref={searchRef}
						id="search"
						onChange={() => filterCategories()}
						placeholder="Search for category"
					/>
				</label>
			</div>

			{/* (2) List of categories  */}
			<div className={styles.List}>
				{filteredCategories.length > 0 ? (
					filteredCategories.map((category) => (
						<label onClick={onClick} key={category.id} htmlFor={category.name}>
							<h3>{category.emoji}</h3>
							<p>{category.name}</p>
							<input
								type="radio"
								name="category"
								id={category.name}
								value={category.name}
								ref={inputRef}
								onChange={(e) => console.log(e.target.value)}
							/>
							<img src={forward} alt="icon" />
						</label>
					))
				) : (
					<p className={styles.notFound}> Sorry no matching category found !</p>
				)}
			</div>
		</div>
	);
}

export default CategoryList;
