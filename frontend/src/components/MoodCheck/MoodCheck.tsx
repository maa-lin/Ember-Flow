import { useContext } from "react"
import { NavLink } from "react-router";
import { MoodContext } from "../../contexts/MoodContext";
import type { Mood } from "../../models/IMoodContext";

export const MoodCheck = () => {

    const moodContext = useContext(MoodContext);

    if (!moodContext) {
        return null;
    };


    const handleClick = (mood: Mood) => {
        moodContext.setMood(mood);
    };

    console.log(moodContext.mood)

    return <div>
        <h1>Mood check-in</h1>
        <h2>Welcome back - what is your mood today?</h2>
        <ul>
            <li><button onClick={() => handleClick("happy")}>😀 Happy</button></li>
            <li><button onClick={() => handleClick("calm")}>😌 Calm</button></li>
            <li><button onClick={() => handleClick("neutral")}>😐 Neutral</button></li>
            <li><button onClick={() => handleClick("stressed")}>😥 Stressed</button></li>
        </ul>

        {moodContext.mood && <NavLink to={"/"}>Start your day</NavLink>}
        
    </div>
}