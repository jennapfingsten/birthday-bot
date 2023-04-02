import styles from "./birthdayForm.module.scss";

const InputRow = (props) => {
	const { labelFor, labelMessage, children } = props;
	return (
		<div className={styles.inputRow}>
			{labelFor && labelMessage && <label for={labelFor}>{labelMessage}</label>}
			{children}
		</div>
	);
};

export default InputRow;
