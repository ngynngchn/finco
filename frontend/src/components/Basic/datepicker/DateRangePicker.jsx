import DatePicker from "react-datepicker";

// style import
import styles from "./DatePicker.module.scss";
import "react-datepicker/dist/react-datepicker.css";

function DateRangePicker({ dateRange, endDateChange, startDateChange }) {
	return (
		<div className={styles.DatePicker}>
			<DatePicker
				id="startDate"
				selected={dateRange.start}
				onChange={startDateChange}
				dateFormat="yyyy-MM-dd"
				isClearable
				placeholderText="Select start date"
				shouldCloseOnSelect={true}
			/>
			<DatePicker
				id="endDate"
				selected={dateRange.end}
				onChange={endDateChange}
				dateFormat="yyyy-MM-dd"
				isClearable
				placeholderText="Select end date"
				shouldCloseOnSelect={true}
			/>
		</div>
	);
}

export default DateRangePicker;
