import { BreatheModal } from "../components/BreatheModal/BreatheModal";
import { useTitle } from "../hooks/useTitle";

export const Breathe = () => {
    useTitle("Breathe");

    return <>
    <main>
        <BreatheModal />
    </main>
    </>
};