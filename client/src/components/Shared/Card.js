const Card = (props) => {
	const cardStyles = {
		background: "white",
		padding: "10px",
		boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
		margin: "20px auto",
		width: "90%",
		maxWidth: "500px",
		borderRadius: "10px",
	};
	return <div style={cardStyles}>{props.children}</div>;
};

export default Card;
