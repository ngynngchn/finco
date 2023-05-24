import forward from "../../assets/img/forward.svg";
import toggle from "../../assets/img/toggle.png";

//TODO: Notification Button gets a toggle icon / function

function MenuButton({ img, alt, children, onClick }) {
	return (
		<button onClick={onClick}>
			<img src={img} alt={alt} />
			{children}
			<img src={forward} alt="Forward" />
		</button>
	);
}

export default MenuButton;
