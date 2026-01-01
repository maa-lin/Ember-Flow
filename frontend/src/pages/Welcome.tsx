import { WelcomeModal } from "../components/WelcomeModal/WelcomeModal";
import { getHasSeenWelcomePageFromLocalStorage } from "../utils/localStorage";
import { Navigate } from "react-router";

export const Welcome = () => {

    if (getHasSeenWelcomePageFromLocalStorage()) {
        return <Navigate to={"/"} replace />
    }

    return <>
        <WelcomeModal />
    </>
};