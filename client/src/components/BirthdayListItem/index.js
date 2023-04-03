import { useState } from "react";
import { FaTrashAlt, FaPencilAlt } from "react-icons/fa";
import styles from "./birthdayListItem.module.scss";
import DeleteItemConfirmation from "../DeleteItemConfirmation";
import BirthdayForm from "../BirthdayForm";

const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

const BirthdayListItem = (props) => {
	const { birthday } = props;
	const [secondRowContent, setSecondRowContent] = useState();
	const [itemWasDeleted, setItemWasDeleted] = useState(false);

	const editItemFormHandler = (newBirthday) => {
		//need to POST/PATCH the DB
	};

	const cancelEditFormHandler = () => {
		setSecondRowContent("");
	};

	const deleteItemConfirmationContent = (
		<DeleteItemConfirmation
			onSuccess={() => setItemWasDeleted(true)}
			onCancel={() => setSecondRowContent("")}
			itemId={birthday._id}
		/>
	);
	const editItemContent = (
		<div>
			<BirthdayForm
				onSubmit={editItemFormHandler}
				onCancel={cancelEditFormHandler}
			/>
		</div>
	);

	if (itemWasDeleted) {
		return (
			<div className={styles.row}>
				<p>Item deleted</p>
			</div>
		);
	} else {
		return (
			<div className={styles.row}>
				<div className={styles.data}>
					<div>
						<strong className={styles.name}>{birthday.name}</strong>
						<p>
							{months[birthday.month - 1]} {birthday.day}
						</p>
					</div>
					<div className={styles.actionItems}>
						<span
							role="button"
							onClick={() => setSecondRowContent(editItemContent)}
						>
							<FaPencilAlt />
						</span>
						<span
							role="button"
							onClick={() => setSecondRowContent(deleteItemConfirmationContent)}
						>
							<FaTrashAlt />
						</span>
					</div>
				</div>
				{birthday.message && (
					<div>
						<p>Custom message:</p>
						<em>{birthday.message}</em>
					</div>
				)}
				{secondRowContent && (
					<div className={styles.secondRow}>{secondRowContent}</div>
				)}
			</div>
		);
	}
};

export default BirthdayListItem;
