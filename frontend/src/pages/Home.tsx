import { useContext } from "react";
import { Lists } from "../components/Lists/Lists";
import { TopBar } from "../components/TopBar/TopBar";
import { MoodContext } from "../contexts/MoodContext";
import { Navigate } from "react-router";
import { Challenge } from "../components/Challenge/Challenge";

export const Home = () => {

    const moodContext = useContext(MoodContext);

    if (moodContext?.mood === null) {
        return <Navigate to={"/mood"} replace /> 
    };

    return <>
        <TopBar />
        <main>
            <Challenge />
            <Lists />
        </main>
    </>
};