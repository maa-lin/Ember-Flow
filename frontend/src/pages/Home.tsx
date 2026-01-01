import { useContext, useState } from "react";
import { Lists } from "../components/Lists/Lists";
import { MoodContext } from "../contexts/MoodContext";
import { Navigate } from "react-router";
import { Challenge } from "../components/Challenge/Challenge";
import { Header } from "../components/Header/Header";
import { ToolBar } from "../components/ToolBar/ToolBar";
import { getHasSeenWelcomePageFromLocalStorage } from "../utils/localStorage";

export const Home = () => {

    const moodContext = useContext(MoodContext);

    if (!getHasSeenWelcomePageFromLocalStorage()) {
        return <Navigate to={"/welcome"} replace />
    };

    if (moodContext?.mood === null) {
        return <Navigate to={"/mood"} replace /> 
    };

    return <>
        <Header />
        <main>
            <Challenge />
            <Lists />
        </main>
        <ToolBar />
    </>
};