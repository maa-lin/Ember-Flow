import { useNavigate } from "react-router";
import styles from "./AffirmationModal.module.scss";
import { MdAutoAwesome } from "react-icons/md";
import { createPortal } from "react-dom";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { themes } from "../../models/Theme";

type AffirmationModalProps = {
  onClose: () => void;
  affirmation: string;
};

export const AffirmationModal = (props: AffirmationModalProps) => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const currentTheme = themes[theme];

  const portalRoot = document.getElementById("affirmation-root");

  if (!portalRoot) return null;
  
  // CreatePortal for opening the affirmation-modal outside the app root, so it is always above everything else.
  return createPortal(
    <div className={styles.overlay}>
    <div
      className={styles["affirmation-modal"]}
      style={{ backgroundColor: currentTheme.modalBgColor }}
    >
      <MdAutoAwesome className={styles.icon} />
      <p className={styles.affirmation}>{props.affirmation[0].toUpperCase() + props.affirmation.slice(1)}</p>
      <p className={styles.prompt}>
        Do you want to pause for a moment to breathe before continuing with your
        day?
      </p>
      <div className={styles["btn-container"]}>
      <button className="btn btn--affirmation-primary" onClick={() => navigate("/breathe")}>
        Breathe
      </button>
      <button
        className="btn btn--affirmation-secondary"
        onClick={() => {
          props.onClose();
          navigate("/");
        }}
      >
        Skip for now
      </button>
      </div>
    </div>
    </div>,
    portalRoot
  );
};
