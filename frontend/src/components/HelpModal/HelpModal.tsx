import styles from "./HelpModal.module.scss"
import { FaBookOpen, FaPagelines } from "react-icons/fa6"
import { FaChevronDown } from "react-icons/fa"
import { CloseButton } from "../CloseButton/CloseButton"
import { useContext } from "react"
import { MoodContext } from "../../contexts/MoodContext"
import { Navigate } from "react-router"

export const HelpModal = () => {

    const moodContext = useContext(MoodContext);

    if (!moodContext) {
        return <Navigate to={"/mood"} replace />
    }

    return <div className={styles.help}>
        <CloseButton />
        <h1>Ember Flow</h1>
        <p className="tagline">— Tend your energy, one gentle moment at a time. </p>

        <p>
            Ember Flow helps you find calm in your daily rhythm by guiding you 
            to focus on what truly matters — the few things that deserve your 
            energy and the moments that help you restore it.
        </p>
        <p>
            Let <strong>Ember Flow</strong> be your calm companion, encouraging gentle progress 
            and mindful moments, so you can flow through your day with ease and presence.
        </p>

        <details>
            <summary><span><FaPagelines /> What is mindfullness?</span><FaChevronDown className={styles.chevron} /></summary>
            <p>
                Mindfulness is the practice of paying attention to the <strong>present moment</strong> — your thoughts, 
                feelings, and surroundings without judgment. 
                </p>
                <p>
                It helps you slow down, notice what 
                you need, and make more intentional choices instead of running on autopilot.
                Even a few mindful moments can bring <strong>clarity and calm</strong> to your day.
            
            </p>
        </details>

        <details>
            <summary><span><FaBookOpen /> How to use Ember Flow</span><FaChevronDown className={styles.chevron} /></summary>
            <p>Each day, you’ll see two short lists; <strong>things to focus on</strong> and <strong>self-care.</strong></p>
            <p><strong>Things to focus on</strong> can be a task you want to complete, or simply an intention you want to carry with you through the day. <strong>Self-care</strong> are small acts to take care of yourself — whatever feels right for you.</p>
            <p>Your day resets at <strong>3:00 AM</strong>, giving you a fresh start every morning.</p>
            <p>The <strong>daily challenge</strong> is optional. Try it if you feel like it, or skip it — a new one will be waiting for you tomorrow.</p>
            <p>Tap a focus or self-care item to <strong>edit</strong>, and tap the <strong>checkbox</strong> next to it to mark it as done.</p>
            <p>You can open <strong>Breathe</strong> anytime you need to pause or feel stressed.</p>
        </details>
        </div>
}