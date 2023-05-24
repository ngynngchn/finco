//* format number to $1,222.000
export const formatToDollar = (value) => {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		maximumFractionDigits: 2,
		minimumFractionDigits: 2,
	}).format(value);
};

//* format date to regular MM/DD/YYYY
export const formatDate = (value) => {
	let date = new Intl.DateTimeFormat("en-US", {
		year: "2-digit",
		month: "2-digit",
		day: "2-digit",
	}).format(new Date(value));
	return date.replaceAll("/", "-");
};

//* format date to weekday
export const formatToWeekday = (date) => {
	const newDate = new Date(date);
	return new Intl.DateTimeFormat("en-us", { weekday: "long" }).format(newDate);
};

//* styles
export const incomeStyles = {
	background: "var(--primary-col)",
	boxShadow: "var(--boxShadow-100))",
};

export const expenseStyles = {
	background: "var(--secondary-col)",
	boxShadow: "var(--boxShadow-200))",
};

//* delay redirect for better ux
export const navigateWithDelay = (navigate, path, ms) => {
	setTimeout(() => {
		navigate(path);
	}, ms);
};

//* map category to transaction
export const mapEmoji = (transaction) => {
	let found = categories[transaction.type].find((element) => {
		return element.name == transaction.category;
	});
	if (found) {
		return found.emoji;
	} else {
		return " ";
	}
};

export const mapCategory = (category, type) => {
	let found = categories[type].find((element) => {
		return element.name == category;
	});
	return found["emoji"];
};

//* format credicard number
export const formatCreditCardNumber = (inputValue) => {
	// Remove all non-digits from the input value
	const digitsOnly = inputValue.replace(/\D/g, "");
	// Add a space after every four digits
	const formattedValue = digitsOnly.replace(/(\d{4})/g, "$1 ");
	return formattedValue.trim();
};

//* add failed class to element
export const failed = (element) => {
	element.classList.add("failed");
	setTimeout(() => {
		element.classList.remove("failed");
	}, 400);
};

//* capitalize first letter
export const capitlaizeFirstLetter = (string) => {
	if (string.length === 0) {
		return " ";
	} else {
		let firstLetter = string[0].toUpperCase();
		let remainingWord = string.slice(1);
		return firstLetter + remainingWord;
	}
};

//* category mapping
export const categories = {
	income: [
		{
			id: "1",
			name: "Assistance",
			emoji: "💰",
		},
		{
			id: "2",
			name: "Parental allowance",
			emoji: "🤰🏻",
		},
		{
			id: "3",
			name: "Capital gains",
			emoji: "💹",
		},
		{
			id: "4",
			name: "Child benefit",
			emoji: "🧒",
		},
		{
			id: "5",
			name: "Unemployment Agency",
			emoji: "🏛️",
		},
		{
			id: "6",
			name: "Salary/wages",
			emoji: "💵",
		},
		{
			id: "7",
			name: "Rental income",
			emoji: "🏠",
		},
		{
			id: "8",
			name: "Pension",
			emoji: "👴🏻",
		},
		{
			id: "9",
			name: "Self-employed income",
			emoji: "👨🏼‍⚕️",
		},
		{
			id: "10",
			name: "Other income",
			emoji: "🧧",
		},
		{
			id: "11",
			name: "Study grants",
			emoji: "🎓",
		},
		{
			id: "12",
			name: "Pocket money",
			emoji: "👛",
		},
	],
	expense: [
		{
			id: "13",
			name: "Housing",
			emoji: "🏠",
		},
		{
			id: "14",
			name: "Utilities",
			emoji: "💡",
		},
		{
			id: "15",
			name: "Food and Groceries",
			emoji: "🍔",
		},
		{
			id: "16",
			name: "Transportation",
			emoji: "🚗",
		},
		{
			id: "17",
			name: "Healthcare",
			emoji: "🏥",
		},
		{
			id: "18",
			name: "Insurance",
			emoji: "📄",
		},
		{
			id: "19",
			name: "Personal Care",
			emoji: "💅🏼",
		},
		{
			id: "20",
			name: "Entertainment",
			emoji: "🎭",
		},
		{
			id: "21",
			name: "Education",
			emoji: "📚",
		},
		{
			id: "22",
			name: "Debt Repayment",
			emoji: "🏦",
		},
		{
			id: "23",
			name: "Charitable Donations",
			emoji: "🤝",
		},
		{
			id: "24",
			name: "Taxes",
			emoji: "💸",
		},
		{
			id: "25",
			name: "Travel",
			emoji: "✈️",
		},
		{
			id: "26",
			name: "Clothing",
			emoji: "👗",
		},
	],
};
