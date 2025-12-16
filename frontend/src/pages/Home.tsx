import { useContext } from "react";
import { Lists } from "../components/Lists/Lists";
import { MoodContext } from "../contexts/MoodContext";
import { Navigate } from "react-router";
import { Challenge } from "../components/Challenge/Challenge";
import { Header } from "../components/Header/Header";

export const Home = () => {

    const moodContext = useContext(MoodContext);

    if (moodContext?.mood === null) {
        return <Navigate to={"/mood"} replace /> 
    };

    return <>
        <Header />
        <main>
            <Challenge />
            <Lists />
        </main>
    </>
};