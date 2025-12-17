import { NavLink } from "react-router";

type AffirmationModalProps = {
    onClose: () => void,
    affirmation: string
};

export const AffirmationModal = (props: AffirmationModalProps) => {

    // e.stopPropagation to stop toggle on <li>
    return <div onClick={(e) => { e.stopPropagation() }}>
        <p>{props.affirmation}</p>
        <p>Do you want to pause for a moment to breathe before continuing with your day?</p>
        <NavLink to={"/breathe"}><button>Breathe</button></NavLink>
        <NavLink to={"/"} onClick={props.onClose}>Skip for now</NavLink>
    </div>
}