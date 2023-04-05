import styles from "./deleteItemConfirmation.module.scss";

const deleteBirthdayEndpoint = process.env.REACT_APP_SERVER_URL + "/birthdays/";

const DeleteItemConfirmation = (props) => {
	const endpoint = deleteBirthdayEndpoint + props.itemId;

	//TODO: add botId validation
	const confirmDeleteItemHandler = () => {
		fetch(endpoint, {
			method: "DELETE",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((response) => {
				console.log("Deleted");

				props.onSuccess();
			});
	};

	return (
		<div className={styles.deleteRow}>
			<p>Are you sure you want to delete this birthday?</p>
			<button className={styles.confirm} onClick={confirmDeleteItemHandler}>
				Yes
			</button>
			<button className={styles.cancel} onClick={() => props.onCancel()}>
				Cancel
			</button>
		</div>
	);
};

export default DeleteItemConfirmation;
