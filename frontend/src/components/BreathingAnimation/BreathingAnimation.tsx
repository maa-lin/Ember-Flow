import { motion } from "motion/react";
import styles from "./BreathingAnimation.module.scss";

export const BreathingAnimation = () => {

    return <div className={styles["breathe-container"]}>
        {[...Array(5)].map((_, i) => ( // Create 5 spans
            <motion.span
                key={i}
                className={styles.ring}
                animate={{
                    scale: [1 + i * 0.15, 1.8 + i * 0.8, 1 + i * 0.15] // Use i to scale the spans
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.2
                
                }}
            >
            </motion.span>
        ))}
        <div className={styles.core}></div>
    </div>
}