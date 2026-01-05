import { useEffect, useState } from "react";
import type { IAffirmation } from "../../models/IAffirmation";
import { getAffirmation } from "../../services/affirmationService";
import type { ListTypes } from "../../reducers/DailyStateReducer";
import { AffirmationModal } from "../AffirmationModal/AffirmationModal";

type GetListAffirmationProps = {
    isOpen: boolean,
    onClose: () => void,
    listType: ListTypes
};

export const GetListAffirmation = (props: GetListAffirmationProps) => {
    const [affirmation, setAffirmation] = useState<IAffirmation>();

    useEffect(() => {
        if (!props.isOpen) return;

        const getData = async () => {
            try {
                const data = await getAffirmation(props.listType);
                setAffirmation(data);
            } catch (error) {
                console.error(error);
            }
        };
        
        getData();

    }, [props.isOpen]);

    if (!props.isOpen || !affirmation) return null;

    return <>
        <AffirmationModal onClose={props.onClose} affirmation={affirmation.text} />
    </>
}