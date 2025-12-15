import { data, NavLink } from "react-router";
import type { ListTypes } from "../../reducers/DailyStateReducer";
import { useEffect, useState } from "react";
import type { IAffirmation } from "../../models/IAffirmation";
import { getAffirmation } from "../../services/affirmationService";

type AffirmationModalProps = {
    isOpen: boolean,
    onClose: () => void,
    listType: ListTypes
};

export const AffirmationModal = (props: AffirmationModalProps) => {

    const [affirmation, setAffirmation] = useState<IAffirmation>();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!props.isOpen) return;

        const getData = async () => {

            setLoading(true);
            
            try {
                const data = await getAffirmation(props.listType);
                setAffirmation(data);
                
            } catch (error) {
                console.error(error);

            } finally {
                setLoading(false);
            }
        };
        
        getData();

    }, [props.isOpen]);

    if (!props.isOpen) return null;

    // e.stopPropagation to stop toggle on <li>
    return <div onClick={(e) => { e.stopPropagation() }}>
        <p>{ loading ? "Loading..." : affirmation?.text }</p>
        <p>Do you want to pause for a moment to breathe before continuing with your day?</p>
        <NavLink to={"/breathe"}><button>Breathe</button></NavLink>
        <NavLink to={"/"} onClick={props.onClose}>Skip for now</NavLink>
    </div>
}